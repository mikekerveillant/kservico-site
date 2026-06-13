import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import type { ProductCategory } from "@/types";

const GROUPS = [
  {
    icon: "❄️", name: "Cooling & Refrigeration", color: "#dbeafe",
    subcategories: [
      { label: "Air Conditioners", category: "aircon" as ProductCategory, href: "/shop/aircon" },
      { label: "Refrigerators", category: "fridge" as ProductCategory, href: "/shop/fridge" },
    ],
  },
  {
    icon: "🫧", name: "Laundry & Kitchen", color: "#ede9fe",
    subcategories: [
      { label: "Washers", category: "washer" as ProductCategory, href: "/shop/washer" },
      { label: "Gas Ranges", category: "gas-range" as ProductCategory, href: "/shop/gas-range" },
      { label: "Small Appliances", category: "small-appliance" as ProductCategory, href: "/shop/small-appliance" },
    ],
  },
  {
    icon: "📺", name: "TV & Audio", color: "#fef9c3",
    subcategories: [
      { label: "TVs", category: "tv" as ProductCategory, href: "/shop/tv" },
      { label: "Audio Systems", category: "audio" as ProductCategory, href: "/shop/audio" },
    ],
  },
  {
    icon: "📱", name: "Gadgets & Tech", color: "#fce7f3",
    subcategories: [
      { label: "Smartphones", category: "smartphone" as ProductCategory, href: "/shop/smartphone" },
      { label: "Laptops", category: "laptop" as ProductCategory, href: "/shop/laptop" },
      { label: "Gadgets & Printers", category: "gadget" as ProductCategory, href: "/shop/gadget" },
    ],
  },
  {
    icon: "🛋️", name: "Furniture", color: "#e0f2fe",
    subcategories: [
      { label: "Furniture", category: "furniture" as ProductCategory, href: "/shop/furniture" },
    ],
  },
  {
    icon: "🏍️", name: "Vehicles", color: "#fee2e2",
    subcategories: [
      { label: "Motorcycles", category: "motorcycle" as ProductCategory, href: "/motorcycles" },
      { label: "E-Bikes", category: "ebike" as ProductCategory, href: "/shop/ebike" },
      { label: "Three Wheelers", category: "three-wheeler" as ProductCategory, href: "/shop/three-wheeler" },
    ],
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-display text-[24px] font-black text-[#1A1A1A] tracking-tight">
              Shop by <span className="text-[#1A31A8]">Category</span>
            </h2>
            <p className="text-[13px] text-[#999] mt-0.5">Find exactly what you need</p>
          </div>
          <Link href="/shop" className="text-[13px] font-bold text-[#1A31A8] no-underline flex items-center gap-1 hover:gap-2 transition-all">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GROUPS.map((group) => {
            const total = group.subcategories.reduce(
              (sum, sub) => sum + getProductsByCategory(sub.category).length,
              0
            );
            return (
              <div
                key={group.name}
                className="bg-[#F8F8F8] border-2 border-transparent rounded-xl p-4 transition-all hover:border-[#1A31A8] hover:bg-[#e8ecfa]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[20px] flex-shrink-0"
                    style={{ background: group.color }}
                  >
                    {group.icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A] leading-tight">{group.name}</div>
                    <div className="text-[11px] text-[#999]">{total} items</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.subcategories.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="bg-white border border-[#EFEFEF] rounded-full px-3 py-1 text-[11.5px] font-semibold text-[#555] no-underline hover:border-[#1A31A8] hover:text-[#1A31A8] transition-colors"
                    >
                      {sub.label} · {getProductsByCategory(sub.category).length}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
