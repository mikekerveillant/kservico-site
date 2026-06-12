import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/products";
import { formatPrice, calculateMonthly } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Motorcycles — KServico",
  description: "Shop Honda, Yamaha, Kawasaki, Suzuki, and Kymco motorcycles at KServico. 0% installment financing available.",
};

const BRANDS = ["All", "Honda", "Yamaha", "Kawasaki", "Suzuki", "Kymco"];
const motos = MOCK_PRODUCTS.filter((p) => p.category === "motorcycle" && p.is_active);

export default function MotorcyclesPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C8102E]/20 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <p className="text-[#F5A623] text-[11px] font-black tracking-wider uppercase mb-2">
            Authorized Dealer · Honda · Yamaha · Kawasaki · Suzuki · Kymco
          </p>
          <h1 className="font-display text-[48px] font-black text-white tracking-tight leading-tight mb-4">
            Find Your
            <br />
            <span className="text-[#C8102E]">Perfect Ride.</span>
          </h1>
          <p className="text-white/60 text-[15px] max-w-[480px] mb-8">
            0% installment financing · 180+ branches for pickup & service · Official warranty on every unit
          </p>

          {/* Brand filter chips */}
          <div className="flex gap-2 flex-wrap">
            {BRANDS.map((b) => (
              <button
                key={b}
                className={`px-5 py-2 rounded-full text-[13px] font-bold border-2 transition-all ${
                  b === "All"
                    ? "bg-[#C8102E] border-[#C8102E] text-white"
                    : "bg-transparent border-white/20 text-white/60 hover:border-white/60 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1280px] mx-auto px-5 pb-16">
        {motos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {motos.map((m) => (
              <MotoCard key={m.id} product={m} />
            ))}
          </div>
        ) : (
          /* Placeholder cards when no data yet */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PLACEHOLDER_MOTOS.map((m) => (
              <PlaceholderMotoCard key={m.name} moto={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MotoCard({ product: m }: { product: (typeof MOCK_PRODUCTS)[0] }) {
  return (
    <Link
      href={`/product/${m.slug}`}
      className="bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C8102E] hover:bg-[#C8102E]/[0.08] hover:-translate-y-1 transition-all no-underline block"
    >
      <div className="h-[170px] flex items-center justify-center bg-black/20 relative p-4">
        <span className="absolute top-2.5 left-2.5 bg-black/50 text-white/70 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
          {m.brand}
        </span>
        <span className="text-[72px]">🏍️</span>
      </div>
      <div className="p-4 pb-5">
        <p className="text-[10px] font-bold tracking-wider uppercase text-[#F5A623] mb-1">Motorcycle</p>
        <h3 className="text-[15px] font-black text-white font-display mb-2 leading-tight">{m.name}</h3>
        <p className="font-display text-[20px] font-black text-white">{formatPrice(m.price)}</p>
        <p className="text-[11.5px] text-white/40 mt-0.5">
          As low as <strong className="text-[#F5A623]">{formatPrice(calculateMonthly(m.price, 12))}/mo</strong>
        </p>
      </div>
    </Link>
  );
}

const PLACEHOLDER_MOTOS = [
  { brand: "Honda", name: "Honda Click 125i CBS+ABS", type: "Scooter", price: 88900 },
  { brand: "Yamaha", name: "Yamaha NMAX 155", type: "Scooter", price: 138900 },
  { brand: "Kawasaki", name: "Kawasaki Barako II 175", type: "Moto", price: 95000 },
  { brand: "Suzuki", name: "Suzuki Raider R150 Fi", type: "Sport", price: 89900 },
  { brand: "Honda", name: "Honda BeAT 110", type: "Scooter", price: 72900 },
  { brand: "Yamaha", name: "Yamaha Mio Gravis 125", type: "Scooter", price: 83900 },
  { brand: "Kymco", name: "Kymco Like 150i", type: "Retro Scooter", price: 102000 },
  { brand: "Suzuki", name: "Suzuki Burgman Street 125", type: "Scooter", price: 86900 },
];

function PlaceholderMotoCard({ moto: m }: { moto: typeof PLACEHOLDER_MOTOS[0] }) {
  return (
    <div className="bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C8102E] hover:bg-[#C8102E]/[0.08] hover:-translate-y-1 transition-all cursor-pointer">
      <div className="h-[170px] flex items-center justify-center bg-black/20 relative p-4">
        <span className="absolute top-2.5 left-2.5 bg-black/50 text-white/70 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
          {m.brand}
        </span>
        <span className="text-[72px]">🏍️</span>
      </div>
      <div className="p-4 pb-5">
        <p className="text-[10px] font-bold tracking-wider uppercase text-[#F5A623] mb-1">{m.type}</p>
        <h3 className="text-[15px] font-black text-white font-display mb-2 leading-tight">{m.name}</h3>
        <p className="font-display text-[20px] font-black text-white">{formatPrice(m.price)}</p>
        <p className="text-[11.5px] text-white/40 mt-0.5">
          As low as <strong className="text-[#F5A623]">{formatPrice(calculateMonthly(m.price, 12))}/mo</strong>
        </p>
      </div>
    </div>
  );
}
