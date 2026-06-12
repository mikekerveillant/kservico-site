import { CheckCircle } from "lucide-react";

export default function PaymentBar() {
  return (
    <div className="bg-[#fffbe6] border-b-2 border-[#F5C200]/40 py-2.5">
      <div className="max-w-[1280px] mx-auto px-5 flex items-center gap-4 flex-wrap">
        <span className="text-[11px] font-bold text-[#1A31A8] uppercase tracking-wider">
          Payment Methods:
        </span>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="bg-white border border-[#F5C200] rounded px-3 py-1 text-[11.5px] font-bold text-[#0073CF]">
            GCash
          </span>
          <span className="bg-white border border-[#F5C200] rounded px-3 py-1 text-[11.5px] font-bold text-[#00B050]">
            Maya
          </span>
          <span className="bg-white border border-[#F5C200] rounded px-3 py-1 text-[11.5px] font-bold text-[#555]">
            Credit Card
          </span>
          <span className="bg-white border border-[#F5C200] rounded px-3 py-1 text-[11.5px] font-bold text-[#555]">
            Debit Card
          </span>
          <span className="bg-[#1A31A8] border border-[#1A31A8] rounded px-3 py-1 text-[11.5px] font-bold text-white">
            0% Installment
          </span>
          <span className="bg-white border border-[#F5C200] rounded px-3 py-1 text-[11.5px] font-bold text-[#555]">
            Cash
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[12px] font-bold text-[#1A31A8]">
          <CheckCircle size={14} />
          BDO · BPI · Metrobank accepted
        </div>
      </div>
    </div>
  );
}
