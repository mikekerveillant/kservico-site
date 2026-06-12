import Link from "next/link";

export default function PromoBanners() {
  return (
    <section className="py-0 pb-12">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-3">
          {/* Banner 1: Motorcycles */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] flex flex-col justify-end p-6 relative cursor-pointer hover:scale-[1.01] transition-transform bg-gradient-to-br from-[#0D1B2A] to-[#1a3a5c] text-white">
            <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none">
              <span className="text-[100px] opacity-20">🏍️</span>
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-black tracking-wider uppercase text-white/80 mb-1">
                All Brands Available
              </p>
              <h3 className="font-display text-[22px] font-black leading-tight mb-2.5">
                Honda · Yamaha
                <br />
                Kawasaki · Suzuki
              </h3>
              <Link
                href="/motorcycles"
                className="inline-block bg-white text-[#1E3A8A] rounded-full px-4 py-1.5 text-[12px] font-black no-underline hover:scale-105 transition-transform"
              >
                Shop Motorcycles →
              </Link>
            </div>
          </div>

          {/* Banner 2: Anniversary Sale */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] flex flex-col justify-end p-6 relative cursor-pointer hover:scale-[1.01] transition-transform bg-[#C8102E] text-white">
            <div className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none">
              <span className="text-[80px] opacity-20">🎉</span>
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-black tracking-wider uppercase text-white/80 mb-1">
                55th Anniversary
              </p>
              <h3 className="font-display text-[22px] font-black leading-tight mb-2.5">
                Up to 50% OFF
                <br />
                All Items
              </h3>
              <Link
                href="/shop"
                className="inline-block bg-white text-[#C8102E] rounded-full px-4 py-1.5 text-[12px] font-black no-underline hover:scale-105 transition-transform"
              >
                Shop the Sale →
              </Link>
            </div>
          </div>

          {/* Banner 3: Appliances */}
          <div className="rounded-2xl overflow-hidden min-h-[180px] flex flex-col justify-end p-6 relative cursor-pointer hover:scale-[1.01] transition-transform bg-gradient-to-br from-[#064E3B] to-[#065F46] text-white">
            <div className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none">
              <span className="text-[80px] opacity-20">🏠</span>
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-black tracking-wider uppercase text-white/80 mb-1">
                LG · Samsung · Haier
              </p>
              <h3 className="font-display text-[22px] font-black leading-tight mb-2.5">
                Home Appliances
                <br />
                0% Installment
              </h3>
              <Link
                href="/shop/aircon"
                className="inline-block bg-white text-[#15803D] rounded-full px-4 py-1.5 text-[12px] font-black no-underline hover:scale-105 transition-transform"
              >
                Shop Appliances →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
