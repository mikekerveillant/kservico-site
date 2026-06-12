import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory, CATEGORY_LABELS, CATEGORY_EMOJIS } from "@/lib/products";
import type { ProductCategory } from "@/types";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return { title: "Category not found" };
  return {
    title: `${label} — KServico`,
    description: `Shop ${label} at KServico. 0% installment, authorized dealer, 180+ branches across Luzon.`,
  };
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) notFound();

  const products = getProductsByCategory(category as ProductCategory);
  const emoji = CATEGORY_EMOJIS[category] ?? "🛍️";

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-[#1A1A1A] py-10">
        <div className="max-w-[1280px] mx-auto px-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[12px] text-white/50 mb-2">
              <Link href="/" className="hover:text-white transition-colors no-underline text-white/50">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-white transition-colors no-underline text-white/50">Shop</Link>
              <span>/</span>
              <span className="text-white/80">{label}</span>
            </div>
            <h1 className="font-display text-[36px] font-black text-white tracking-tight flex items-center gap-3">
              <span className="text-[32px]">{emoji}</span>
              {label}
            </h1>
            <p className="text-white/60 text-[13px] mt-1">
              {products.length} products · 0% installment available
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-[13px] text-[#555]">
            Showing <strong className="text-[#1A1A1A]">{products.length}</strong> products
          </p>
          <select className="bg-white border border-[#EFEFEF] rounded-lg px-3 py-2 text-[13px] font-semibold text-[#555] outline-none hover:border-[#C8102E] transition-colors cursor-pointer">
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-[64px] mb-4">{emoji}</div>
            <h2 className="font-display text-[22px] font-black text-[#1A1A1A] mb-2">
              No products yet
            </h2>
            <p className="text-[14px] text-[#999] mb-6">
              We&apos;re adding {label.toLowerCase()} soon. Check back!
            </p>
            <Link href="/shop" className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#a00d24] transition-colors">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
