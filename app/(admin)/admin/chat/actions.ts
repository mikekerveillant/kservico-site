"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function sendStaffMessage(conversationId: string, content: string) {
  if (!content.trim()) return;

  const supabase = await createServiceClient();

  await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    role: "staff",
    content: content.trim(),
  });

  await supabase
    .from("chat_conversations")
    .update({ status: "human", updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  revalidatePath(`/admin/chat/${conversationId}`);
  revalidatePath("/admin/chat");
}

export async function closeConversation(conversationId: string) {
  const supabase = await createServiceClient();

  await supabase
    .from("chat_conversations")
    .update({ status: "closed", updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    role: "system",
    content: "This conversation has been closed by staff.",
  });

  revalidatePath(`/admin/chat/${conversationId}`);
  revalidatePath("/admin/chat");
}

export async function reopenConversation(conversationId: string) {
  const supabase = await createServiceClient();

  await supabase
    .from("chat_conversations")
    .update({ status: "ai", updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  revalidatePath(`/admin/chat/${conversationId}`);
  revalidatePath("/admin/chat");
}
