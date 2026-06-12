"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/store/ui";
import { MOCK_PRODUCTS, CATEGORY_EMOJIS, CATEGORY_LABELS } from "@/lib/products";
import { formatPrice, calculateMonthly } from "@/lib/utils";

export default function SearchModal() {
  const { searchOpen, closeSearch, searchQuery, setSearchQuery } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeSearch();
    }
    if (searchOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.is_active &&
        (p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          CATEGORY_LABELS[p.category]?.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [searchQuery]);

  if (!searchOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/45 z-[500]" onClick={closeSearch} />
      <div className="fixed top-0 left-0 right-0 z-[501] bg-white rounded-b-2xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] max-h-[80vh] overflow-y-auto">
        <div className="max-w-[680px] mx-auto px-5 py-5">
          {/* Search input */}
          <div className="flex items-center gap-2 bg-[#F8F8F8] border-2 border-[#EFEFEF] rounded-xl px-4 py-3 focus-within:border-[#1A31A8] transition-colors">
            <Search size={18} className="text-[#999] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appliances, motorcycles, smartphones..."
              className="flex-1 bg-transparent border-none outline-none text-[14px] text-[#1A1A1A] placeholder:text-[#999]"
            />
            <button
              onClick={closeSearch}
              className="bg-transparent border-none cursor-pointer text-[#999] hover:text-[#C8102E] transition-colors flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results */}
          {searchQuery.trim() && (
            <div className="mt-4">
              {results.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8F8F8] transition-colors no-underline"
                    >
                      <div className="w-12 h-12 bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0 text-[24px]">
                        {CATEGORY_EMOJIS[p.category] ?? "🛍️"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black tracking-wider text-[#999] uppercase mb-0.5">{p.brand}</p>
                        <p className="text-[13.5px] font-semibold text-[#1A1A1A] truncate">{p.name}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display text-[15px] font-black text-[#C8102E]">{formatPrice(p.price)}</p>
                        <p className="text-[11px] text-[#999]">{formatPrice(calculateMonthly(p.price, 12))}/mo</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-[#999]">
                  <p className="text-[14px] font-semibold">No results for &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-[12px] mt-1">Try a different keyword</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
