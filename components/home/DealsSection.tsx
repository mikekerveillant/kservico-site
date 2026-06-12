"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/products";

const TABS = ["All", "TVs", "Aircon", "Washer", "Fridge", "Phone", "Laptop"];

const TAB_FILTER: Record<string, string | null> = {
  All: null, TVs: "tv", Aircon: "aircon", Washer: "washer",
  Fridge: "fridge", Phone: "smartphone", Laptop: "laptop",
};

export default function DealsSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? MOCK_PRODUCTS.filter((p) => p.is_active)
    : MOCK_PRODUCTS.filter((p) => p.category === TAB_FILTER[activeTab] && p.is_active);

  return (
    <section className="bg-[#F8F8F8] py-2 pb-12">
      <div className="max-w-[1280px] mx-auto px-5 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-display text-[24px] font-black text-[#1A1A1A] tracking-tight">
              🔥 Hot <span className="text-[#C8102E]">Deals</span>
            </h2>
            <p className="text-[13px] text-[#999] mt-0.5">Limited stocks — grab them while they last!</p>
          </div>
          <Link href="/shop" className="text-[13px] font-bold text-[#C8102E] no-underline flex items-center gap-1 hover:gap-2 transition-all">
            See all →
          </Link>
        </div>

        <div className="flex gap-1.5 flex-wrap mb-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`bg-white border-2 rounded-full px-4 py-1.5 text-[13px] font-bold cursor-pointer transition-all font-display ${
                activeTab === tab
                  ? "bg-[#C8102E] border-[#C8102E] text-white"
                  : "border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
