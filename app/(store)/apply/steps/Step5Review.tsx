"use client";

import { useMemo } from "react";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/products";
import { MOCK_BRANCHES } from "@/lib/branches";
import { formatPrice, calculateMonthly } from "@/lib/utils";
import type { ApplyFormData } from "../types";
import { calculateAge } from "../types";

interface Props {
  form: ApplyFormData;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-1.5 text-[13px]">
      <span className="text-[#999]">{label}</span>
      <span className="text-[#1A1A1A] font-semibold text-right">{value}</span>
    </div>
  );
}

export default function Step5Review({ form }: Props) {
  const product = useMemo(() => MOCK_PRODUCTS.find((p) => p.id === form.productId), [form.productId]);
  const branch = useMemo(() => MOCK_BRANCHES.find((b) => b.id === form.branchId), [form.branchId]);
  const age = calculateAge(form.birthday);
  const monthly = product ? calculateMonthly(product.price, form.termMonths) : 0;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[20px] font-black text-[#1A1A1A] mb-1">Review & Submit</h2>
        <p className="text-[13px] text-[#999]">Please review your details before submitting your application.</p>
      </div>

      {/* Product & financing */}
      {product && (
        <div className="border-2 border-[#EFEFEF] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0 text-[24px]">
              {CATEGORY_EMOJIS[product.category] ?? "🛍️"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-semibold text-[#1A1A1A] truncate">{product.name}</p>
              <p className="font-display text-[15px] font-black text-[#C8102E]">{formatPrice(product.price)}</p>
            </div>
          </div>
          <Row label="Term" value={`${form.termMonths} months`} />
          <Row label="Monthly Payment" value={`${formatPrice(monthly)}/mo`} />
          <Row label="Branch" value={branch ? `${branch.name} — ${branch.city}` : ""} />
        </div>
      )}

      {/* Personal info */}
      <div className="border-2 border-[#EFEFEF] rounded-xl p-4">
        <p className="text-[12px] font-black uppercase tracking-wider text-[#999] mb-1">Personal Information</p>
        <Row label="Name" value={[form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")} />
        <Row label="Birthday" value={form.birthday} />
        <Row label="Age" value={age ? String(age) : ""} />
        <Row label="Gender" value={form.gender} />
        <Row label="Civil Status" value={form.civilStatus} />
        <Row label="Nationality" value={form.nationality} />
        <Row label="Address" value={form.presentAddress} />
        <Row label="Mobile" value={form.cellularNo} />
        <Row label="Email" value={form.email} />
      </div>

      {/* Employment */}
      <div className="border-2 border-[#EFEFEF] rounded-xl p-4">
        <p className="text-[12px] font-black uppercase tracking-wider text-[#999] mb-1">Employment & Income</p>
        <Row label="Type" value={form.employmentType} />
        <Row label="Employer / Source" value={form.employerName} />
        <Row label="Position" value={form.position} />
        <Row label="Monthly Income" value={form.grossIncome ? formatPrice(Number(form.grossIncome)) : ""} />
      </div>

      {/* Documents */}
      <div className="border-2 border-[#EFEFEF] rounded-xl p-4">
        <p className="text-[12px] font-black uppercase tracking-wider text-[#999] mb-1">Documents</p>
        <Row label="Proof of Income" value={form.proofOfIncomeFile ? `${form.proofOfIncomeType} ✓` : ""} />
        <Row label="Proof of Billing" value={form.proofOfBillingFile ? `${form.proofOfBillingType} ✓` : ""} />
        <Row label="Valid ID" value={form.idFile ? `${form.idType} ✓` : ""} />
      </div>

      <p className="text-[12px] text-[#999] leading-relaxed">
        By submitting, you confirm that the information provided is accurate and consent to KServico
        verifying your details for this installment application.
      </p>
    </div>
  );
}
