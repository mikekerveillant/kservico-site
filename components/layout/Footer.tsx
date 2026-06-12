import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F5C200] text-[#1A1A1A]">
      {/* Main footer — yellow background, matching real site */}
      <div className="max-w-[1280px] mx-auto px-5 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10 pb-10 border-b border-black/10 mb-6">

          {/* Brand col */}
          <div>
            {/* Logo */}
            <div className="bg-[#F5C200] border-2 border-black/10 inline-block px-3 py-1.5 rounded-md mb-4">
              <span className="font-display text-[28px] font-black leading-none tracking-tight">
                <span className="text-[#C8102E]">K</span>
                <span className="text-[#1A31A8]">servico</span>
              </span>
              <div className="bg-[#C8102E] text-white text-[8px] font-black tracking-[0.12em] uppercase text-center -mx-1 rounded-sm py-px mt-[-2px]">
                Online Store
              </div>
            </div>
            <p className="text-[13px] leading-[1.7] mb-4 text-[#333] max-w-[280px]">
              Philippines&apos; largest retail store network in Luzon. Authorized dealer of
              top appliance, motorcycle, and electronics brands. Founded 1971.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+6327730375" className="text-[13px] text-[#1A31A8] font-semibold hover:underline flex items-center gap-1.5">
                📞 (02) 7730-0375
              </a>
              <a href="tel:+639498890701" className="text-[13px] text-[#1A31A8] font-semibold hover:underline flex items-center gap-1.5">
                📱 +63 949-889-0701
              </a>
              <a href="mailto:sales@kservico.com.ph" className="text-[13px] text-[#1A31A8] font-semibold hover:underline flex items-center gap-1.5">
                ✉️ sales@kservico.com.ph
              </a>
              <span className="text-[13px] text-[#333] flex items-center gap-1.5">
                📍 210 P. Tuazon Blvd, Cubao, QC 1109
              </span>
            </div>
            {/* Social buttons */}
            <div className="flex gap-2 mt-4">
              {["FB", "YT", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-[34px] h-[34px] rounded-lg border-2 border-[#1A31A8] flex items-center justify-center text-[11px] font-black text-[#1A31A8] hover:bg-[#1A31A8] hover:text-white transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate col */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#1A31A8] mb-3.5">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {[["Home", "/"], ["Shop", "/shop"], ["Motorcycles", "/motorcycles"], ["Store Locator", "/stores"], ["Careers", "/"], ["Our Partners", "/"], ["Privacy Policy", "/"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-[#333] hover:text-[#1A31A8] transition-colors no-underline font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services col */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#1A31A8] mb-3.5">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {[["Apply for Installment", "/apply"], ["Find a Branch", "/stores"], ["Service & Maintenance", "/"], ["Cleaning Service", "/"], ["Repair Service", "/"], ["Product Inquiries", "/"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-[#333] hover:text-[#1A31A8] transition-colors no-underline font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter col */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#1A31A8] mb-3.5">
              Get Update on Our Latest Products
            </p>
            <div className="flex items-center bg-white rounded-xl border-2 border-white overflow-hidden mb-4 shadow-sm">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-[13px] text-[#1A1A1A] placeholder:text-[#999]"
              />
              <button className="bg-[#1A31A8] text-white px-4 py-3 hover:bg-[#122390] transition-colors">
                →
              </button>
            </div>
            <div className="bg-white/60 rounded-xl p-4 border border-black/10">
              <p className="text-[11px] font-black uppercase tracking-wider text-[#1A31A8] mb-2">
                For VisMin Shoppers
              </p>
              <p className="text-[12px] text-[#555] leading-snug">
                Visit our sister company <strong className="text-[#1A31A8]">EMCOR Inc.</strong> for branches in Visayas & Mindanao.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#555]">
          <span>© 2026 KServico Trade, Inc. All rights reserved. Top 1,000 Philippine Corporation.</span>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-[#555] hover:text-[#1A31A8] transition-colors no-underline">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
