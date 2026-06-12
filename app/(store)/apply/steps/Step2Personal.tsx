"use client";

import type { ApplyFormData } from "../types";
import { calculateAge } from "../types";
import { inputClass, labelClass } from "./shared";

interface Props {
  form: ApplyFormData;
  update: <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => void;
}

const GENDERS = ["Male", "Female"];
const CIVIL_STATUSES = ["Single", "Married", "Widowed", "Separated"];

export default function Step2Personal({ form, update }: Props) {
  const age = calculateAge(form.birthday);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[20px] font-black text-[#1A1A1A] mb-1">Personal Information</h2>
        <p className="text-[13px] text-[#999]">Please provide your details exactly as they appear on your valid ID.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Last Name</label>
          <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>First Name</label>
          <input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Middle Name</label>
          <input value={form.middleName} onChange={(e) => update("middleName", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-1">
          <label className={labelClass}>Birthday</label>
          <input required type="date" value={form.birthday} onChange={(e) => update("birthday", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Age</label>
          <input disabled value={age ?? ""} className={`${inputClass} bg-[#F8F8F8] text-[#999]`} />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select required value={form.gender} onChange={(e) => update("gender", e.target.value)} className={`${inputClass} cursor-pointer`}>
            <option value="">Select</option>
            {GENDERS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Civil Status</label>
          <select required value={form.civilStatus} onChange={(e) => update("civilStatus", e.target.value)} className={`${inputClass} cursor-pointer`}>
            <option value="">Select</option>
            {CIVIL_STATUSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Nationality</label>
        <input required value={form.nationality} onChange={(e) => update("nationality", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Present Address</label>
        <input required value={form.presentAddress} onChange={(e) => update("presentAddress", e.target.value)} placeholder="House/unit no., street, barangay, city, province" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className={labelClass}>Cellular Number</label>
          <input required type="tel" value={form.cellularNo} onChange={(e) => update("cellularNo", e.target.value)} placeholder="09XX XXX XXXX" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Telephone (optional)</label>
          <input type="tel" value={form.telNo} onChange={(e) => update("telNo", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        </div>
      </div>
    </div>
  );
}
