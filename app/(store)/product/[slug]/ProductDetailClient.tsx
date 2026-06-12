"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart, Share2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice, calculateMonthly, calculateDiscount } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/products";
import type { Product } from "@/types";

const TERMS = [6, 12, 24, 36];

interface Props {
  product: Product;
  related: Product[];
  emoji: string;
}

export default function ProductDetailClient({ product: p, related, emoji }: Props) {
  const [activeTerm, setActiveTerm] = useState(12);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const monthly = calculateMonthly(p.price, activeTerm);
  const pct = p.original_price ? calculateDiscount(p.price, p.original_price) : 0;

  function handleAddToCart() {
    addItem(p);
    openCart();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] border-b border-[#EFEFEF] py-3">
        <div className="max-w-[1280px] mx-auto px-5 flex items-center gap-1.5 text-[12px] text-[#999]">
          <Link href="/" className="hover:text-[#C8102E] transition-colors no-underline text-[#999]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-[#C8102E] transition-colors no-underline text-[#999]">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop/${p.category}`} className="hover:text-[#C8102E] transition-colors no-underline text-[#999]">
            {CATEGORY_LABELS[p.category]}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">{p.name}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          {/* Gallery */}
          <ProductGallery images={p.images} name={p.name} emoji={emoji} />

          {/* Info */}
          <div>
            <p className="text-[11px] font-black tracking-wider text-[#999] uppercase mb-1.5">{p.brand}</p>
            <h1 className="font-display text-[28px] font-black text-[#1A1A1A] leading-tight tracking-tight mb-4">
              {p.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
              <span className="font-display text-[36px] font-black text-[#C8102E]">{formatPrice(p.price)}</span>
              {p.original_price && (
                <>
                  <span className="text-[18px] text-[#999] line-through">{formatPrice(p.original_price)}</span>
                  <span className="bg-[#C8102E] text-white text-[12px] font-black px-2.5 py-0.5 rounded-full font-display">
                    SAVE {pct}%
                  </span>
                </>
              )}
            </div>

            {/* Installment calculator */}
            <div className="bg-[#F8F8F8] rounded-xl p-4 mb-5 border border-[#EFEFEF]">
              <p className="text-[11px] font-black uppercase tracking-wider text-[#999] mb-2.5">
                💳 0% Installment — Choose your term
              </p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {TERMS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTerm(t)}
                    className={`border-2 rounded-lg py-2 text-center font-display text-[13px] font-black cursor-pointer transition-all ${
                      activeTerm === t
                        ? "bg-[#C8102E] border-[#C8102E] text-white"
                        : "bg-white border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E]"
                    }`}
                  >
                    {t} mos
                  </button>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[#C8102E] to-[#a00d24] rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-white/70">Monthly payment</p>
                  <p className="font-display text-[24px] font-black text-white">{formatPrice(monthly)}/mo</p>
                </div>
                <Link
                  href={`/apply?product=${p.id}`}
                  className="bg-white text-[#C8102E] font-display font-black text-[13px] px-4 py-2 rounded-lg no-underline hover:bg-[#F5A623] hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
                >
                  Apply Now →
                </Link>
              </div>
            </div>

            {/* Description */}
            {p.description && (
              <p className="text-[14px] text-[#555] leading-[1.7] mb-5">{p.description}</p>
            )}

            {/* Features */}
            {p.features.length > 0 && (
              <ul className="flex flex-col gap-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[#555]">
                    <span className="text-[#C8102E] font-black text-[15px] flex-shrink-0 mt-px">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2.5 mb-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#C8102E] text-white border-none rounded-xl py-4 font-display text-[16px] font-black cursor-pointer hover:bg-[#a00d24] transition-colors"
              >
                Add to Cart
              </button>
              <Link
                href={`/apply?product=${p.id}`}
                className="block w-full text-center bg-[#1A1A1A] text-white border-none rounded-xl py-3.5 font-display text-[15px] font-black cursor-pointer hover:bg-[#C8102E] transition-colors no-underline"
              >
                Apply for Installment
              </Link>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-[#EFEFEF] rounded-xl py-3 text-[13px] font-semibold text-[#555] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors">
                  <Heart size={16} /> Wishlist
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-[#EFEFEF] rounded-xl py-3 text-[13px] font-semibold text-[#555] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <ShieldCheck size={18} className="text-[#C8102E]" />, label: "Official Warranty", sub: "Manufacturer warranty included" },
                { icon: <Truck size={18} className="text-[#C8102E]" />, label: "Free Delivery", sub: "Metro Manila & nearby" },
                { icon: <RotateCcw size={18} className="text-[#C8102E]" />, label: "Easy Returns", sub: "7-day return policy" },
              ].map((b) => (
                <div key={b.label} className="bg-[#F8F8F8] rounded-xl p-3 text-center">
                  <div className="flex justify-center mb-1">{b.icon}</div>
                  <p className="text-[11px] font-bold text-[#1A1A1A] leading-tight">{b.label}</p>
                  <p className="text-[10px] text-[#999] mt-0.5 leading-tight">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications */}
        {p.specifications && Object.keys(p.specifications).length > 0 && (
          <div className="mb-14">
            <h2 className="font-display text-[22px] font-black text-[#1A1A1A] mb-5">
              Specifications
            </h2>
            <div className="border border-[#EFEFEF] rounded-2xl overflow-hidden">
              {Object.entries(p.specifications).map(([key, val], i) => (
                <div
                  key={key}
                  className={`grid grid-cols-[200px_1fr] gap-4 px-5 py-3.5 ${
                    i % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"
                  }`}
                >
                  <span className="text-[13px] font-semibold text-[#555]">{key}</span>
                  <span className="text-[13px] text-[#1A1A1A]">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-display text-[22px] font-black text-[#1A1A1A]">
                You might also like
              </h2>
              <Link href={`/shop/${p.category}`} className="text-[13px] font-bold text-[#C8102E] no-underline hover:gap-2 transition-all">
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
