import { NextResponse } from "next/server";
import { MercadoLivreAdapter, ShopeeAdapter, UnifiedProductPayload } from "@/lib/marketplaces/marketplaceHub";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product, targetChannels } = body as {
      product: UnifiedProductPayload;
      targetChannels: ("MERCADO_LIVRE" | "SHOPEE")[];
    };

    if (!product || !product.sku || !product.title) {
      return NextResponse.json({ error: "Dados do produto inválidos ou SKU ausente." }, { status: 400 });
    }

    const results: Record<string, any> = {};

    // 1. Simulação / Preparo Mercado Livre
    if (targetChannels?.includes("MERCADO_LIVRE")) {
      const mlToken = process.env.MERCADO_LIVRE_ACCESS_TOKEN || "TEST_ACCESS_TOKEN_MLB";
      const mlAdapter = new MercadoLivreAdapter(mlToken);
      const mlData = await mlAdapter.publishItem(product);
      results.mercadoLivre = {
        status: "READY_OR_SYNCED",
        endpoint: mlData.endpoint,
        payloadMapped: mlData.body,
        message: "Payload formatado com sucesso segundo a especificação POST /items da API Mercado Livre.",
      };
    }

    // 2. Simulação / Preparo Shopee v2
    if (targetChannels?.includes("SHOPEE")) {
      const partnerId = Number(process.env.SHOPEE_PARTNER_ID || 1234567);
      const partnerKey = process.env.SHOPEE_PARTNER_KEY || "shopee_dummy_secret_key";
      const shopId = Number(process.env.SHOPEE_SHOP_ID || 987654321);
      const accessToken = process.env.SHOPEE_ACCESS_TOKEN || "shopee_dummy_access_token";

      const shopeeAdapter = new ShopeeAdapter(partnerId, partnerKey, shopId, accessToken);
      const shopeeData = await shopeeAdapter.publishItem(product);

      results.shopee = {
        status: "READY_OR_SYNCED",
        urlWithHmacSignature: shopeeData.url,
        payloadMapped: shopeeData.body,
        message: "Assinatura HMAC-SHA256 gerada e payload formatado para v2.product.add_item da Shopee.",
      };
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      sku: product.sku,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro ao processar integração de marketplaces" }, { status: 500 });
  }
}

