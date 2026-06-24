"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, MapPin, Phone, ChevronDown, ExternalLink } from "lucide-react";
import { MOCK_BRANCHES, REGIONS } from "@/lib/branches";
import type { Branch } from "@/types";

const LUZON_CENTER: [number, number] = [15.5, 120.8];

export default function StoreLocatorClient() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [selected, setSelected] = useState<Branch | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);

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

  // Initialise Leaflet map once on mount (client-only)
  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;

    import("leaflet").then((L) => {
      const makeIcon = (active: boolean) =>
        L.divIcon({
          className: "",
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38">
            <path d="M15 0C6.716 0 0 6.716 0 15c0 9.5 15 23 15 23S30 24.5 30 15C30 6.716 23.284 0 15 0z"
              fill="${active ? "#C8102E" : "#F5C200"}" stroke="${active ? "#a00d24" : "#d4a800"}" stroke-width="1"/>
            <text x="15" y="20" font-family="Arial Black,sans-serif" font-weight="900" font-size="13"
              fill="${active ? "#F5C200" : "#C8102E"}" text-anchor="middle" dominant-baseline="middle">K</text>
          </svg>`,
          iconSize: [30, 38],
          iconAnchor: [15, 38],
          popupAnchor: [0, -38],
        });

      const map = L.map(mapRef.current!).setView(LUZON_CENTER, 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      leafletRef.current = { map, L, markers: [] as ReturnType<typeof L.marker>[], makeIcon };
    });

    return () => {
      leafletRef.current?.map.remove();
      leafletRef.current = null;
    };
  }, []);

  // Re-draw markers when filtered list or selected branch changes
  useEffect(() => {
    const lf = leafletRef.current;
    if (!lf) return;
    const { map, L, markers, makeIcon } = lf;

    markers.forEach((m: ReturnType<typeof L.marker>) => m.remove());
    lf.markers = [];

    filtered.forEach((b) => {
      const isActive = selected?.id === b.id;
      const marker = L.marker([b.latitude, b.longitude], { icon: makeIcon(isActive) })
        .addTo(map)
        .bindPopup(`<strong>${b.name}</strong><br/>${b.address}, ${b.city}`);
      marker.on("click", () => setSelected(b));
      lf.markers.push(marker);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, selected, leafletRef.current]);

  // Pan/zoom to selected branch
  useEffect(() => {
    const lf = leafletRef.current;
    if (!lf || !selected) return;
    lf.map.setView([selected.latitude, selected.longitude], 14, { animate: true });
  }, [selected]);

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

            <p className="text-[12px] text-[#999] mb-3 font-semibold">
              {filtered.length} branch{filtered.length !== 1 ? "es" : ""} found
            </p>

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
            <div className="rounded-2xl overflow-hidden h-[420px] relative border border-[#EFEFEF]">
              <div ref={mapRef} className="w-full h-full" />
            </div>

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
                    className="flex-1 bg-[#C8102E] text-white text-center py-3 rounded-xl font-display font-black text-[14px] no-underline hover:bg-[#a00d24] transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} />
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
                <p className="text-[12px] mt-1">Click any branch from the list or a pin on the map</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
