import crypto from "crypto";

export interface UnifiedProductPayload {
  sku: string;
  title: string;
  descriptionText: string;
  price: number;
  stock: number;
  weightKg: number;
  dimensionsCm?: { length: number; width: number; height: number };
  images: string[];
  categoryName: string;
  brand?: string;
  condition?: "new" | "used";
}

/**
 * =========================================================================
 * 1. ADAPTADOR MERCADO LIVRE API (Open Platform /items)
 * =========================================================================
 */
export class MercadoLivreAdapter {
  private accessToken: string;
  private baseUrl: string;

  constructor(accessToken: string, baseUrl = "https://api.mercadolibre.com") {
    this.accessToken = accessToken;
    this.baseUrl = baseUrl;
  }

  /**
   * Mapeia o produto da base única para o formato da API Mercado Livre
   */
  public toMLPayload(product: UnifiedProductPayload, categoryId = "MLB1055") {
    return {
      title: product.title.slice(0, 60), // Limite padrão de 60 caracteres no ML
      category_id: categoryId,
      price: Number(product.price.toFixed(2)),
      currency_id: "BRL",
      available_quantity: product.stock,
      buying_mode: "buy_it_now",
      listing_type_id: "gold_special", // Clássico / Premium
      condition: product.condition || "new",
      description: {
        plain_text: product.descriptionText,
      },
      pictures: product.images.map((url) => ({ source: url })),
      attributes: [
        { id: "BRAND", value_name: product.brand || "PlayTech Brasil" },
        { id: "ITEM_CONDITION", value_name: "Novo" },
        { id: "SELLER_SKU", value_name: product.sku },
      ],
      shipping: {
        mode: "me2",
        local_pick_up: false,
        free_shipping: product.price >= 79, // Frete grátis padrão ML acima de R$ 79
      },
    };
  }

  /**
   * Publica ou atualiza o item no Mercado Livre
   */
  public async publishItem(product: UnifiedProductPayload, categoryId?: string) {
    const payload = this.toMLPayload(product, categoryId);

    // Endpoint: POST /items
    return {
      marketplace: "MERCADO_LIVRE",
      endpoint: `${this.baseUrl}/items`,
      headers: {
        Authorization: `Bearer ${this.accessToken ? "***" : "TOKEN_REQUERIDO"}`,
        "Content-Type": "application/json",
      },
      body: payload,
    };
  }
}

/**
 * =========================================================================
 * 2. ADAPTADOR SHOPEE OPEN PLATFORM V2 (/api/v2/product/add_item)
 * =========================================================================
 */
export class ShopeeAdapter {
  private partnerId: number;
  private partnerKey: string;
  private shopId: number;
  private accessToken: string;
  private baseUrl: string;

  constructor(
    partnerId: number,
    partnerKey: string,
    shopId: number,
    accessToken: string,
    baseUrl = "https://partner.shopeemobile.com"
  ) {
    this.partnerId = partnerId;
    this.partnerKey = partnerKey;
    this.shopId = shopId;
    this.accessToken = accessToken;
    this.baseUrl = baseUrl;
  }

  /**
   * Assinatura Criptográfica HMAC-SHA256 exigida pela Shopee v2
   * Fórmula: partner_id + path + timestamp + access_token + shop_id
   */
  public generateSignature(path: string, timestamp: number): string {
    const baseString = `${this.partnerId}${path}${timestamp}${this.accessToken}${this.shopId}`;
    return crypto
      .createHmac("sha256", this.partnerKey)
      .update(baseString)
      .digest("hex");
  }

  /**
   * Mapeia o produto da base única para o formato do endpoint v2.product.add_item
   */
  public toShopeePayload(product: UnifiedProductPayload, shopeeCategoryId = 100001) {
    return {
      original_price: Number(product.price.toFixed(2)),
      description: product.descriptionText,
      item_name: product.title.slice(0, 120), // Shopee permite até 120 chars
      item_sku: product.sku,
      category_id: shopeeCategoryId,
      weight: product.weightKg || 0.5,
      dimension: {
        package_length: product.dimensionsCm?.length || 20,
        package_width: product.dimensionsCm?.width || 15,
        package_height: product.dimensionsCm?.height || 10,
      },
      image: {
        image_url_list: product.images.slice(0, 9), // Até 9 imagens
      },
      seller_stock: [
        {
          stock: product.stock,
        },
      ],
      logistic_info: [
        {
          logistic_id: 8001, // Padrão Correios / Shopee Xpress Brasil
          enabled: true,
        },
      ],
      condition: "NEW",
    };
  }

  /**
   * Monta a requisição completa assinada
   */
  public async publishItem(product: UnifiedProductPayload, shopeeCategoryId?: number) {
    const path = "/api/v2/product/add_item";
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = this.generateSignature(path, timestamp);

    const url = `${this.baseUrl}${path}?partner_id=${this.partnerId}&shop_id=${this.shopId}&timestamp=${timestamp}&access_token=${this.accessToken}&sign=${sign}`;
    const payload = this.toShopeePayload(product, shopeeCategoryId);

    return {
      marketplace: "SHOPEE",
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    };
  }
}

