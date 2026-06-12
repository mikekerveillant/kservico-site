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

interface Props {
  searchParams: Promise<{ brand?: string }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const { brand } = await searchParams;

  const products = MOCK_PRODUCTS.filter(
    (p) => p.is_active && (!brand || p.brand.toLowerCase() === brand.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-[#C8102E] py-10">
        <div className="max-w-[1280px] mx-auto px-5">
          <h1 className="font-display text-[36px] font-black text-white tracking-tight mb-1">
            {brand ? `${brand} Products` : "All Products"}
          </h1>
          <p className="text-white/75 text-[14px]">
            {brand
              ? `${products.length} product${products.length === 1 ? "" : "s"} from ${brand}`
              : `${MOCK_PRODUCTS.length}+ products · 0% installment · Authorized dealer`}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 py-8">
        {/* Category quick-links */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/shop" className={`px-4 py-1.5 rounded-full text-[13px] font-bold no-underline ${!brand ? "bg-[#C8102E] text-white" : "bg-white border border-[#EFEFEF] text-[#555] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"}`}>
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

        {/* Brand filter notice */}
        {brand && (
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[13px] text-[#999]">Filtering by brand:</span>
            <span className="bg-[#1A31A8] text-white px-3 py-1 rounded-full text-[12px] font-bold">{brand}</span>
            <Link href="/shop" className="text-[12px] font-bold text-[#C8102E] no-underline hover:underline">
              Clear filter
            </Link>
          </div>
        )}

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[48px] mb-3">🔍</p>
            <p className="text-[16px] font-bold text-[#1A1A1A] mb-1">No {brand} products yet</p>
            <p className="text-[13px] text-[#999] mb-6">Check back soon, or browse our full catalog.</p>
            <Link
              href="/shop"
              className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-display font-black text-[13px] no-underline hover:bg-[#a00d24] transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
