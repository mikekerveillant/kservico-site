"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Menu, X, MapPin } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems)();
  const { toggleCart, openSearch, mobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <nav className="bg-white border-b-2 border-[#EFEFEF] sticky top-0 z-[200] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Main nav row */}
      <div className="max-w-[1280px] mx-auto px-5 py-3 flex items-center gap-4">
        {/* Logo — yellow badge with red K + blue servico, matching real site */}
        <Link href="/" className="flex-shrink-0 no-underline">
          <div className="bg-[#F5C200] px-3 py-1.5 rounded-md">
            <span className="font-display text-[26px] font-black leading-none tracking-tight">
              <span className="text-[#C8102E]">K</span>
              <span className="text-[#1A31A8]">servico</span>
            </span>
            <div className="bg-[#C8102E] text-white text-[8px] font-black tracking-[0.12em] uppercase text-center mt-[-2px] -mx-1 rounded-sm py-px">
              Online Store
            </div>
          </div>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-[520px] flex items-center bg-[#F8F8F8] border-2 border-[#EFEFEF] rounded-md overflow-hidden focus-within:border-[#1A31A8] transition-colors">
          <input
            type="text"
            placeholder="Search appliances, motorcycles, smartphones..."
            className="flex-1 bg-transparent border-none outline-none font-body text-[13.5px] px-3.5 py-2.5 text-[#1A1A1A] placeholder:text-[#999]"
          />
          <button
            onClick={openSearch}
            className="bg-[#1A31A8] text-white px-4 h-full min-h-[42px] flex items-center gap-1.5 font-body font-semibold text-[13px] hover:bg-[#122390] transition-colors"
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="hidden md:flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer p-1.5 px-2.5 rounded-md hover:bg-[#F8F8F8] transition-colors">
            <Heart size={20} className="text-[#1A31A8]" />
            <span className="text-[10px] text-[#999] font-semibold whitespace-nowrap">Wishlist</span>
          </button>
          <button className="hidden md:flex flex-col items-center gap-0.5 bg-transparent border-none cursor-pointer p-1.5 px-2.5 rounded-md hover:bg-[#F8F8F8] transition-colors">
            <User size={20} className="text-[#1A31A8]" />
            <span className="text-[10px] text-[#999] font-semibold whitespace-nowrap">Account</span>
          </button>

          {/* Store Locator — matches the real site's prominent blue button */}
          <Link
            href="/stores"
            className="hidden md:flex items-center gap-2 bg-[#1A31A8] text-white border-none rounded-md px-4 py-2.5 font-display font-black text-[13px] hover:bg-[#122390] transition-colors no-underline whitespace-nowrap"
          >
            <MapPin size={14} />
            Store Locator
          </Link>

          <button
            onClick={toggleCart}
            className="bg-[#C8102E] text-white border-none rounded-md px-4 py-2.5 font-display font-black text-[14px] cursor-pointer flex items-center gap-2 hover:bg-[#a00d24] transition-colors whitespace-nowrap"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="bg-[#F5C200] text-[#1A1A1A] text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={mobileMenuOpen ? closeMobileMenu : openMobileMenu}
            className="md:hidden bg-transparent border-none cursor-pointer p-2 rounded-md hover:bg-[#F8F8F8]"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category strip */}
      <div className="border-t border-[#EFEFEF] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 flex gap-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {NAV_CATS.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex items-center gap-1.5 px-3.5 py-[9px] whitespace-nowrap text-[13px] font-semibold text-[#555] no-underline border-b-[3px] border-transparent hover:text-[#1A31A8] hover:border-[#1A31A8] transition-all"
            >
              <span className="text-[15px]">{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#EFEFEF] px-5 py-3 flex flex-col gap-2">
          {NAV_CATS.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={closeMobileMenu}
              className="flex items-center gap-2 py-2 text-[14px] font-semibold text-[#555] no-underline hover:text-[#1A31A8] transition-colors"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const NAV_CATS = [
  { label: "Air Conditioners", icon: "❄️", href: "/shop/aircon" },
  { label: "TVs", icon: "📺", href: "/shop/tv" },
  { label: "Refrigerators", icon: "🧊", href: "/shop/fridge" },
  { label: "Washers", icon: "🫧", href: "/shop/washer" },
  { label: "Motorcycles", icon: "🏍️", href: "/motorcycles" },
  { label: "E-Bikes", icon: "⚡", href: "/shop/ebike" },
  { label: "Smartphones", icon: "📱", href: "/shop/smartphone" },
  { label: "Laptops", icon: "💻", href: "/shop/laptop" },
  { label: "Furniture", icon: "🛋️", href: "/shop/furniture" },
  { label: "Gas Ranges", icon: "🔥", href: "/shop/gas-range" },
];
