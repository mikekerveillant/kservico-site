import Link from "next/link";
import { formatPrice, calculateMonthly } from "@/lib/utils";

const MOTOS = [
  { brand: "Honda", name: "Honda Click 125i", type: "Underbone", price: 88900, emoji: "🏍️" },
  { brand: "Yamaha", name: "Yamaha NMAX 155", type: "Scooter", price: 138900, emoji: "🛵" },
  { brand: "Kawasaki", name: "Kawasaki Barako II 175", type: "Moto", price: 95000, emoji: "🏍️" },
  { brand: "Suzuki", name: "Suzuki Raider R150 Fi", type: "Sport", price: 89900, emoji: "🏍️" },
];

export default function MotorcycleSection() {
  return (
    <section className="bg-[#1A1A1A] py-[52px]">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-display text-[26px] font-black text-white">
            <span className="inline-block bg-[#C8102E] text-white px-3 py-0.5 rounded-md mr-2">
              MOTO
            </span>
            Shop Motorcycles
          </h2>
          <Link href="/motorcycles" className="text-[13px] font-bold text-[#F5A623] no-underline hover:underline">
            View all models →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {MOTOS.map((m) => (
            <div
              key={m.name}
              className="bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#C8102E] hover:bg-[#C8102E]/[0.08] hover:-translate-y-0.5 transition-all"
            >
              <div className="h-[170px] flex items-center justify-center bg-black/20 relative p-4">
                <span className="absolute top-2.5 left-2.5 bg-black/50 text-white/70 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {m.brand}
                </span>
                <span className="text-[72px]">{m.emoji}</span>
              </div>
              <div className="p-4 pb-[18px]">
                <p className="text-[10px] font-bold tracking-wider uppercase text-[#F5A623] mb-1">{m.type}</p>
                <h3 className="text-[15px] font-black text-white font-display mb-2 leading-tight">{m.name}</h3>
                <p className="font-display text-[20px] font-black text-white">{formatPrice(m.price)}</p>
                <p className="text-[11.5px] text-white/40 mt-0.5">
                  As low as <strong className="text-[#F5A623]">{formatPrice(calculateMonthly(m.price, 12))}/mo</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
