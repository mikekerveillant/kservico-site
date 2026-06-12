"use client";

import { Upload, FileCheck, X } from "lucide-react";
import type { ApplyFormData } from "../types";
import { inputClass, labelClass } from "./shared";

interface Props {
  form: ApplyFormData;
  update: <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => void;
}

const PROOF_OF_INCOME_TYPES = ["Payslip", "Certificate of Employment", "Business Permit", "Income Tax Return"];
const PROOF_OF_BILLING_TYPES = ["Electricity Bill", "Water Bill", "Rental Contract", "Telephone/Internet Bill", "Business Permit"];
const ID_TYPES = ["Driver's License", "Voter's ID", "Passport", "Company ID", "Government ID (UMID/SSS/PhilHealth)"];

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ACCEPT = ".jpg,.jpeg,.png,.pdf";

function FileUploadField({
  label,
  typeOptions,
  typeValue,
  onTypeChange,
  file,
  onFileChange,
}: {
  label: string;
  typeOptions: string[];
  typeValue: string;
  onTypeChange: (value: string) => void;
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_SIZE) {
      alert("File too large. Maximum size is 8MB.");
      e.target.value = "";
      return;
    }
    onFileChange(f);
  }

  return (
    <div className="border-2 border-[#EFEFEF] rounded-xl p-4">
      <label className={labelClass}>{label}</label>
      <select
        required
        value={typeValue}
        onChange={(e) => onTypeChange(e.target.value)}
        className={`${inputClass} cursor-pointer mb-3`}
      >
        <option value="">— Select document type —</option>
        {typeOptions.map((t) => <option key={t}>{t}</option>)}
      </select>

      {file ? (
        <div className="flex items-center gap-3 bg-[#F8F8F8] rounded-lg px-3 py-2.5">
          <FileCheck size={18} className="text-[#1AA84B] flex-shrink-0" />
          <span className="text-[12.5px] text-[#1A1A1A] truncate flex-1">{file.name}</span>
          <button type="button" onClick={() => onFileChange(null)} className="text-[#999] hover:text-[#C8102E] transition-colors flex-shrink-0">
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#EFEFEF] rounded-lg py-6 cursor-pointer hover:border-[#C8102E] transition-colors">
          <Upload size={20} className="text-[#999]" />
          <span className="text-[12.5px] font-semibold text-[#555]">Click to upload</span>
          <span className="text-[11px] text-[#999]">JPG, PNG, or PDF · Max 8MB</span>
          <input type="file" accept={ACCEPT} onChange={handleFile} className="hidden" />
        </label>
      )}
    </div>
  );
}

export default function Step4Documents({ form, update }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[20px] font-black text-[#1A1A1A] mb-1">Document Upload</h2>
        <p className="text-[13px] text-[#999]">Upload clear photos or scans of your documents. Accepted: JPG, PNG, PDF (max 8MB each).</p>
      </div>

      <FileUploadField
        label="Proof of Income"
        typeOptions={PROOF_OF_INCOME_TYPES}
        typeValue={form.proofOfIncomeType}
        onTypeChange={(v) => update("proofOfIncomeType", v)}
        file={form.proofOfIncomeFile}
        onFileChange={(f) => update("proofOfIncomeFile", f)}
      />

      <FileUploadField
        label="Proof of Billing"
        typeOptions={PROOF_OF_BILLING_TYPES}
        typeValue={form.proofOfBillingType}
        onTypeChange={(v) => update("proofOfBillingType", v)}
        file={form.proofOfBillingFile}
        onFileChange={(f) => update("proofOfBillingFile", f)}
      />

      <FileUploadField
        label="Valid ID"
        typeOptions={ID_TYPES}
        typeValue={form.idType}
        onTypeChange={(v) => update("idType", v)}
        file={form.idFile}
        onFileChange={(f) => update("idFile", f)}
      />
    </div>
  );
}
