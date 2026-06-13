import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/products";
import type { ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Motorcycles & Vehicles — KServico",
  description: "Shop Honda, Yamaha, Kawasaki, Suzuki, Kymco motorcycles, e-bikes, and Bajaj three-wheelers at KServico. 0% installment financing available.",
};

interface Props {
  searchParams: Promise<{ type?: string; brand?: string }>;
}

const TYPE_TABS: { value: string; label: string; category?: ProductCategory }[] = [
  { value: "all", label: "All Vehicles" },
  { value: "motorcycle", label: "Motorcycles", category: "motorcycle" },
  { value: "ebike", label: "E-Bikes", category: "ebike" },
  { value: "three-wheeler", label: "Three-Wheelers", category: "three-wheeler" },
];

export default async function MotorcyclesPage({ searchParams }: Props) {
  const { type = "all", brand = "All" } = await searchParams;

  const activeTab = TYPE_TABS.find((t) => t.value === type) ?? TYPE_TABS[0];

  const byType = MOCK_PRODUCTS.filter(
    (p) =>
      p.is_active &&
      (activeTab.category
        ? p.category === activeTab.category
        : p.category === "motorcycle" || p.category === "ebike" || p.category === "three-wheeler")
  );

  const brands = ["All", ...Array.from(new Set(byType.map((p) => p.brand))).sort()];
  const vehicles = brand === "All" ? byType : byType.filter((p) => p.brand === brand);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C8102E]/20 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <p className="text-[#F5A623] text-[11px] font-black tracking-wider uppercase mb-2">
            Authorized Dealer · Honda · Yamaha · Kawasaki · Suzuki · Kymco · Bajaj
          </p>
          <h1 className="font-display text-[48px] font-black text-white tracking-tight leading-tight mb-4">
            Find Your
            <br />
            <span className="text-[#C8102E]">Perfect Ride.</span>
          </h1>
          <p className="text-white/60 text-[15px] max-w-[480px] mb-8">
            0% installment financing · 180+ branches for pickup & service · Official warranty on every unit
          </p>

          {/* Type tabs */}
          <div className="flex gap-2 flex-wrap mb-3">
            {TYPE_TABS.map((t) => (
              <Link
                key={t.value}
                href={t.value === "all" ? "/motorcycles" : `/motorcycles?type=${t.value}`}
                className={`px-5 py-2 rounded-full text-[13px] font-bold border-2 transition-all no-underline ${
                  t.value === activeTab.value
                    ? "bg-[#C8102E] border-[#C8102E] text-white"
                    : "bg-transparent border-white/20 text-white/60 hover:border-white/60 hover:text-white"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          {/* Brand filter chips */}
          {brands.length > 2 && (
            <div className="flex gap-2 flex-wrap">
              {brands.map((b) => {
                const params = new URLSearchParams();
                if (activeTab.value !== "all") params.set("type", activeTab.value);
                if (b !== "All") params.set("brand", b);
                const query = params.toString();
                return (
                  <Link
                    key={b}
                    href={query ? `/motorcycles?${query}` : "/motorcycles"}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-bold border transition-all no-underline ${
                      b === brand
                        ? "bg-white/15 border-white/40 text-white"
                        : "bg-transparent border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {b}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1280px] mx-auto px-5 pb-16">
        <p className="text-white/50 text-[13px] mb-4">
          Showing <strong className="text-white">{vehicles.length}</strong> vehicle{vehicles.length === 1 ? "" : "s"}
        </p>
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vehicles.map((v) => (
              <ProductCard key={v.id} product={v} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-[64px] mb-4">🏍️</div>
            <h2 className="font-display text-[22px] font-black text-white mb-2">No vehicles found</h2>
            <p className="text-[14px] text-white/50 mb-6">Try a different category or brand.</p>
            <Link href="/motorcycles" className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#a00d24] transition-colors">
              View All Vehicles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
