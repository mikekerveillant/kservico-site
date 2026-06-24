import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase/server";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const FALLBACK_REPLY =
  "Thanks for your message! Our AI assistant isn't fully set up yet, but you can tap \"Talk to a person\" and our team will get back to you.";

export async function POST(request: Request) {
  const { conversationId, message, pageUrl } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  let convoId = conversationId as string | undefined;
  let status = "ai";

  if (convoId) {
    const { data } = await supabase
      .from("chat_conversations")
      .select("status")
      .eq("id", convoId)
      .single();
    if (data) status = data.status;
  }

  if (!convoId) {
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({ page_url: pageUrl ?? null })
      .select("id, status")
      .single();
    if (error || !data) {
      return NextResponse.json({ error: "Failed to start conversation" }, { status: 500 });
    }
    convoId = data.id;
    status = data.status;
  }

  // Fetch prior history BEFORE inserting the current message so the current
  // message is always appended last. Reading after insert risks replica lag
  // returning a stale snapshot that ends with the previous assistant reply → 400.
  const { data: history } = await supabase
    .from("chat_messages")
    .select("role, content")
    .eq("conversation_id", convoId)
    .order("created_at", { ascending: true })
    .limit(19);

  await supabase.from("chat_messages").insert({
    conversation_id: convoId,
    role: "user",
    content: message,
  });

  await supabase.from("chat_conversations").update({ updated_at: new Date().toISOString() }).eq("id", convoId);

  // If a human has taken over (or one was requested), don't auto-reply.
  if (status !== "ai") {
    return NextResponse.json({ conversationId: convoId, reply: null, status });
  }

  let reply: string;

  if (!process.env.ANTHROPIC_API_KEY) {
    reply = FALLBACK_REPLY;
  } else {
    const messages = [
      ...(history ?? [])
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user" as const, content: message },
    ];

    try {
      const result = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: [{ type: "text", text: buildSystemPrompt(), cache_control: { type: "ephemeral" } }],
        messages,
      });
      reply = result.content[0]?.type === "text" ? result.content[0].text : "";
    } catch (err) {
      console.error("Chat AI error:", err);
      reply = "Sorry, something went wrong on our end. Please try again, or tap \"Talk to a person\" for help.";
    }
  }

  await supabase.from("chat_messages").insert({
    conversation_id: convoId,
    role: "assistant",
    content: reply,
  });

  return NextResponse.json({ conversationId: convoId, reply, status });
}
