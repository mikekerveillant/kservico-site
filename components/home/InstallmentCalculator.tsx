"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice, calculateMonthly } from "@/lib/utils";

const TERMS = [6, 12, 24, 36];
const SAMPLE_PRODUCT = { name: "LG 55\" 4K OLED Smart TV", price: 54995, emoji: "📺" };

const STEPS = [
  { num: "1", label: "Choose your product", desc: "Browse our wide selection of top brands" },
  { num: "2", label: "Apply online or in-store", desc: "Fill out a simple form — no bank visit needed" },
  { num: "3", label: "Get approved in 1-2 days", desc: "Bring one valid ID to your nearest branch" },
];

export default function InstallmentCalculator() {
  const [activeTerm, setActiveTerm] = useState(12);
  const monthly = calculateMonthly(SAMPLE_PRODUCT.price, activeTerm);

  return (
    <section className="bg-[#F8F8F8] py-[52px]">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#e8ecfa] text-[#1A31A8] text-[11px] font-black tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-3.5">
              💳 In-House Financing
            </div>
            <h2 className="font-display text-[34px] font-black text-[#1A1A1A] leading-[1.1] tracking-tight mb-3.5">
              0% Installment —<br />
              <em className="text-[#1A31A8] not-italic">Walang Interest.</em>
            </h2>
            <p className="text-[14px] text-[#555] leading-[1.7] mb-6">
              KServico&apos;s in-house financing means you deal directly with us — no bank,
              no third-party credit check. Flexible terms from 6 to 36 months at
              absolutely zero interest.
            </p>
            <div className="flex flex-col gap-4">
              {STEPS.map((s) => (
                <div key={s.num} className="flex gap-3.5 items-start">
                  <div className="w-[34px] h-[34px] rounded-lg bg-[#1A31A8] text-white font-display text-[15px] font-black flex items-center justify-center flex-shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#1A1A1A] mb-0.5">{s.label}</p>
                    <p className="text-[12.5px] text-[#999]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — calculator */}
          <div className="bg-white rounded-2xl border-2 border-[#EFEFEF] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <h3 className="font-display text-[17px] font-black text-[#1A1A1A] mb-5 flex items-center gap-2">
              🧮 Monthly Payment Calculator
            </h3>

            <div className="flex items-center gap-3.5 bg-[#F8F8F8] rounded-md p-3.5 mb-5">
              <div className="w-14 h-14 bg-white rounded-lg border border-[#EFEFEF] flex items-center justify-center flex-shrink-0 text-[28px]">
                {SAMPLE_PRODUCT.emoji}
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#1A1A1A] mb-0.5 leading-tight">
                  {SAMPLE_PRODUCT.name}
                </p>
                <p className="font-display text-[18px] font-black text-[#C8102E]">
                  {formatPrice(SAMPLE_PRODUCT.price)}
                </p>
              </div>
            </div>

            <p className="text-[11px] font-black uppercase tracking-wider text-[#999] mb-2.5">Select Term</p>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {TERMS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTerm(t)}
                  className={`border-2 rounded-md py-2.5 text-center font-display text-[13px] font-black cursor-pointer transition-all ${
                    activeTerm === t
                      ? "bg-[#1A31A8] border-[#1A31A8] text-white"
                      : "bg-[#F8F8F8] border-[#EFEFEF] text-[#555] hover:border-[#1A31A8] hover:text-[#1A31A8]"
                  }`}
                >
                  {t} mos
                </button>
              ))}
            </div>

            {/* Result — yellow bg with blue text, matching brand */}
            <div className="bg-[#F5C200] rounded-xl p-4 px-5 flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] text-[#333] mb-0.5 font-semibold">Monthly Payment</p>
                <p className="font-display text-[30px] font-black text-[#1A31A8]">{formatPrice(monthly)}</p>
                <p className="text-[11px] text-[#555]">for {activeTerm} months · 0% interest</p>
              </div>
              <span className="text-[36px]">💸</span>
            </div>

            <Link
              href="/apply"
              className="block w-full bg-[#1A31A8] text-white text-center border-none rounded-md py-3.5 font-display text-[15px] font-black cursor-pointer hover:bg-[#122390] transition-colors no-underline"
            >
              Apply Now — It&apos;s Free
            </Link>
            <p className="text-[11px] text-[#999] text-center mt-2.5">
              No hidden fees · No interest · Bring 1 valid ID
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
