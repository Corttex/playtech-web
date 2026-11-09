export interface Product {
  id: string;
  sku: string;
  ean?: string;
  invoiceTitle: string;
  storefrontTitle: string;
  marketplaceTitleML?: string;
  slug: string;
  shortHeadline?: string;
  descriptionHtml?: string;
  category: string;
  costPrice: number;
  baseSalePrice: number;
  compareAtPrice: number;
  pixDiscountPercent?: number;
  isBlackFridayDeal?: boolean;
  bfSalePrice: number;
  bfStockLimit?: number;
  bfSoldPercent?: number;
  stock: number;
  isHero?: boolean;
  badge?: string;
  specs?: Record<string, string>;
  weightKg: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  imageUrl?: string;
  galleryImages?: string[];
  reviewsCount?: number;
  rating?: number;
  colors?: { name: string; hex: string }[];
}

export interface OrderBumpItem {
  id: string;
  sku: string;
  storefrontTitle: string;
  baseSalePrice: number;
  bfSalePrice: number;
  pitchText?: string;
  imageUrl?: string;
}

export interface CartItem {
  id: string;
  product: Product | OrderBumpItem;
  quantity: number;
  selectedPrice: number;
}

export interface StoreSettings {
  blackFridayModeActive: boolean;
  bfCampaignTitle: string;
  bfCountdownEnd: string;
  freeShippingThreshold: number;
  maxInstallmentsNoInterest: number;
  blingSyncMode: "NATIVE_ONLY" | "HYBRID_SHADOW";
}

export interface WordPressPluginEquivalent {
  id: string;
  wpPluginName: string;
  wpSlug: string;
  category: "PAGAMENTO" | "FRETE" | "MARKETING" | "ERP_FISCAL" | "SEO_PERFORMANCE" | "ATENDIMENTO";
  playtechSolution: string;
  nativeStatus: "IMPLEMENTADO" | "READY_TO_CONNECT" | "CONFIGURAVEL";
  details: string;
}
