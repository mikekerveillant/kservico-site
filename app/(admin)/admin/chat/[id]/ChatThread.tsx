"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { sendStaffMessage, closeConversation, reopenConversation } from "../actions";
import type { ChatMessageRow } from "../shared";

interface Props {
  conversationId: string;
  initialMessages: ChatMessageRow[];
  status: string;
}

export default function ChatThread({ conversationId, initialMessages, status }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`admin-chat-${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          const msg = payload.new as ChatMessageRow;
          setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    setInput("");
    startTransition(async () => {
      await sendStaffMessage(conversationId, content);
    });
  }

  return (
    <div className="bg-white border border-[#EFEFEF] rounded-xl overflow-hidden">
      <div ref={scrollRef} className="h-[420px] overflow-y-auto px-5 py-4 space-y-3 bg-[#FAFAFA]">
        {messages.length === 0 && (
          <p className="text-[12.5px] text-[#999] text-center mt-6">No messages yet.</p>
        )}
        {messages.map((m) => {
          if (m.role === "system") {
            return (
              <div key={m.id} className="text-center text-[11.5px] text-[#999] px-3 py-1.5 bg-[#F0F0F0] rounded-full inline-block max-w-full mx-auto">
                {m.content}
              </div>
            );
          }
          const isCustomer = m.role === "user";
          return (
            <div key={m.id} className={`flex ${isCustomer ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[13px] whitespace-pre-wrap ${
                  isCustomer
                    ? "bg-white text-[#1A1A1A] border border-[#EFEFEF]"
                    : m.role === "staff"
                      ? "bg-[#1AA84B]/10 text-[#1A1A1A] border border-[#1AA84B]/30"
                      : "bg-[#C8102E]/10 text-[#1A1A1A] border border-[#C8102E]/20"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 text-[#999]">
                  {isCustomer ? "Customer" : m.role === "staff" ? "Staff" : "AI"}
                </p>
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-[#EFEFEF]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply to customer…"
          className="flex-1 border-2 border-[#EFEFEF] rounded-full px-4 py-2 text-[13px] outline-none focus:border-[#C8102E] transition-colors"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="bg-[#C8102E] text-white px-5 py-2.5 rounded-full font-display font-black text-[12.5px] hover:bg-[#a00d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
        {status !== "closed" ? (
          <button
            type="button"
            onClick={() => startTransition(() => closeConversation(conversationId))}
            disabled={isPending}
            className="text-[12px] font-bold text-[#999] hover:text-[#C8102E] transition-colors px-2 whitespace-nowrap"
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            onClick={() => startTransition(() => reopenConversation(conversationId))}
            disabled={isPending}
            className="text-[12px] font-bold text-[#999] hover:text-[#C8102E] transition-colors px-2 whitespace-nowrap"
          >
            Reopen
          </button>
        )}
      </form>
    </div>
  );
}
