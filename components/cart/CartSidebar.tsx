"use client";

import { X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { formatPrice } from "@/lib/utils";

export default function CartSidebar() {
  const { cartOpen, closeCart } = useUIStore();
  const { items, removeItem, totalPrice } = useCartStore();

  const CATEGORY_EMOJIS: Record<string, string> = {
    tv: "📺", aircon: "❄️", washer: "🫧", fridge: "🧊",
    smartphone: "📱", laptop: "💻", motorcycle: "🏍️", furniture: "🛋️",
  };

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-[400]"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[390px] max-w-full bg-white z-[401] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-[18px] border-b-2 border-[#EFEFEF]">
          <h3 className="font-display text-[20px] font-black flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#1A31A8]" />
            My Cart
            {items.length > 0 && (
              <span className="bg-[#C8102E] text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </h3>
          <button
            onClick={closeCart}
            className="bg-[#F8F8F8] border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#EFEFEF] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-[18px]">
          {items.length === 0 ? (
            <div className="text-center py-14">
              <div className="text-[52px] mb-3">🛒</div>
              <h4 className="font-display text-[18px] font-black text-[#1A1A1A] mb-1.5">
                Your cart is empty
              </h4>
              <p className="text-[13px] text-[#999]">
                Browse our deals and add items!
              </p>
            </div>
          ) : (
            items.map(({ product: p, quantity }) => (
              <div key={p.id} className="flex gap-3 py-3.5 border-b border-[#EFEFEF]">
                <div className="w-[60px] h-[60px] bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0 text-[24px]">
                  {CATEGORY_EMOJIS[p.category] ?? "🛍️"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1A1A1A] leading-snug mb-1 truncate">
                    {p.name}
                  </p>
                  <p className="font-display text-[16px] font-black text-[#C8102E]">
                    {formatPrice(p.price * quantity)}
                  </p>
                  {quantity > 1 && (
                    <p className="text-[11px] text-[#999]">
                      {formatPrice(p.price)} × {quantity}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeItem(p.id)}
                  className="bg-none border-none text-[18px] text-[#DEDEDE] cursor-pointer hover:text-[#C8102E] transition-colors self-start"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-[18px] border-t-2 border-[#EFEFEF]">
            <div className="flex justify-between items-baseline mb-3.5">
              <span className="text-[14px] text-[#555] font-semibold">Total</span>
              <span className="font-display text-[26px] font-black text-[#1A1A1A]">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#1A31A8] text-white text-center border-none rounded-md py-4 font-display text-[16px] font-black cursor-pointer hover:bg-[#122390] transition-colors no-underline"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/apply"
              onClick={closeCart}
              className="block w-full bg-[#F5C200] text-[#1A1A1A] text-center border-none rounded-md py-3 mt-2 font-display text-[14px] font-black cursor-pointer hover:bg-[#d4a800] transition-colors no-underline"
            >
              Apply for Installment Instead
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
