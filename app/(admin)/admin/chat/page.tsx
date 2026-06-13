import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { CHAT_STATUS_LABELS, CHAT_STATUS_COLORS, type ChatConversationRow } from "./shared";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

const STATUSES = ["handoff_requested", "human", "ai", "closed"];

export default async function ChatPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const supabase = await createServiceClient();

  const { data } = await supabase
    .from("chat_conversations")
    .select("*")
    .order("updated_at", { ascending: false });

  const all = (data ?? []) as ChatConversationRow[];
  const conversations = status ? all.filter((c) => c.status === status) : all;

  return (
    <div className="p-6">
      <h1 className="font-display text-[24px] font-black text-[#1A1A1A] mb-1">Live Chat</h1>
      <p className="text-[13px] text-[#999] mb-5">{all.length} total conversations</p>

      <div className="flex gap-2 flex-wrap mb-5">
        <Link
          href="/admin/chat"
          className={`px-4 py-1.5 rounded-full text-[12.5px] font-bold border-2 transition-colors no-underline ${
            !status ? "bg-[#C8102E] border-[#C8102E] text-white" : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
          }`}
        >
          All ({all.length})
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/chat?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-bold border-2 transition-colors no-underline ${
              status === s ? "bg-[#C8102E] border-[#C8102E] text-white" : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
            }`}
          >
            {CHAT_STATUS_LABELS[s]} ({all.filter((c) => c.status === s).length})
          </Link>
        ))}
      </div>

      <div className="bg-white border border-[#EFEFEF] rounded-xl overflow-hidden">
        {conversations.length === 0 ? (
          <p className="text-[13px] text-[#999] text-center py-10">No conversations found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#EFEFEF] text-left">
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Page</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((c) => (
                <tr key={c.id} className="border-b border-[#F5F5F5] last:border-b-0 hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/chat/${c.id}`} className="font-bold text-[#1A1A1A] no-underline hover:text-[#C8102E]">
                      {c.customer_name || c.customer_email || `Visitor ${c.id.slice(0, 8)}`}
                    </Link>
                    {c.customer_email && <p className="text-[11px] text-[#999]">{c.customer_email}</p>}
                  </td>
                  <td className="px-5 py-3 text-[#555] truncate max-w-[220px]">{c.page_url || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${CHAT_STATUS_COLORS[c.status]}`}>
                      {CHAT_STATUS_LABELS[c.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#999] whitespace-nowrap">
                    {new Date(c.updated_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
