import { create } from "zustand";
import { Product, OrderBumpItem, CartItem, WordPressPluginEquivalent } from "../types";
import { PLAYTECH_PRODUCTS, ORDER_BUMP_PRODUCTS, WORDPRESS_PLUGINS_MAP } from "../data/mock-data";
import importedProducts from "../data/imported-products.json";

// Mesclar produtos do WooCommerce com os produtos nativos da loja
const ALL_CATALOG_PRODUCTS: Product[] = [
  ...(importedProducts as unknown as Product[]),
  ...PLAYTECH_PRODUCTS.filter(p => !importedProducts.some((ip: any) => ip.sku === p.sku))
];

export interface HeroSlide {
  id: string;
  title: string;
  desc: string;
  cta: string;
  category: string;
  image: string;
  badge?: string;
  btnClass?: string;
}

export interface SecondaryBanners {
  headphones: {
    title: string;
    desc: string;
    cta: string;
    category: string;
    image: string;
  };
  gamestick: {
    title: string;
    desc: string;
    cta: string;
    category: string;
    image: string;
  };
  smartwatch: {
    title: string;
    desc: string;
    cta: string;
    category: string;
    image: string;
  };
}

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "cameras-projetores",
    title: "SEGURANÇA E QUALIDADE EM UM CLIQUE",
    desc: "Câmeras IP inteligentes e acessórios para monitoramento 24h com imagem cristalina.",
    cta: "Projetores & Câmeras",
    category: "Projetores & Câmeras",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400&auto=format&fit=crop&q=80",
    badge: "Linha Smart 2026",
    btnClass: "bg-blue-600 hover:bg-blue-500 text-white",
  },
  {
    id: "cinema-hy320",
    title: "CINEMA 4K DE 150\" NA SUA SALA",
    desc: "Mini Projetor Smart HY320 com Android TV 11, Wi-Fi 6 Ultra e rotação 180°.",
    cta: "Conhecer Projetor HY320",
    category: "Projetores & Câmeras",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1400&auto=format&fit=crop&q=80",
    badge: "Campeão de Vendas",
    btnClass: "bg-blue-600 hover:bg-blue-500 text-white",
  },
  {
    id: "gaming-retro",
    title: "REVIVA OS CLÁSSICOS EM 4K",
    desc: "Mais de 10.000 jogos nostálgicos com 2 controles wireless de resposta imediata.",
    cta: "Explorar Gaming",
    category: "Gaming & Retrô",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=80",
    badge: "Frete Grátis",
    btnClass: "bg-indigo-600 hover:bg-indigo-500 text-white",
  },
];

