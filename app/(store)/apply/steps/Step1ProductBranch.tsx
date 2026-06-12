"use client";

import { useMemo, useState } from "react";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS } from "@/lib/products";
import { MOCK_BRANCHES, REGIONS } from "@/lib/branches";
import { formatPrice, calculateMonthly } from "@/lib/utils";
import type { ApplyFormData } from "../types";
import { inputClass, labelClass } from "./shared";

const TERMS = [6, 12, 24, 36];

interface Props {
  form: ApplyFormData;
  update: <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => void;
}

export default function Step1ProductBranch({ form, update }: Props) {
  const [branchRegion, setBranchRegion] = useState("All Regions");

  const product = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === form.productId),
    [form.productId]
  );

  const filteredBranches = useMemo(() => {
    if (branchRegion === "All Regions") return MOCK_BRANCHES;
    return MOCK_BRANCHES.filter((b) => b.region === branchRegion);
  }, [branchRegion]);

  const monthly = product ? calculateMonthly(product.price, form.termMonths) : 0;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[20px] font-black text-[#1A1A1A] mb-1">Product & Branch</h2>
        <p className="text-[13px] text-[#999]">Tell us what you&apos;d like to finance and where you&apos;ll complete the process.</p>
      </div>

      {/* Product selection */}
      <div>
        <label className={labelClass}>Product</label>
        {product ? (
          <div className="flex items-center gap-3 border-2 border-[#EFEFEF] rounded-xl p-4">
            <div className="w-12 h-12 bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0 text-[24px]">
              {CATEGORY_EMOJIS[product.category] ?? "🛍️"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black tracking-wider text-[#999] uppercase mb-0.5">{product.brand}</p>
              <p className="text-[13.5px] font-semibold text-[#1A1A1A] truncate">{product.name}</p>
              <p className="font-display text-[15px] font-black text-[#C8102E]">{formatPrice(product.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => update("productId", "")}
              className="text-[12px] text-[#999] hover:text-[#C8102E] transition-colors flex-shrink-0"
            >
              Change
            </button>
          </div>
        ) : (
          <select
            value={form.productId}
            onChange={(e) => update("productId", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">— Select a product —</option>
            {MOCK_PRODUCTS.filter((p) => p.is_active).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {formatPrice(p.price)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Term selection */}
      {product && (
        <div>
          <label className={labelClass}>Desired Term</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {TERMS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => update("termMonths", t)}
                className={`border-2 rounded-lg py-2.5 text-center font-display text-[13px] font-black cursor-pointer transition-all ${
                  form.termMonths === t
                    ? "bg-[#C8102E] border-[#C8102E] text-white"
                    : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
                }`}
              >
                {t} mos
              </button>
            ))}
          </div>
          <div className="bg-gradient-to-r from-[#C8102E] to-[#a00d24] rounded-lg px-4 py-3">
            <p className="text-[11px] text-white/70">Estimated monthly payment</p>
            <p className="font-display text-[24px] font-black text-white">{formatPrice(monthly)}/mo</p>
          </div>
        </div>
      )}

      {/* Branch selection */}
      <div>
        <label className={labelClass}>Branch</label>
        <div className="flex flex-col gap-2.5">
          <select
            value={branchRegion}
            onChange={(e) => setBranchRegion(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option>All Regions</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select
            value={form.branchId}
            onChange={(e) => update("branchId", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">— Select a branch —</option>
            {filteredBranches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} — {b.city}, {b.province}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
