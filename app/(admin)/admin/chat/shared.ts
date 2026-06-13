export const CHAT_STATUS_LABELS: Record<string, string> = {
  ai: "AI Handling",
  handoff_requested: "Needs Staff",
  human: "With Staff",
  closed: "Closed",
};

export const CHAT_STATUS_COLORS: Record<string, string> = {
  ai: "bg-[#EFEFEF] text-[#999]",
  handoff_requested: "bg-[#FCE8E8] text-[#C8102E]",
  human: "bg-[#E6F7EC] text-[#1AA84B]",
  closed: "bg-[#EFEFEF] text-[#999]",
};

export interface ChatConversationRow {
  id: string;
  status: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  page_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessageRow {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "staff" | "system";
  content: string;
  created_at: string;
}
