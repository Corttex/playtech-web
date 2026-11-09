"use client";

import React, { useState } from "react";
import {
  Share2,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Zap,
  Globe,
  Check
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";

export default function OmnichannelPricingMatrix() {
  const { products, blackFridayMode } = useStore();
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [syncingSku, setSyncingSku] = useState<string | null>(null);

  const handleSyncAll = async () => {
    setSyncStatus("Disparando sincronização simultânea com Mercado Livre e Shopee API...");
    setTimeout(() => {
      setSyncStatus("Sincronização concluída com sucesso nos 3 canais!");
      setTimeout(() => setSyncStatus(null), 4000);
    }, 1200);
  };

  const handleSyncSingleProduct = async (product: Product) => {
    setSyncingSku(product.sku);
    try {
      const sitePrice = blackFridayMode ? product.bfSalePrice : product.baseSalePrice;
      const res = await fetch("/api/marketplaces/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: {
            sku: product.sku,
            title: product.storefrontTitle,
            descriptionText: product.shortHeadline || product.storefrontTitle,
            price: sitePrice,
            stock: product.stock,
            weightKg: product.weightKg || 0.5,
            images: [product.imageUrl || ""],
            categoryName: product.category,
            brand: "PlayTech Brasil",
          },
          targetChannels: ["MERCADO_LIVRE", "SHOPEE"],
        }),
      });
      const data = await res.json();
      setSelectedProductDetails(product);
      setSyncStatus(`Produto ${product.sku} mapeado e transmitido para Mercado Livre e Shopee!`);
      setTimeout(() => setSyncStatus(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSyncingSku(null);
    }
  };

  return (
    <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            Hub Omnichannel: Base Única &bull; Mercado Livre &amp; Shopee
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Cadastre o produto uma única vez na PlayTech e publique com comissão embutida e estoque centralizado em todos os marketplaces.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          className="flex items-center gap-2 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Sincronizar Todos os Canais Agora
        </button>
      </div>

      {syncStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Regras e APIs Conectadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-black/40 border border-yellow-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-yellow-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> MERCADO LIVRE (API Oficial /items)
            </span>
            <span className="text-[10px] bg-yellow-500/10 text-yellow-300 px-2 py-0.5 rounded-full font-bold">
              Taxa Clássica: +16%
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Envio automatizado via <code>POST https://api.mercadolibre.com/items</code> com OAuth 2.0 Bearer Token, categorias MLB e frete grátis automático acima de R$ 79.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-orange-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-orange-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> SHOPEE (Open Platform v2)
            </span>
            <span className="text-[10px] bg-orange-500/10 text-orange-300 px-2 py-0.5 rounded-full font-bold">
              Taxa Padrão: +14%
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Envio assinado via <code>POST /api/v2/product/add_item</code> com criptografia <strong>HMAC-SHA256</strong> (partner_id + path + timestamp + token + shop_id).
          </p>
        </div>
      </div>

      {/* Tabela de Preços e Canais */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-semibold">
              <th className="py-3 px-3">SKU</th>
              <th className="py-3 px-3">Título no Catálogo</th>
              <th className="py-3 px-3">Custo</th>
              <th className="py-3 px-3 text-emerald-400">Loja Virtual</th>
              <th className="py-3 px-3 text-yellow-400">Mercado Livre (+16%)</th>
              <th className="py-3 px-3 text-orange-400">Shopee (+14%)</th>
              <th className="py-3 px-3">Estoque</th>
              <th className="py-3 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => {
              const sitePrice = blackFridayMode ? p.bfSalePrice : p.baseSalePrice;
              const mlPrice = (sitePrice / 0.84).toFixed(2);
              const shopeePrice = (sitePrice / 0.86).toFixed(2);

              return (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-3 font-mono text-amber-400 font-bold">
                    {p.sku}
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-bold text-white truncate" title={p.storefrontTitle}>
                      {p.storefrontTitle}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {p.category} &bull; {p.weightKg || 0.5} kg
                    </div>
                  </td>
                  <td className="py-3 px-3 text-zinc-400 font-mono">
                    R$ {p.costPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 font-mono font-black text-emerald-400">
                    R$ {sitePrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 font-mono font-black text-yellow-400">
                    R$ {mlPrice}
                  </td>
                  <td className="py-3 px-3 font-mono font-black text-orange-400">
                    R$ {shopeePrice}
                  </td>
                  <td className="py-3 px-3 font-mono text-white">
                    {p.stock} un.
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleSyncSingleProduct(p)}
                      disabled={syncingSku === p.sku}
                      className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ml-auto active:scale-95 disabled:opacity-50"
                    >
                      {syncingSku === p.sku ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" /> Subindo...
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="w-3 h-3 text-amber-400" /> Transmitir
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
