import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS, STATUSES, type ApplicationRow } from "./shared";

export default async function AdminDashboardPage() {
  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  const applications = (data ?? []) as ApplicationRow[];
  const recent = applications.slice(0, 5);

  return (
    <div className="p-6">
      <h1 className="font-display text-[24px] font-black text-[#1A1A1A] mb-1">Dashboard</h1>
      <p className="text-[13px] text-[#999] mb-6">Overview of installment applications.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <div className="bg-white border border-[#EFEFEF] rounded-xl p-4">
          <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-1">Total</p>
          <p className="font-display text-[24px] font-black text-[#1A1A1A]">{applications.length}</p>
        </div>
        {STATUSES.map((s) => (
          <div key={s} className="bg-white border border-[#EFEFEF] rounded-xl p-4">
            <p className="text-[11px] font-bold text-[#999] uppercase tracking-wider mb-1">{STATUS_LABELS[s]}</p>
            <p className="font-display text-[24px] font-black text-[#1A1A1A]">
              {applications.filter((a) => a.status === s).length}
            </p>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFEFEF]">
          <h2 className="font-display text-[15px] font-black text-[#1A1A1A]">Recent Applications</h2>
          <Link href="/admin/applications" className="text-[12.5px] font-bold text-[#C8102E] no-underline hover:underline">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-[13px] text-[#999] text-center py-10">No applications yet.</p>
        ) : (
          <table className="w-full text-[13px]">
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} className="border-b border-[#F5F5F5] last:border-b-0">
                  <td className="px-5 py-3">
                    <Link href={`/admin/applications/${a.reference}`} className="font-bold text-[#1A1A1A] no-underline hover:text-[#C8102E]">
                      {a.reference}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[#555]">{a.first_name} {a.last_name}</td>
                  <td className="px-5 py-3 text-[#555] truncate max-w-[240px]">{a.product_name}</td>
                  <td className="px-5 py-3 font-bold text-[#1A1A1A]">{formatPrice(a.product_price)}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[a.status]}`}>
                      {STATUS_LABELS[a.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#999] whitespace-nowrap">
                    {new Date(a.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
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