export const DEFAULT_SECONDARY_BANNERS: SecondaryBanners = {
  headphones: {
    title: "FONES DE OUVIDO",
    desc: "Qualidade de estúdio, graves profundos e isolamento acústico ativo.",
    cta: "Comprar Agora",
    category: "Áudio & Som",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
  },
  gamestick: {
    title: "GAME STICK",
    desc: "Reviva os jogos da infância com conexão HDMI plug-and-play.",
    cta: "Ver Opções",
    category: "Gaming & Retrô",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80",
  },
  smartwatch: {
    title: "SMARTWATCHES",
    desc: "Não pode faltar no seu pulso: chamadas, notificações e saúde 24h.",
    cta: "Ver Opções",
    category: "Smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  },
};

interface StoreState {
  theme: "dark" | "light";
  products: Product[];
  orderBumps: OrderBumpItem[];
  cart: CartItem[];
  isCartOpen: boolean;
  blackFridayMode: boolean;
  activeView: "STORE" | "LP" | "ADMIN" | "PRODUCT_DETAIL" | "DEPARTMENT" | "CATALOG";
  selectedProductForDetail: Product | null;
  isProductLoading: boolean;
  activeAdminTab: "COMMAND_CENTER" | "CATALOG" | "WP_PLUGINS" | "PRICING_MATRIX" | "NFE_EXPEDITION" | "BLACK_FRIDAY" | "FLOW_ENGINE" | "AUTONOMOUS_AGENTS" | "HERO_BANNERS";
  searchQuery: string;
  selectedCategory: string;
  wpPlugins: WordPressPluginEquivalent[];
  freeShippingThreshold: number;
  freeGiftThreshold: number;
  comparedProducts: Product[];
  isCompareModalOpen: boolean;
  cartToast: { productTitle: string; productPrice: number; imageUrl: string } | null;
  demoModalProduct: Product | null;
  heroSlides: HeroSlide[];
  secondaryBanners: SecondaryBanners;
  
  // Actions
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  toggleCart: (open?: boolean) => void;
  addToCart: (item: Product | OrderBumpItem, isBump?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleBlackFridayMode: () => void;
  setActiveView: (view: "STORE" | "LP" | "ADMIN" | "PRODUCT_DETAIL" | "DEPARTMENT" | "CATALOG") => void;
  setSelectedProductForDetail: (product: Product | null) => void;
  setIsProductLoading: (loading: boolean) => void;
  setActiveAdminTab: (tab: StoreState["activeAdminTab"]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  addWordPressPlugin: (plugin: WordPressPluginEquivalent) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  setIsCompareModalOpen: (open: boolean) => void;
  setCartToast: (toast: { productTitle: string; productPrice: number; imageUrl: string } | null) => void;
  setDemoModalProduct: (product: Product | null) => void;
  setHeroSlides: (slides: HeroSlide[]) => void;
  updateHeroSlide: (index: number, updated: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  removeHeroSlide: (index: number) => void;
  setSecondaryBanners: (banners: SecondaryBanners) => void;
  updateSecondaryBanner: (key: keyof SecondaryBanners, updated: any) => void;
  resetHeroBannersToDefault: () => void;
}

const getInitialHeroSlides = (): HeroSlide[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("playtech_hero_slides");
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return DEFAULT_HERO_SLIDES;
};

const getInitialSecondaryBanners = (): SecondaryBanners => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("playtech_secondary_banners");
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return DEFAULT_SECONDARY_BANNERS;
};

const getInitialTheme = (): "dark" | "light" => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/playtech_theme=(dark|light)/);
    if (match) return match[1] as "dark" | "light";
    if (document.documentElement.classList.contains("dark")) return "dark";
    return "light";
  }
  return "light";
};

