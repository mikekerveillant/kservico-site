import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#1A1A1A] flex-shrink-0 flex flex-col">
        <Link href="/admin" className="px-5 py-5 no-underline border-b border-white/10">
          <span className="font-display text-[18px] font-black">
            <span className="text-[#C8102E]">K</span>
            <span className="text-white">servico</span>
          </span>
          <p className="text-[10px] text-white/40 font-bold tracking-wider uppercase mt-0.5">Admin</p>
        </Link>
        <nav className="flex-1 flex flex-col gap-1 p-3">
          <Link
            href="/admin/applications"
            className="px-3 py-2.5 rounded-lg text-[13px] font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-colors no-underline"
          >
            Applications
          </Link>
          <Link
            href="/admin/chat"
            className="px-3 py-2.5 rounded-lg text-[13px] font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-colors no-underline"
          >
            Live Chat
          </Link>
        </nav>
        <div className="p-3 border-t border-white/10">
          <p className="text-[11px] text-white/40 truncate px-3 mb-2">{data.user.email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
