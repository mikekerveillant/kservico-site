"use client";

import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, calculateMonthly } from "@/lib/utils";
import { CATEGORY_EMOJIS } from "@/lib/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-[80px] mb-4">🛒</div>
          <h1 className="font-display text-[28px] font-black text-[#1A1A1A] mb-2">Your cart is empty</h1>
          <p className="text-[14px] text-[#999] mb-8 max-w-[320px] mx-auto">
            Looks like you haven&apos;t added anything yet. Browse our deals!
          </p>
          <Link
            href="/shop"
            className="bg-[#C8102E] text-white px-8 py-3.5 rounded-xl font-display font-black text-[15px] no-underline hover:bg-[#a00d24] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-[1280px] mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-7">
          <h1 className="font-display text-[28px] font-black text-[#1A1A1A] flex items-center gap-2">
            <ShoppingBag size={26} className="text-[#C8102E]" />
            My Cart
            <span className="text-[18px] text-[#999] font-semibold">({items.length} item{items.length !== 1 ? "s" : ""})</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-[12px] text-[#999] hover:text-[#C8102E] transition-colors flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Cart items */}
          <div className="flex flex-col gap-3">
            {items.map(({ product: p, quantity }) => {
              const emoji = CATEGORY_EMOJIS[p.category] ?? "🛍️";
              return (
                <div key={p.id} className="bg-white border border-[#EFEFEF] rounded-2xl p-5 flex gap-4 items-start">
                  <div className="w-[80px] h-[80px] bg-[#F8F8F8] rounded-xl flex items-center justify-center flex-shrink-0 text-[36px]">
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black tracking-wider text-[#999] uppercase mb-0.5">{p.brand}</p>
                    <Link href={`/product/${p.slug}`} className="font-semibold text-[14px] text-[#1A1A1A] hover:text-[#C8102E] transition-colors no-underline leading-snug block mb-2">
                      {p.name}
                    </Link>
                    <p className="text-[12px] text-[#555]">
                      As low as <strong className="text-[#1A1A1A]">{formatPrice(calculateMonthly(p.price, 12))}/mo</strong> for 12 months
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <p className="font-display text-[20px] font-black text-[#C8102E]">
                      {formatPrice(p.price * quantity)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(p.id, quantity - 1)}
                        className="w-7 h-7 bg-[#F8F8F8] rounded-lg border border-[#EFEFEF] text-[#555] font-bold text-[16px] flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
                      >
                        −
                      </button>
                      <span className="font-display font-black text-[15px] w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(p.id, quantity + 1)}
                        className="w-7 h-7 bg-[#F8F8F8] rounded-lg border border-[#EFEFEF] text-[#555] font-bold text-[16px] flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(p.id)}
                      className="text-[12px] text-[#999] hover:text-[#C8102E] transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5 h-fit sticky top-[80px]">
            <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-4">Order Summary</h2>
            <div className="flex flex-col gap-2.5 mb-4 pb-4 border-b border-[#EFEFEF]">
              {items.map(({ product: p, quantity }) => (
                <div key={p.id} className="flex justify-between text-[13px]">
                  <span className="text-[#555] truncate flex-1 pr-2">{p.name} ×{quantity}</span>
                  <span className="font-semibold text-[#1A1A1A] flex-shrink-0">{formatPrice(p.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-semibold text-[#555]">Total</span>
              <span className="font-display text-[28px] font-black text-[#1A1A1A]">{formatPrice(total)}</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/checkout"
                className="block w-full bg-[#C8102E] text-white text-center py-4 rounded-xl font-display font-black text-[15px] no-underline hover:bg-[#a00d24] transition-colors"
              >
                Checkout — {formatPrice(total)}
              </Link>
              <Link
                href="/apply"
                className="block w-full bg-[#1A1A1A] text-white text-center py-3.5 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#C8102E] transition-colors"
              >
                Apply for Installment
              </Link>
              <Link
                href="/shop"
                className="block w-full text-center py-3 text-[13px] font-semibold text-[#555] no-underline hover:text-[#C8102E] transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-[#EFEFEF] flex flex-col gap-1.5">
              {["✅ Authorized dealer warranty", "🚚 Free delivery available", "💳 0% installment option"].map((t) => (
                <p key={t} className="text-[11px] text-[#999]">{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
