import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { formatPrice, calculateMonthly } from "@/lib/utils";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/products";
import { STATUS_LABELS, STATUS_COLORS, STATUSES, type ApplicationRow } from "../../shared";
import type { ApplicationStatus } from "@/types";
import StatusForm from "./StatusForm";

interface Props {
  params: Promise<{ reference: string }>;
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-[13.5px] text-[#1A1A1A] font-semibold">{value || "—"}</p>
    </div>
  );
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { reference } = await params;
  const supabase = await createServiceClient();
  const { data } = await supabase.from("applications").select("*").eq("reference", reference).single();

  if (!data) notFound();
  const a = data as ApplicationRow;

  const docs = [
    { label: "Proof of Income", type: a.proof_of_income_type, path: a.proof_of_income_path },
    { label: "Proof of Billing", type: a.proof_of_billing_type, path: a.proof_of_billing_path },
    { label: "Valid ID", type: a.id_type, path: a.id_path },
  ];

  const signedUrls = await Promise.all(
    docs.map((d) => supabase.storage.from("application-documents").createSignedUrl(d.path, 60 * 10))
  );

  const product = MOCK_PRODUCTS.find((p) => p.id === a.product_id);
  const emoji = product ? CATEGORY_EMOJIS[product.category] ?? "🛍️" : "🛍️";
  const monthly = calculateMonthly(a.product_price, a.term_months);

  return (
    <div className="p-6 max-w-[960px]">
      <Link href="/admin/applications" className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#999] hover:text-[#C8102E] no-underline mb-3 transition-colors">
        <ChevronLeft size={14} /> Back to Applications
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="font-display text-[24px] font-black text-[#1A1A1A]">{a.reference}</h1>
          <p className="text-[13px] text-[#999]">
            Submitted {new Date(a.created_at).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <span className={`text-[12px] font-bold px-3 py-1.5 rounded-full ${STATUS_COLORS[a.status]}`}>
          {STATUS_LABELS[a.status]}
        </span>
      </div>

      {/* Status update */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl p-5 mb-5">
        <h2 className="font-display text-[14px] font-black text-[#1A1A1A] mb-3">Update Status</h2>
        <StatusForm reference={a.reference} currentStatus={a.status} statuses={STATUSES as ApplicationStatus[]} labels={STATUS_LABELS} />
      </div>

      {/* Product & Branch */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl p-5 mb-5">
        <h2 className="font-display text-[14px] font-black text-[#1A1A1A] mb-4">Product & Branch</h2>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0 text-[24px]">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-semibold text-[#1A1A1A] truncate">{a.product_name}</p>
            <p className="font-display text-[15px] font-black text-[#C8102E]">{formatPrice(a.product_price)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Term" value={`${a.term_months} months`} />
          <Field label="Est. Monthly" value={formatPrice(monthly)} />
          <Field label="Branch" value={a.branch_name} />
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl p-5 mb-5">
        <h2 className="font-display text-[14px] font-black text-[#1A1A1A] mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Full Name" value={`${a.first_name} ${a.middle_name ?? ""} ${a.last_name}`.replace(/\s+/g, " ")} />
          <Field label="Birthday" value={new Date(a.birthday).toLocaleDateString("en-PH", { dateStyle: "medium" })} />
          <Field label="Gender" value={a.gender} />
          <Field label="Civil Status" value={a.civil_status} />
          <Field label="Nationality" value={a.nationality} />
          <Field label="Cellular No." value={a.cellular_no} />
          <Field label="Telephone" value={a.tel_no} />
          <Field label="Email" value={a.email} />
          <Field label="Present Address" value={a.present_address} />
        </div>
      </div>

      {/* Employment & Income */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl p-5 mb-5">
        <h2 className="font-display text-[14px] font-black text-[#1A1A1A] mb-4">Employment & Income</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Employment Type" value={a.employment_type} />
          <Field label="Employer / Source" value={a.employer_name} />
          {a.nature_of_business && <Field label="Nature of Business" value={a.nature_of_business} />}
          {a.position && <Field label="Position" value={a.position} />}
          {a.employment_status && <Field label="Employment Status" value={a.employment_status} />}
          <Field label="Employer Address" value={a.employer_address} />
          <Field label="Employer Contact" value={a.employer_contact} />
          <Field label="Years Connected" value={a.years_connected} />
          <Field label="Gross Monthly Income" value={formatPrice(a.gross_income)} />
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white border border-[#EFEFEF] rounded-xl p-5 mb-5">
        <h2 className="font-display text-[14px] font-black text-[#1A1A1A] mb-4">Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {docs.map((d, i) => {
            const url = signedUrls[i].data?.signedUrl;
            return (
              <a
                key={d.label}
                href={url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 border-2 border-[#EFEFEF] rounded-xl p-3 no-underline transition-colors ${url ? "hover:border-[#C8102E]" : "opacity-50 pointer-events-none"}`}
              >
                <FileText size={20} className="text-[#999] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold text-[#1A1A1A] truncate">{d.label}</p>
                  <p className="text-[11px] text-[#999] truncate">{d.type}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
