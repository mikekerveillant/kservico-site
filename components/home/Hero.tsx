"use client";

import Link from "next/link";
import { formatPrice, calculateMonthly } from "@/lib/utils";

const FEATURED = {
  name: "LG 2.0 HP Dual Inverter Aircon",
  brand: "LG",
  price: 38995,
  original_price: 48995,
  monthly: calculateMonthly(38995, 12),
  emoji: "❄️",
  tag: "BEST SELLER",
};

export default function Hero() {
  const savings = FEATURED.original_price - FEATURED.price;
  const pct = Math.round((savings / FEATURED.original_price) * 100);

  return (
    <section className="bg-[#1A31A8] grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[480px] overflow-hidden relative">
      {/* Left — yellow diagonal + content */}
      <div className="relative px-10 md:px-[60px] py-[52px] flex flex-col justify-center gap-5 z-[2]">
        {/* Yellow diagonal bg */}
        <div
          className="absolute inset-0 bg-[#F5C200] z-[-1]"
          style={{ clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)" }}
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1A31A8]/10 text-[#1A31A8] text-[11px] font-black tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full w-fit border border-[#1A31A8]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A31A8] animate-pulse" />
          Anniversary Sale — 55 Years of Trust
        </div>

        <h1 className="font-display text-[clamp(30px,3.8vw,52px)] font-black text-[#1A1A1A] leading-[1.08] tracking-tight">
          Suki Prices,{" "}
          <span className="text-[#1A31A8]">Premium Brands.</span>
          <br />
          Walang Kailangang
          <br />
          Pumunta sa Bangko.
        </h1>

        <p className="text-[14.5px] text-[#333] leading-[1.7] max-w-[400px]">
          0% installment on all products. 180+ branches across Luzon. Same-day
          approval. Authorized dealer of LG, Samsung, Honda, Apple, and more.
        </p>

        <div className="flex gap-2.5 flex-wrap">
          <Link
            href="/shop"
            className="bg-[#1A31A8] text-white border-none rounded-md px-7 py-3.5 font-display text-[15px] font-black cursor-pointer hover:bg-[#122390] shadow-[0_4px_16px_rgba(26,49,168,0.35)] transition-all hover:-translate-y-px no-underline"
          >
            Shop Now
          </Link>
          <Link
            href="/apply"
            className="bg-white text-[#1A31A8] border-2 border-[#1A31A8] rounded-md px-7 py-3.5 font-display text-[15px] font-black cursor-pointer hover:bg-[#1A31A8] hover:text-white transition-all no-underline"
          >
            Apply for Installment
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex gap-5 pt-4 border-t border-black/10 flex-wrap">
          {[
            { icon: "🏪", text: "180+ Branches" },
            { icon: "✅", text: "Authorized Dealer" },
            { icon: "📅", text: "Founded 1971" },
            { icon: "🏆", text: "Top 1,000 PH Corp" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-1.5">
              <span className="text-[16px]">{t.icon}</span>
              <span className="text-[12px] text-[#333] font-semibold">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — featured product card */}
      <div className="flex items-center justify-center p-8 bg-[#1A31A8]">
        <div className="relative w-full max-w-[380px]">
          {/* Floating chip top-left */}
          <div className="absolute -left-5 top-6 bg-white rounded-xl px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center gap-2.5 z-10">
            <span className="text-[20px]">🚀</span>
            <div>
              <div className="text-[12px] font-bold text-[#1A1A1A] leading-tight">Fast Approval</div>
              <div className="text-[11px] text-[#999]">1-2 business days</div>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white/[0.08] border border-white/[0.15] rounded-2xl p-6 backdrop-blur-[10px]">
            <div className="inline-block bg-[#F5C200] text-[#1A1A1A] text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase mb-4">
              {FEATURED.tag}
            </div>
            <div className="h-[160px] flex items-center justify-center mb-4 text-[80px]">
              {FEATURED.emoji}
            </div>
            <div className="text-[14px] font-bold text-white mb-0.5">{FEATURED.name}</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider mb-2.5">{FEATURED.brand}</div>
            <div className="flex items-baseline gap-2.5 mb-3 flex-wrap">
              <span className="font-display text-[26px] font-black text-white">{formatPrice(FEATURED.price)}</span>
              <span className="text-[12px] text-white/35 line-through">{formatPrice(FEATURED.original_price)}</span>
              <span className="bg-[#F5C200] text-[#1A1A1A] text-[11px] font-black px-2 py-0.5 rounded-full">
                SAVE {pct}%
              </span>
            </div>
            <div className="bg-white/[0.08] rounded px-3 py-2 text-[12px] text-white/60 flex items-center gap-1.5">
              📅 As low as <strong className="text-[#F5C200] font-black">{formatPrice(FEATURED.monthly)}/mo</strong> for 12 months
            </div>
          </div>

          {/* Floating chip bottom-right */}
          <div className="absolute -right-5 bottom-6 bg-white rounded-xl px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center gap-2.5 z-10">
            <span className="text-[20px]">🏪</span>
            <div>
              <div className="text-[12px] font-bold text-[#1A1A1A] leading-tight">180+ Branches</div>
              <div className="text-[11px] text-[#999]">All over Luzon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
