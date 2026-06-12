import Link from "next/link";

const CATEGORIES = [
  { icon: "❄️", name: "Air Conditioners", count: 48, color: "#dbeafe", href: "/shop/aircon" },
  { icon: "📺", name: "TVs", count: 62, color: "#fef9c3", href: "/shop/tv" },
  { icon: "🧊", name: "Refrigerators", count: 55, color: "#d1fae5", href: "/shop/fridge" },
  { icon: "🫧", name: "Washers", count: 34, color: "#ede9fe", href: "/shop/washer" },
  { icon: "🏍️", name: "Motorcycles", count: 41, color: "#fee2e2", href: "/motorcycles" },
  { icon: "📱", name: "Smartphones", count: 78, color: "#fce7f3", href: "/shop/smartphone" },
  { icon: "💻", name: "Laptops", count: 39, color: "#e0f2fe", href: "/shop/laptop" },
  { icon: "🛋️", name: "Furniture", count: 92, color: "#fef9c3", href: "/shop/furniture" },
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
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex flex-col items-center gap-2 py-[18px] px-2 pb-3.5 bg-[#F8F8F8] border-2 border-transparent rounded-xl no-underline cursor-pointer hover:border-[#1A31A8] hover:bg-[#e8ecfa] hover:-translate-y-0.5 transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px]"
                style={{ background: cat.color }}
              >
                {cat.icon}
              </div>
              <span className="text-[11.5px] font-bold text-[#1A1A1A] text-center leading-tight">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#999]">{cat.count} items</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
