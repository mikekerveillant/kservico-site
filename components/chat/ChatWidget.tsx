"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Headset } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "staff" | "system";
  content: string;
  created_at: string;
}

const STORAGE_KEY = "kservico_chat_conversation_id";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [handoffRequested, setHandoffRequested] = useState(false);
  const [language, setLanguage] = useState<"english" | "filipino">("english");
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore conversation and privacy acceptance from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setConversationId(stored);
    const accepted = localStorage.getItem("kservico_privacy_accepted");
    setPrivacyAccepted(accepted === "true");
  }, []);

  // Load message history + subscribe to realtime updates once we have a conversation
  useEffect(() => {
    if (!conversationId) return;

    const supabase = createClient();

    supabase
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as ChatMessage[]);
      });

    supabase
      .from("chat_conversations")
      .select("status")
      .eq("id", conversationId)
      .single()
      .then(({ data }) => {
        if (data && data.status !== "ai") setHandoffRequested(true);
      });

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          const msg = payload.new as ChatMessage;
          // Only append via realtime for staff messages — user + assistant messages
          // are handled directly in sendMessage() to avoid duplicates.
          if (msg.role === "staff") {
            setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
    setInput("");

    // Show user message immediately
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message: text, pageUrl: pathname, language }),
      });
      const data = await res.json();

      if (data.conversationId && data.conversationId !== conversationId) {
        setConversationId(data.conversationId);
        localStorage.setItem(STORAGE_KEY, data.conversationId);
      }

      if (data.status && data.status !== "ai") setHandoffRequested(true);

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.reply,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "system",
          content: "Sorry, we couldn't send that. Please check your connection and try again.",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function requestHandoff() {
    if (!conversationId || handoffRequested) return;
    setHandoffRequested(true);
    try {
      const res = await fetch("/api/chat/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId }),
      });
      const data = await res.json();
      if (data.note) {
        setMessages((prev) => [
          ...prev,
          { id: `handoff-${Date.now()}`, role: "system", content: data.note, created_at: new Date().toISOString() },
        ]);
      }
    } catch {
      setHandoffRequested(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full bg-[#C8102E] text-white shadow-lg flex items-center justify-center hover:bg-[#a00d24] transition-colors"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[9999] w-[340px] sm:w-[380px] h-[70vh] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-[#EFEFEF] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#1A1A1A] px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="font-display text-[14px] font-black text-white">Kai — KServico Assistant</p>
              <p className="text-[11px] text-[#999]">AI assistant + live team</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <div className="flex items-center bg-white/10 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage("english")}
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full transition-colors ${language === "english" ? "bg-white text-[#1A1A1A]" : "text-white/70 hover:text-white"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("filipino")}
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full transition-colors ${language === "filipino" ? "bg-white text-[#1A1A1A]" : "text-white/70 hover:text-white"}`}
                >
                  FIL
                </button>
              </div>
              {!handoffRequested && conversationId && (
                <button
                  onClick={requestHandoff}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition-colors"
                >
                  <Headset size={13} /> Talk to a person
                </button>
              )}
            </div>
          </div>

          {/* Privacy acceptance screen */}
          {!privacyAccepted && (
            <div className="flex-1 flex flex-col justify-between px-4 py-5 bg-[#FAFAFA]">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl px-4 py-3.5 text-[13px] text-[#1A1A1A] border border-[#EFEFEF] leading-relaxed">
                  Hello! I am Kai, your K-Shopping virtual assistant from KServico. How can I help you today?
                </div>
                <div className="bg-white rounded-2xl px-4 py-3.5 text-[13px] text-[#1A1A1A] border border-[#EFEFEF] leading-relaxed">
                  Before we start, kindly take a moment to read our{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8102E] underline font-semibold"
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
                <p className="text-[12px] text-[#777] text-center">Do you accept our Privacy Policy?</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    localStorage.setItem("kservico_privacy_accepted", "true");
                    setPrivacyAccepted(true);
                  }}
                  className="flex-1 bg-[#C8102E] text-white font-display font-black text-[14px] py-3 rounded-xl hover:bg-[#a00d24] transition-colors"
                >
                  Yes, I Accept
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-[#F0F0F0] text-[#555] font-display font-black text-[14px] py-3 rounded-xl hover:bg-[#E0E0E0] transition-colors"
                >
                  No, Close
                </button>
              </div>
            </div>
          )}

          {/* Messages + Input — only shown after privacy accepted */}
          {privacyAccepted && (<>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#FAFAFA]">
            {messages.length === 0 && (
              <div className="text-center text-[12.5px] text-[#999] mt-6 px-4">
                👋 Hi! Ask me about our products, prices, or how installment financing works.
              </div>
            )}
            {messages.map((m) => {
              if (m.role === "system") {
                return (
                  <div key={m.id} className="text-center text-[11.5px] text-[#999] px-3 py-1.5 bg-[#F0F0F0] rounded-full inline-block max-w-full mx-auto">
                    {m.content}
                  </div>
                );
              }
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] whitespace-pre-wrap ${
                      isUser
                        ? "bg-[#C8102E] text-white"
                        : m.role === "staff"
                          ? "bg-[#1AA84B]/10 text-[#1A1A1A] border border-[#1AA84B]/30"
                          : "bg-white text-[#1A1A1A] border border-[#EFEFEF]"
                    }`}
                  >
                    {m.role === "staff" && (
                      <p className="text-[10px] font-bold text-[#1AA84B] uppercase tracking-wider mb-0.5">KServico Staff</p>
                    )}
                    {m.content}
                  </div>
                </div>
              );
            })}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#EFEFEF] rounded-2xl px-3.5 py-2 text-[13px] text-[#999]">
                  Typing…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-[#EFEFEF] flex-shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 border-2 border-[#EFEFEF] rounded-full px-4 py-2 text-[13px] outline-none focus:border-[#C8102E] transition-colors"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send"
              className="w-9 h-9 flex-shrink-0 rounded-full bg-[#C8102E] text-white flex items-center justify-center hover:bg-[#a00d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={15} />
            </button>
          </form>
          </>)}
        </div>
      )}
    </>
  );
}
