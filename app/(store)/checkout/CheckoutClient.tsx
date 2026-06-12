"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Truck, Store, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_EMOJIS } from "@/lib/products";
import { MOCK_BRANCHES } from "@/lib/branches";

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery / Pickup" },
  { value: "gcash", label: "GCash" },
  { value: "maya", label: "Maya" },
  { value: "card", label: "Credit / Debit Card" },
];

function generateReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `KSV-${year}-${rand}`;
}

export default function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [reference, setReference] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    branchId: MOCK_BRANCHES[0]?.id ?? "",
    notes: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isValid = useMemo(() => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim()) return false;
    if (deliveryMethod === "delivery") {
      return Boolean(form.address.trim() && form.city.trim() && form.province.trim());
    }
    return Boolean(form.branchId);
  }, [form, deliveryMethod]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || items.length === 0) return;
    const ref = generateReference();
    setReference(ref);
    clearCart();
  }

  // Success screen
  if (reference) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-5 py-16">
        <div className="bg-white border border-[#EFEFEF] rounded-2xl p-8 max-w-[440px] text-center">
          <CheckCircle2 size={56} className="mx-auto mb-4 text-[#1AA84B]" />
          <h1 className="font-display text-[24px] font-black text-[#1A1A1A] mb-2">
            Order Placed!
          </h1>
          <p className="text-[14px] text-[#555] mb-1">
            Your reference number is
          </p>
          <p className="font-display text-[20px] font-black text-[#C8102E] mb-5">{reference}</p>
          <p className="text-[13px] text-[#999] mb-6">
            We&apos;ll send updates to <strong className="text-[#555]">{form.email}</strong> and{" "}
            <strong className="text-[#555]">{form.phone}</strong>.
            {deliveryMethod === "delivery"
              ? " Your order will be delivered to the address provided."
              : " Please visit your selected branch to pick up your order."}
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/shop"
              className="block w-full bg-[#C8102E] text-white text-center py-3.5 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#a00d24] transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full text-center py-3 text-[13px] font-semibold text-[#555] no-underline hover:text-[#C8102E] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-[80px] mb-4">🛒</div>
          <h1 className="font-display text-[28px] font-black text-[#1A1A1A] mb-2">Your cart is empty</h1>
          <p className="text-[14px] text-[#999] mb-8 max-w-[320px] mx-auto">
            Add items to your cart before checking out.
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
        <h1 className="font-display text-[28px] font-black text-[#1A1A1A] flex items-center gap-2 mb-7">
          <ShoppingBag size={26} className="text-[#C8102E]" />
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left — details */}
          <div className="flex flex-col gap-5">
            {/* Delivery method */}
            <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5">
              <h2 className="font-display text-[16px] font-black text-[#1A1A1A] mb-3.5">
                Delivery Method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex items-center gap-2.5 border-2 rounded-xl p-4 text-left transition-all ${
                    deliveryMethod === "delivery" ? "border-[#C8102E] bg-[#FEF2F4]" : "border-[#EFEFEF] hover:border-[#C8102E]"
                  }`}
                >
                  <Truck size={20} className="text-[#C8102E] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Home Delivery</p>
                    <p className="text-[11px] text-[#999]">Metro Manila & nearby cities</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex items-center gap-2.5 border-2 rounded-xl p-4 text-left transition-all ${
                    deliveryMethod === "pickup" ? "border-[#C8102E] bg-[#FEF2F4]" : "border-[#EFEFEF] hover:border-[#C8102E]"
                  }`}
                >
                  <Store size={20} className="text-[#C8102E] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-[#1A1A1A]">Branch Pickup</p>
                    <p className="text-[11px] text-[#999]">180+ branches across Luzon</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5">
              <h2 className="font-display text-[16px] font-black text-[#1A1A1A] mb-3.5">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Full name"
                  className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors sm:col-span-2"
                />
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Mobile number"
                  className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Email address"
                  className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors"
                />
              </div>
            </div>

            {/* Delivery address or branch */}
            {deliveryMethod === "delivery" ? (
              <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5">
                <h2 className="font-display text-[16px] font-black text-[#1A1A1A] mb-3.5">
                  Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    required
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Street address"
                    className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors sm:col-span-2"
                  />
                  <input
                    required
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="City"
                    className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors"
                  />
                  <input
                    required
                    value={form.province}
                    onChange={(e) => update("province", e.target.value)}
                    placeholder="Province"
                    className="border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5">
                <h2 className="font-display text-[16px] font-black text-[#1A1A1A] mb-3.5">
                  Pickup Branch
                </h2>
                <select
                  required
                  value={form.branchId}
                  onChange={(e) => update("branchId", e.target.value)}
                  className="w-full border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-[#C8102E] transition-colors cursor-pointer"
                >
                  {MOCK_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} — {b.city}, {b.province}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Payment method */}
            <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5">
              <h2 className="font-display text-[16px] font-black text-[#1A1A1A] mb-3.5">
                Payment Method
              </h2>
              <div className="flex flex-col gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.value}
                    className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all ${
                      paymentMethod === m.value ? "border-[#C8102E] bg-[#FEF2F4]" : "border-[#EFEFEF] hover:border-[#C8102E]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.value}
                      checked={paymentMethod === m.value}
                      onChange={() => setPaymentMethod(m.value)}
                      className="accent-[#C8102E]"
                    />
                    <span className="text-[13.5px] font-semibold text-[#1A1A1A]">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — order summary */}
          <div className="bg-white border border-[#EFEFEF] rounded-2xl p-5 h-fit sticky top-[80px]">
            <h2 className="font-display text-[18px] font-black text-[#1A1A1A] mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-[#EFEFEF] max-h-[280px] overflow-y-auto">
              {items.map(({ product: p, quantity }) => (
                <div key={p.id} className="flex gap-3 items-start">
                  <div className="w-[44px] h-[44px] bg-[#F8F8F8] rounded-lg flex items-center justify-center flex-shrink-0 text-[20px]">
                    {CATEGORY_EMOJIS[p.category] ?? "🛍️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-semibold text-[#1A1A1A] truncate">{p.name}</p>
                    <p className="text-[11px] text-[#999]">Qty {quantity}</p>
                  </div>
                  <span className="text-[13px] font-bold text-[#1A1A1A] flex-shrink-0">{formatPrice(p.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-semibold text-[#555]">Total</span>
              <span className="font-display text-[28px] font-black text-[#1A1A1A]">{formatPrice(total)}</span>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="block w-full bg-[#C8102E] text-white text-center py-4 rounded-xl font-display font-black text-[15px] hover:bg-[#a00d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Place Order — {formatPrice(total)}
            </button>
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="block w-full text-center py-3 mt-2 text-[13px] font-semibold text-[#555] hover:text-[#C8102E] transition-colors"
            >
              ← Back to Cart
            </button>
            <div className="mt-4 pt-4 border-t border-[#EFEFEF] flex flex-col gap-1.5">
              {["✅ Authorized dealer warranty", "🚚 Free delivery available", "💳 0% installment option"].map((t) => (
                <p key={t} className="text-[11px] text-[#999]">{t}</p>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
