"use client";

import type { ApplyFormData } from "../types";
import type { EmploymentType } from "@/types";
import { inputClass, labelClass } from "./shared";

interface Props {
  form: ApplyFormData;
  update: <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => void;
}

const EMPLOYMENT_TYPES: { value: EmploymentType; label: string }[] = [
  { value: "employed", label: "Employed" },
  { value: "business", label: "Business Owner" },
  { value: "ofw", label: "OFW" },
  { value: "farming", label: "Farming" },
];

export default function Step3Employment({ form, update }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[20px] font-black text-[#1A1A1A] mb-1">Employment & Income</h2>
        <p className="text-[13px] text-[#999]">This helps us assess your application quickly.</p>
      </div>

      <div>
        <label className={labelClass}>Employment Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {EMPLOYMENT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => update("employmentType", t.value)}
              className={`border-2 rounded-xl py-2.5 text-center text-[13px] font-bold cursor-pointer transition-all ${
                form.employmentType === t.value
                  ? "bg-[#C8102E] border-[#C8102E] text-white"
                  : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {(form.employmentType === "employed") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className={labelClass}>Employer Name</label>
            <input required value={form.employerName} onChange={(e) => update("employerName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Position</label>
            <input required value={form.position} onChange={(e) => update("position", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Employment Status</label>
            <input required value={form.employmentStatus} onChange={(e) => update("employmentStatus", e.target.value)} placeholder="Regular, Contractual, etc." className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Employer Address</label>
            <input required value={form.employerAddress} onChange={(e) => update("employerAddress", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Employer Contact Number</label>
            <input required type="tel" value={form.employerContact} onChange={(e) => update("employerContact", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Years Connected</label>
            <input required type="number" min="0" value={form.yearsConnected} onChange={(e) => update("yearsConnected", e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {(form.employmentType === "business") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className={labelClass}>Business Name</label>
            <input required value={form.employerName} onChange={(e) => update("employerName", e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Nature of Business</label>
            <input required value={form.natureOfBusiness} onChange={(e) => update("natureOfBusiness", e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Business Address</label>
            <input required value={form.employerAddress} onChange={(e) => update("employerAddress", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Business Contact Number</label>
            <input required type="tel" value={form.employerContact} onChange={(e) => update("employerContact", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Years in Operation</label>
            <input required type="number" min="0" value={form.yearsConnected} onChange={(e) => update("yearsConnected", e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {(form.employmentType === "ofw" || form.employmentType === "farming") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className={labelClass}>
              {form.employmentType === "ofw" ? "Employer / Agency Name" : "Source of Income"}
            </label>
            <input required value={form.employerName} onChange={(e) => update("employerName", e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>
              {form.employmentType === "ofw" ? "Employer Address / Country" : "Farm Location"}
            </label>
            <input required value={form.employerAddress} onChange={(e) => update("employerAddress", e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {form.employmentType && (
        <div>
          <label className={labelClass}>Gross Monthly Income</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] text-[13.5px]">₱</span>
            <input
              required
              type="number"
              min="0"
              value={form.grossIncome}
              onChange={(e) => update("grossIncome", e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
