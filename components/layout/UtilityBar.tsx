import Link from "next/link";
import { Phone } from "lucide-react";

export default function UtilityBar() {
  return (
    <div className="bg-[#1A31A8] py-1.5 text-xs text-white/80">
      <div className="max-w-[1280px] mx-auto px-5 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <span className="bg-[#F5C200] text-[#1A1A1A] font-display font-black px-3.5 py-0.5 rounded-full text-[11px] tracking-wide">
            🎉 55th Anniversary Legit Sale — Up to 50% OFF!
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-px h-3 bg-white/25" />
          <Link href="tel:+6327730375" className="text-white/80 hover:text-white transition-colors flex items-center gap-1 text-[11.5px]">
            <Phone size={11} />
            (02) 7730-0375
          </Link>
          <Link href="/apply" className="text-white/80 hover:text-white transition-colors text-[11.5px]">
            Apply for Installment
          </Link>
          <Link href="/admin" className="text-white/80 hover:text-white transition-colors text-[11.5px]">
            Staff Login
          </Link>
        </div>
      </div>
    </div>
  );
}
