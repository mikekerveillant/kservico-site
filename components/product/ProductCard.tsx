"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice, calculateMonthly, calculateDiscount } from "@/lib/utils";
import { CATEGORY_EMOJIS } from "@/lib/products";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product: p, compact }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const pct = p.original_price ? calculateDiscount(p.price, p.original_price) : 0;
  const monthly = calculateMonthly(p.price, 12);
  const emoji = CATEGORY_EMOJIS[p.category] ?? "🛍️";

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(p);
    openCart();
  }

  return (
    <Link
      href={`/product/${p.slug}`}
      className="bg-white border-[1.5px] border-[#EFEFEF] rounded-xl overflow-hidden hover:border-[#C8102E] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,16,46,0.1)] transition-all relative group no-underline block"
    >
      {/* Image */}
      <div className={`bg-[#F8F8F8] flex items-center justify-center relative overflow-hidden ${compact ? "h-[170px]" : "h-[220px]"}`}>
        {p.images?.[0] ? (
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-[60px] group-hover:scale-110 transition-transform">{emoji}</span>
        )}
        {pct > 0 && (
          <span className="absolute top-2 left-2 bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{pct}%
          </span>
        )}
        {p.is_featured && (
          <span className="absolute top-2 right-2 bg-[#F5A623] text-[#1A1A1A] text-[10px] font-black px-2 py-0.5 rounded-full">
            HOT
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-3 pb-3.5">
        <p className="text-[10px] font-black tracking-wider text-[#999] uppercase mb-0.5">{p.brand}</p>
        <p className="text-[13px] font-semibold text-[#1A1A1A] leading-snug mb-2 line-clamp-2 min-h-[36px]">
          {p.name}
        </p>
        <div className="flex items-baseline gap-1.5 mb-1.5 flex-wrap">
          <span className="font-display text-[19px] font-black text-[#C8102E]">{formatPrice(p.price)}</span>
          {p.original_price && (
            <span className="text-[11px] text-[#999] line-through">{formatPrice(p.original_price)}</span>
          )}
        </div>
        {!compact && (
          <p className="text-[11px] text-[#999] mb-2.5">
            As low as <strong className="text-[#1A1A1A] font-bold">{formatPrice(monthly)}/mo</strong>
          </p>
        )}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#1A1A1A] text-white border-none rounded-md py-2.5 font-display text-[13px] font-black cursor-pointer hover:bg-[#C8102E] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
