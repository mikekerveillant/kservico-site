import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS, CATEGORY_LABELS, CATEGORY_EMOJIS } from "@/lib/products";
import type { ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Shop All Products — KServico",
  description: "Browse all appliances, motorcycles, smartphones, laptops, and furniture at KServico.",
};

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-[#C8102E] py-10">
        <div className="max-w-[1280px] mx-auto px-5">
          <h1 className="font-display text-[36px] font-black text-white tracking-tight mb-1">
            All Products
          </h1>
          <p className="text-white/75 text-[14px]">
            {MOCK_PRODUCTS.length}+ products · 0% installment · Authorized dealer
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 py-8">
        {/* Category quick-links */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/shop" className="bg-[#C8102E] text-white px-4 py-1.5 rounded-full text-[13px] font-bold no-underline">
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/shop/${cat}`}
              className="bg-white border border-[#EFEFEF] text-[#555] px-4 py-1.5 rounded-full text-[13px] font-bold no-underline hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
            >
              {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {MOCK_PRODUCTS.filter((p) => p.is_active).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
