import type { Product, ProductCategory } from "@/types";
import productsData from "./data/products.json";

export const MOCK_PRODUCTS: Product[] = productsData as unknown as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

const MERGED_CATEGORIES: Record<string, string[]> = {
  aircon: ["aircon-window", "aircon-split"],
  mobile: ["smartphone"],
  gadgets: ["laptop", "gadget", "audio"],
  "home-appliances": ["tv", "fridge", "washer"],
  "small-appliances": ["gas-range", "small-appliance"],
  vehicles: ["motorcycle", "ebike"],
};

export function getProductsByCategory(category: string): Product[] {
  const sub = MERGED_CATEGORIES[category];
  if (sub) return MOCK_PRODUCTS.filter((p) => sub.includes(p.category) && p.is_active);
  return MOCK_PRODUCTS.filter((p) => p.category === category && p.is_active);
}

export function getFeaturedProducts(limit = 10): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.is_featured && p.is_active).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && p.is_active
  ).slice(0, limit);
}

export const CATEGORY_LABELS: Record<string, string> = {
  aircon: "Air Conditioners",
  tv: "Televisions",
  washer: "Washers & Dryers",
  fridge: "Refrigerators & Freezers",
  "gas-range": "Gas Ranges",
  motorcycle: "Motorcycles",
  ebike: "E-Bikes",
  "three-wheeler": "Three-Wheelers",
  smartphone: "Smartphones",
  laptop: "Laptops",
  furniture: "Furniture",
  audio: "Audio Systems",
  "small-appliance": "Small Appliances",
  gadget: "Gadgets & Printers",
  // merged nav categories
  mobile: "Mobile Phones",
  gadgets: "Gadgets",
  "home-appliances": "Home Appliances",
  "small-appliances": "Small Appliances",
  vehicles: "Vehicles",
  // aircon sub-types
  "aircon-window": "Window Type Air Conditioners",
  "aircon-split": "Split Type Air Conditioners",
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  tv: "📺", aircon: "❄️", washer: "🫧", fridge: "🧊",
  "gas-range": "🔥", motorcycle: "🏍️", ebike: "⚡",
  "three-wheeler": "🛺", smartphone: "📱", laptop: "💻", furniture: "🛋️",
  audio: "🔊", "small-appliance": "🍳", gadget: "🖨️",
  mobile: "📱", gadgets: "💻", "home-appliances": "🏠",
  "small-appliances": "🔌", vehicles: "🏍️",
  "aircon-window": "🪟", "aircon-split": "❄️",
};
