import Link from "next/link";

const BRANDS = [
  "LG", "Samsung", "Haier", "Panasonic", "Fujidenzo", "TCL",
  "Honda", "Yamaha", "Kawasaki", "Suzuki", "Kymco",
  "Apple", "OPPO", "Realme", "Vivo", "Honor",
  "Acer", "Dell", "HP", "Lenovo",
  "La Germania", "Fabriano", "Bajaj", "Hatasu",
];

export default function BrandsBar() {
  return (
    <section className="py-9 border-t-2 border-b-2 border-[#EFEFEF] bg-white">
      <div className="max-w-[1280px] mx-auto px-5">
        <p className="text-[11px] font-black tracking-[0.12em] uppercase text-[#1A31A8] text-center mb-5">
          Authorized Dealer of
        </p>
        <div className="flex items-center justify-center flex-wrap gap-1">
          {BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/shop?brand=${encodeURIComponent(brand)}`}
              className="px-5 py-2 text-[13px] font-black text-[#999] uppercase tracking-wider rounded-full border-[1.5px] border-transparent hover:text-[#1A31A8] hover:border-[#1A31A8] hover:bg-[#e8ecfa] transition-all cursor-pointer no-underline"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
