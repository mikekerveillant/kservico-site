const CARDS = [
  {
    icon: "🏆",
    title: "54 Years of Trust",
    desc: "Founded in 1971, KServico has been the preferred retailer of Filipino families for generations. Top 1,000 Philippine Corporation.",
  },
  {
    icon: "🏪",
    title: "180+ Branches in Luzon",
    desc: "From Metro Manila to the provinces — there's a KServico near you. All branches are fully stocked and staffed.",
  },
  {
    icon: "✅",
    title: "Authorized Dealer",
    desc: "Buy with confidence. We're an authorized dealer of LG, Samsung, Honda, Apple, and 20+ top brands — all with official warranty.",
  },
  {
    icon: "💳",
    title: "In-House 0% Installment",
    desc: "No bank visit. No interest. Apply directly with KServico and get approved in 1-2 business days. Walang kailangang pumunta sa bangko.",
  },
];

export default function WhyKservico() {
  return (
    <section className="py-[52px] bg-[#F5C200]">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-display text-[28px] font-black text-[#1A1A1A] tracking-tight">
            Why <span className="text-[#1A31A8]">KServico?</span>
          </h2>
          <p className="text-[14px] text-[#333] mt-2">
            Millions of Filipino families trust us — here&apos;s why.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl p-7 pb-6 border-2 border-transparent hover:border-[#1A31A8] transition-colors relative overflow-hidden"
            >
              {/* Blue diagonal accent corner — matches real site card style */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 bg-[#1A31A8]"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />
              <div className="text-[36px] mb-3.5">{c.icon}</div>
              <h3 className="font-display text-[16px] font-black text-[#1A1A1A] mb-2">{c.title}</h3>
              <p className="text-[13px] text-[#555] leading-[1.6]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
