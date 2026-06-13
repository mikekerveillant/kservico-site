import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { CHAT_STATUS_LABELS, CHAT_STATUS_COLORS, type ChatConversationRow, type ChatMessageRow } from "../shared";
import ChatThread from "./ChatThread";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ChatDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createServiceClient();

  const { data: conversation } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("id", id)
    .single();

  if (!conversation) notFound();

  const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  const c = conversation as ChatConversationRow;

  return (
    <div className="p-6 max-w-[720px]">
      <Link href="/admin/chat" className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#999] hover:text-[#C8102E] no-underline mb-3 transition-colors">
        <ChevronLeft size={14} /> Back to Live Chat
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="font-display text-[20px] font-black text-[#1A1A1A]">
            {c.customer_name || c.customer_email || `Visitor ${c.id.slice(0, 8)}`}
          </h1>
          <p className="text-[12.5px] text-[#999]">
            {c.page_url && <>From {c.page_url} · </>}
            Started {new Date(c.created_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <span className={`text-[12px] font-bold px-3 py-1.5 rounded-full ${CHAT_STATUS_COLORS[c.status]}`}>
          {CHAT_STATUS_LABELS[c.status]}
        </span>
      </div>

      <ChatThread conversationId={c.id} initialMessages={(messages ?? []) as ChatMessageRow[]} status={c.status} />
    </div>
  );
}
