import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { conversationId } = await request.json();
  if (!conversationId) return NextResponse.json({ error: "conversationId required" }, { status: 400 });

  const supabase = await createServiceClient();
  await supabase
    .from("chat_conversations")
    .update({ status: "ai", updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  return NextResponse.json({ ok: true });
}
