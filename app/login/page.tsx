"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-5">
      <div className="w-full max-w-[400px] bg-white border border-[#EFEFEF] rounded-2xl p-8">
        <Link href="/" className="block mb-6 no-underline">
          <span className="font-display text-[22px] font-black">
            <span className="text-[#C8102E]">K</span>
            <span className="text-[#1A1A1A]">servico</span>
          </span>
        </Link>
        <h1 className="font-display text-[22px] font-black text-[#1A1A1A] mb-1">Staff Login</h1>
        <p className="text-[13px] text-[#999] mb-6">Sign in to access the admin dashboard.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[12px] font-bold text-[#555] mb-1.5">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors w-full bg-white"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-[#555] mb-1.5">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors w-full bg-white"
            />
          </div>

          {error && (
            <p className="text-[13px] text-[#C8102E] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#C8102E] text-white py-3.5 rounded-xl font-display font-black text-[14px] hover:bg-[#a00d24] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
