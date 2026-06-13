import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { STATUS_LABELS, STATUS_COLORS, STATUSES, type ApplicationRow } from "../shared";
import type { ApplicationStatus } from "@/types";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function ApplicationsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  const all = (data ?? []) as ApplicationRow[];
  const applications = status ? all.filter((a) => a.status === status) : all;

  return (
    <div className="p-6">
      <h1 className="font-display text-[24px] font-black text-[#1A1A1A] mb-1">Applications</h1>
      <p className="text-[13px] text-[#999] mb-5">{all.length} total applications</p>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        <Link
          href="/admin/applications"
          className={`px-4 py-1.5 rounded-full text-[12.5px] font-bold border-2 transition-colors no-underline ${
            !status ? "bg-[#C8102E] border-[#C8102E] text-white" : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
          }`}
        >
          All ({all.length})
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/applications?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-[12.5px] font-bold border-2 transition-colors no-underline ${
              status === s ? "bg-[#C8102E] border-[#C8102E] text-white" : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
            }`}
          >
            {STATUS_LABELS[s as ApplicationStatus]} ({all.filter((a) => a.status === s).length})
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl overflow-hidden">
        {applications.length === 0 ? (
          <p className="text-[13px] text-[#999] text-center py-10">No applications found.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#EFEFEF] text-left">
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Reference</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Applicant</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Branch</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#999] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id} className="border-b border-[#F5F5F5] last:border-b-0 hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/applications/${a.reference}`} className="font-bold text-[#1A1A1A] no-underline hover:text-[#C8102E]">
                      {a.reference}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-[#555]">{a.first_name} {a.last_name}</td>
                  <td className="px-5 py-3 text-[#555] truncate max-w-[220px]">{a.product_name}</td>
                  <td className="px-5 py-3 font-bold text-[#1A1A1A] whitespace-nowrap">{formatPrice(a.product_price)}</td>
                  <td className="px-5 py-3 text-[#555] truncate max-w-[160px]">{a.branch_name}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_COLORS[a.status]}`}>
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
