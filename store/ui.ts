import { create } from "zustand";

interface UIStore {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),

  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),

  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));