export const useStore = create<StoreState>((set, get) => ({
  theme: "light",
  products: ALL_CATALOG_PRODUCTS,
  orderBumps: ORDER_BUMP_PRODUCTS,
  cart: [
    {
      id: "prod-2",
      product: PLAYTECH_PRODUCTS[1], // Game Stick X3 Pro
      quantity: 1,
      selectedPrice: 249.99,
    },
  ],
  isCartOpen: false,
  blackFridayMode: true,
  activeView: "STORE",
  selectedProductForDetail: null,
  isProductLoading: false,
  activeAdminTab: "COMMAND_CENTER",
  searchQuery: "",
  selectedCategory: "TODOS",
  wpPlugins: WORDPRESS_PLUGINS_MAP,
  freeShippingThreshold: 199.00,
  freeGiftThreshold: 350.00,
  comparedProducts: [],
  isCompareModalOpen: false,
  cartToast: null,
  demoModalProduct: null,
  heroSlides: getInitialHeroSlides(),
  secondaryBanners: getInitialSecondaryBanners(),

  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.cookie = `playtech_theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
    }
    set({ theme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.cookie = `playtech_theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(next);
    }
    set({ theme: next });
  },

  toggleCart: (open) => set((state) => ({ isCartOpen: open !== undefined ? open : !state.isCartOpen })),

  addToCart: (item, isBump = false) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      const price = state.blackFridayMode ? item.bfSalePrice : item.baseSalePrice;
      const toastData = {
        productTitle: (item as any).storefrontTitle || (item as any).title || "Produto PlayTech",
        productPrice: price,
        imageUrl: (item as any).imageUrl || "",
      };

      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
          cartToast: toastData,
        };
      }

      return {
        cart: [...state.cart, { id: item.id, product: item, quantity: 1, selectedPrice: price }],
        cartToast: toastData,
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((c) => c.id !== id),
    })),

  updateQuantity: (id, qty) =>
    set((state) => ({
      cart:
        qty <= 0
          ? state.cart.filter((c) => c.id !== id)
          : state.cart.map((c) => (c.id === id ? { ...c, quantity: qty } : c)),
    })),

  toggleBlackFridayMode: () =>
    set((state) => {
      const newMode = !state.blackFridayMode;
      const updatedCart = state.cart.map((item) => ({
        ...item,
        selectedPrice: newMode ? item.product.bfSalePrice : item.product.baseSalePrice,
      }));
      return { blackFridayMode: newMode, cart: updatedCart };
    }),

  setActiveView: (view) => set({ activeView: view }),
  setIsProductLoading: (loading) => set({ isProductLoading: loading }),
  setSelectedProductForDetail: (product) => {
    if (product) {
      // Ativa micro-loading rápido e posiciona instantaneamente no topo da página
      set({ isProductLoading: true, selectedProductForDetail: product, activeView: "PRODUCT_DETAIL" });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      setTimeout(() => {
        set({ isProductLoading: false });
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }, 280);
    } else {
      set({ selectedProductForDetail: null, isProductLoading: false, activeView: "STORE" });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  },
  setActiveAdminTab: (tab) => set({ activeAdminTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  addWordPressPlugin: (plugin) =>
    set((state) => ({
      wpPlugins: [plugin, ...state.wpPlugins],
    })),

  updateProduct: (id, updated) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    })),

  addToCompare: (product) =>
    set((state) => {
      if (state.comparedProducts.some((p) => p.id === product.id)) return state;
      const nextList =
        state.comparedProducts.length >= 3
          ? [...state.comparedProducts.slice(1), product]
          : [...state.comparedProducts, product];
      return { comparedProducts: nextList };
    }),

  removeFromCompare: (productId) =>
    set((state) => ({
      comparedProducts: state.comparedProducts.filter((p) => p.id !== productId),
    })),

  clearCompare: () => set({ comparedProducts: [] }),

  setIsCompareModalOpen: (open) => set({ isCompareModalOpen: open }),

  setCartToast: (toast) => set({ cartToast: toast }),

  setDemoModalProduct: (product) => set({ demoModalProduct: product }),

  setHeroSlides: (slides) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("playtech_hero_slides", JSON.stringify(slides));
      } catch {}
    }
    set({ heroSlides: slides });
  },

  updateHeroSlide: (index, updated) => {
    const slides = [...get().heroSlides];
    if (slides[index]) {
      slides[index] = { ...slides[index], ...updated };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("playtech_hero_slides", JSON.stringify(slides));
        } catch {}
      }
      set({ heroSlides: slides });
    }
  },

  addHeroSlide: (slide) => {
    const slides = [...get().heroSlides, slide];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("playtech_hero_slides", JSON.stringify(slides));
      } catch {}
    }
    set({ heroSlides: slides });
  },

  removeHeroSlide: (index) => {
    const slides = get().heroSlides.filter((_, i) => i !== index);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("playtech_hero_slides", JSON.stringify(slides));
      } catch {}
    }
    set({ heroSlides: slides });
  },

  setSecondaryBanners: (banners) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("playtech_secondary_banners", JSON.stringify(banners));
      } catch {}
    }
    set({ secondaryBanners: banners });
  },

  updateSecondaryBanner: (key, updated) => {
    const current = get().secondaryBanners;
    const next = {
      ...current,
      [key]: { ...current[key], ...updated },
    };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("playtech_secondary_banners", JSON.stringify(next));
      } catch {}
    }
    set({ secondaryBanners: next });
  },

  resetHeroBannersToDefault: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("playtech_hero_slides");
        localStorage.removeItem("playtech_secondary_banners");
      } catch {}
    }
    set({
      heroSlides: DEFAULT_HERO_SLIDES,
      secondaryBanners: DEFAULT_SECONDARY_BANNERS,
    });
  },
}));
