const PROMOS = [
  { icon: "🚚", title: "Free Delivery", sub: "Metro Manila & nearby cities" },
  { icon: "💳", title: "0% Installment", sub: "6, 12, 24, 36 months" },
  { icon: "🔧", title: "Service Centers", sub: "Authorized after-sales support" },
  { icon: "🏪", title: "180+ Branches", sub: "Across all of Luzon" },
];

export default function PromoStrip() {
  return (
    <div className="bg-[#1A31A8] py-3.5">
      <div className="max-w-[1280px] mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-0">
        {PROMOS.map((p, i) => (
          <div
            key={p.title}
            className={`flex items-center gap-3 px-6 ${i !== PROMOS.length - 1 ? "border-r border-white/20" : ""} ${i === 0 ? "pl-0" : ""}`}
          >
            <span className="text-[24px] flex-shrink-0">{p.icon}</span>
            <div>
              <div className="text-[13px] font-black text-white font-display">{p.title}</div>
              <div className="text-[11px] text-white/70">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
