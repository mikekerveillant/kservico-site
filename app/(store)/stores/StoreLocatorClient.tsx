"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Phone, ChevronDown } from "lucide-react";
import { MOCK_BRANCHES, REGIONS } from "@/lib/branches";
import type { Branch } from "@/types";

export default function StoreLocatorClient() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [selected, setSelected] = useState<Branch | null>(null);

  const filtered = useMemo(() => {
    return MOCK_BRANCHES.filter((b) => {
      const matchesRegion = region === "All Regions" || b.region === region;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.province.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  const gmapsUrl = (b: Branch) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name} ${b.address} ${b.city}`)}`;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-[#C8102E] py-10">
        <div className="max-w-[1280px] mx-auto px-5">
          <h1 className="font-display text-[36px] font-black text-white tracking-tight mb-1">
            Find a Branch
          </h1>
          <p className="text-white/75 text-[14px]">
            180+ KServico branches across Luzon
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* Left — search + list */}
          <div>
            {/* Filters */}
            <div className="flex flex-col gap-2.5 mb-5">
              <div className="flex items-center gap-2 bg-white border-2 border-[#EFEFEF] rounded-xl px-4 py-3 focus-within:border-[#C8102E] transition-colors">
                <Search size={16} className="text-[#999] flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by city or branch name..."
                  className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-[#1A1A1A] placeholder:text-[#999]"
                />
              </div>
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-white border-2 border-[#EFEFEF] rounded-xl px-4 py-3 text-[13.5px] font-semibold text-[#555] outline-none appearance-none hover:border-[#C8102E] transition-colors cursor-pointer pr-10"
                >
                  <option>All Regions</option>
                  {REGIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
              </div>
            </div>

            {/* Results count */}
            <p className="text-[12px] text-[#999] mb-3 font-semibold">
              {filtered.length} branch{filtered.length !== 1 ? "es" : ""} found
            </p>

            {/* Branch list */}
            <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
              {filtered.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className={`text-left bg-white border-2 rounded-xl p-4 transition-all hover:border-[#C8102E] ${
                    selected?.id === b.id ? "border-[#C8102E] shadow-[0_0_0_3px_rgba(200,16,46,0.1)]" : "border-[#EFEFEF]"
                  }`}
                >
                  <p className="font-bold text-[13px] text-[#1A1A1A] mb-0.5">{b.name}</p>
                  <div className="flex items-start gap-1.5 text-[12px] text-[#555] mb-1">
                    <MapPin size={12} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
                    <span>{b.address}, {b.city}, {b.province}</span>
                  </div>
                  {b.phone && (
                    <div className="flex items-center gap-1.5 text-[12px] text-[#555]">
                      <Phone size={12} className="text-[#C8102E] flex-shrink-0" />
                      <span>{b.phone}</span>
                    </div>
                  )}
                  <span className="inline-block mt-2 bg-[#F8F8F8] text-[#555] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {b.region}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-10 text-[#999]">
                  <MapPin size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-[14px] font-semibold">No branches found</p>
                  <p className="text-[12px] mt-1">Try a different search</p>
                </div>
              )}
            </div>
          </div>

          {/* Right — map + selected branch detail */}
          <div className="flex flex-col gap-4">
            {/* Map placeholder — Google Maps would go here */}
            <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden h-[420px] relative flex items-center justify-center">
              <div className="text-center text-white/40">
                <MapPin size={48} className="mx-auto mb-3 text-[#C8102E] opacity-60" />
                <p className="text-[15px] font-bold text-white/60">Interactive Map</p>
                <p className="text-[12px] mt-1">Google Maps API key required</p>
                <p className="text-[11px] mt-0.5 text-white/30">Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local</p>
              </div>
              {/* Dots for branches */}
              <div className="absolute inset-0 pointer-events-none">
                {filtered.slice(0, 20).map((b, i) => (
                  <div
                    key={b.id}
                    className="absolute w-3 h-3 bg-[#C8102E] rounded-full border-2 border-white shadow"
                    style={{
                      left: `${10 + (i % 8) * 11}%`,
                      top: `${15 + Math.floor(i / 8) * 35}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Selected branch detail */}
            {selected ? (
              <div className="bg-white border-2 border-[#EFEFEF] rounded-2xl p-6">
                <h2 className="font-display text-[20px] font-black text-[#1A1A1A] mb-3">{selected.name}</h2>
                <div className="flex flex-col gap-2.5 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#555]">
                      {selected.address}, {selected.city}, {selected.province}
                    </span>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone size={16} className="text-[#C8102E] flex-shrink-0" />
                      <a href={`tel:${selected.phone}`} className="text-[13px] text-[#C8102E] font-semibold no-underline hover:underline">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex gap-2.5">
                  <a
                    href={gmapsUrl(selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#C8102E] text-white text-center py-3 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#a00d24] transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex-1 bg-[#1A1A1A] text-white text-center py-3 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#C8102E] transition-colors"
                  >
                    Call Branch
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-[#EFEFEF] rounded-2xl p-6 text-center text-[#999]">
                <p className="text-[14px] font-semibold">Select a branch to see details</p>
                <p className="text-[12px] mt-1">Click any branch from the list</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
