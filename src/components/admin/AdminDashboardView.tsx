"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Boxes,
  Share2,
  FileCheck2,
  Flame,
  Layers,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Truck,
  Plus
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";
import OmnichannelPricingMatrix from "./OmnichannelPricingMatrix";
import AiProductBeautifierModal from "./AiProductBeautifierModal";
import NfeCertificateManager from "./NfeCertificateManager";
import PluginsWordpressManager from "./PluginsWordpressManager";
import FlowEngineN8N from "./FlowEngineN8N";
import AutonomousAgentsCenter from "./AutonomousAgentsCenter";
import HeroBannersManager from "./HeroBannersManager";

export default function AdminDashboardView() {
  const {
    products,
    blackFridayMode,
    toggleBlackFridayMode,
    activeAdminTab,
    setActiveAdminTab
  } = useStore();

  const [selectedProductForAi, setSelectedProductForAi] = useState<Product | null>(null);

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header do Admin */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">
              PlayTech OS • Command Center
            </h1>
            <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              ERP NATIVO
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Plataforma proprietária de gestão: Catálogo com IA, Hub Marketplaces, Emissor Fiscal A1 e Motor Black Friday.
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Certificado A1: SEFAZ Conectada
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 font-bold">
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            ML &amp; Shopee Webhook: 0.38s
          </span>

          <button
            onClick={toggleBlackFridayMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition active:scale-95 ${
              blackFridayMode
                ? "bg-amber-500 text-black border-amber-300 shadow-md shadow-amber-500/30"
                : "bg-zinc-900 text-zinc-400 border-zinc-700"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Black Friday: {blackFridayMode ? "LIGADO" : "DESLIGADO"}
          </button>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveAdminTab("COMMAND_CENTER")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "COMMAND_CENTER"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          1. Painel Geral &amp; DRE
        </button>

        <button
          onClick={() => setActiveAdminTab("CATALOG")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "CATALOG"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Boxes className="w-4 h-4" />
          2. Catálogo &amp; Higienizador IA
        </button>

        <button
          onClick={() => setActiveAdminTab("PRICING_MATRIX")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "PRICING_MATRIX"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Share2 className="w-4 h-4" />
          3. Hub Mercado Livre &amp; Shopee
        </button>

        <button
          onClick={() => setActiveAdminTab("WP_PLUGINS")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "WP_PLUGINS"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          4. Plugins WP vs Solução Nativa
        </button>

        <button
          onClick={() => setActiveAdminTab("NFE_EXPEDITION")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "NFE_EXPEDITION"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          5. Emissor NFe A1 &amp; Expedição
        </button>

        <button
          onClick={() => setActiveAdminTab("FLOW_ENGINE")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "FLOW_ENGINE"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Share2 className="w-4 h-4 text-emerald-400" />
          7. Motor n8n (Fluxos)
        </button>

        <button
          onClick={() => setActiveAdminTab("AUTONOMOUS_AGENTS")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeAdminTab === "AUTONOMOUS_AGENTS"
              ? "bg-amber-500 text-black"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Bot className="w-4 h-4 text-purple-400" />
          8. Agentes Autônomos
        </button>

        <button
          onClick={() => setActiveAdminTab("HERO_BANNERS")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer ${
            activeAdminTab === "HERO_BANNERS"
              ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
              : "bg-zinc-900 text-zinc-400 hover:text-white border border-amber-500/30 text-amber-300"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          9. Banners &amp; Vitrine Home
        </button>
      </div>

      {/* ========================================================
          TAB 1: COMMAND CENTER & DRE
      ======================================================== */}
      {activeAdminTab === "COMMAND_CENTER" && (
        <div className="space-y-6">
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#12131A] border border-white/10 space-y-2">
              <span className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Vendas Hoje (Bruto)</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </span>
              <div className="text-2xl font-black text-white">R$ 14.850,00</div>
              <span className="text-[11px] text-emerald-400 font-bold block">
                +28% em relação a ontem (82% PIX)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#12131A] border border-white/10 space-y-2">
              <span className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Lucro Líquido Real</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </span>
              <div className="text-2xl font-black text-amber-400">R$ 6.320,00</div>
              <span className="text-[11px] text-zinc-400 block">
                Margem média líquida: 42.5%
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#12131A] border border-white/10 space-y-2">
              <span className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Tráfego Mensal (Visitas)</span>
                <Users className="w-4 h-4 text-sky-400" />
              </span>
              <div className="text-2xl font-black text-white">28.450</div>
              <span className="text-[11px] text-sky-400 font-bold block">
                Conversão: 3.4% (vs 1.8% no WordPress)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#12131A] border border-white/10 space-y-2">
              <span className="text-xs text-zinc-400 flex items-center justify-between">
                <span>Ticket Médio (Order Bump)</span>
                <ShoppingBag className="w-4 h-4 text-purple-400" />
              </span>
              <div className="text-2xl font-black text-white">R$ 274,50</div>
              <span className="text-[11px] text-purple-400 font-bold block">
                74% dos pedidos levaram Order Bump!
              </span>
            </div>
          </div>

          {/* Kanban Rápido de Expedição de Pedidos */}
          <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                Fila de Pedidos Pagos para Separação e Envio Imediato
              </h3>
              <span className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg">
                Atualização em Tempo Real
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">#1042 — Rodrigo M. (SP)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                    PAGO NO PIX
                  </span>
                </div>
                <p className="text-zinc-300 font-medium">1x Mini Projetor HY320 4K + Cabo USB Turbo</p>
                <div className="flex justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                  <span>Total: R$ 514,89</span>
                  <span className="text-emerald-400 font-bold">NFe Emitida &bull; Pronto</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">#1041 — Camila F. (PR)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                    PAGO NO PIX
                  </span>
                </div>
                <p className="text-zinc-300 font-medium">1x Game Stick X3 Pro 8K + Adaptador Bluetooth</p>
                <div className="flex justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                  <span>Total: R$ 269,98</span>
                  <span className="text-emerald-400 font-bold">NFe Emitida &bull; Pronto</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-yellow-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">#1040 — Lucas A. (MG)</span>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-bold">
                    MERCADO LIVRE
                  </span>
                </div>
                <p className="text-zinc-300 font-medium">1x Caixa de Som Sabala DR-051 Bluetooth</p>
                <div className="flex justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                  <span>Total: R$ 238,00</span>
                  <span className="text-yellow-400 font-bold">Mercado Envios Pronto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: CATALOGO & HIGIENIZADOR IA
      ======================================================== */}
      {activeAdminTab === "CATALOG" && (
        <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-amber-400" />
                Catálogo Inteligente &amp; Higienizador de Nomes Fiscais
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Nunca mais exiba nomes brutos de notas fiscais na vitrine. Use a IA para gerar títulos que vendem.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-semibold">
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Título Bruto da Nota Fiscal (Bling)</th>
                  <th className="py-3 px-3 text-emerald-400">Título Comercial Vitrine</th>
                  <th className="py-3 px-3">Preço Base</th>
                  <th className="py-3 px-3">Estoque</th>
                  <th className="py-3 px-3 text-right">Otimização com IA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-3 font-mono text-amber-400 font-bold">
                      {p.sku}
                    </td>
                    <td className="py-3 px-3 max-w-xs text-zinc-400 truncate">
                      {p.invoiceTitle}
                    </td>
                    <td className="py-3 px-3 max-w-xs font-bold text-white truncate">
                      {p.storefrontTitle}
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                      R$ {p.baseSalePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-300">
                      {p.stock} un.
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedProductForAi(p)}
                        className="inline-flex items-center gap-1.5 bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/40 px-3 py-1.5 rounded-lg text-xs font-bold transition active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        Otimizar com IA
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: HUB MERCADO LIVRE & SHOPEE
      ======================================================== */}
      {activeAdminTab === "PRICING_MATRIX" && <OmnichannelPricingMatrix />}

      {/* ========================================================
          TAB 4: PLUGINS WORDPRESS VS NATIVO
      ======================================================== */}
      {activeAdminTab === "WP_PLUGINS" && <PluginsWordpressManager />}

      {/* ========================================================
          TAB 5: EMISSOR FISCAL NFE A1 & EXPEDIÇÃO
      ======================================================== */}
      {activeAdminTab === "NFE_EXPEDITION" && <NfeCertificateManager />}

      {/* ========================================================
          TAB 6: CENTRAL BLACK FRIDAY
      ======================================================== */}
      {activeAdminTab === "BLACK_FRIDAY" && (
        <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Central de Campanhas &amp; Motor de Black Friday
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Ative ou desative o visual de Black Friday na loja inteira em milissegundos sem precisar de deploy.
              </p>
            </div>

            <button
              onClick={toggleBlackFridayMode}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition shadow-lg active:scale-95 ${
                blackFridayMode
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-amber-500/30"
                  : "bg-zinc-800 text-zinc-300"
              }`}
            >
              <Flame className="w-4 h-4 fill-black" />
              {blackFridayMode ? "DESATIVAR MODO BLACK FRIDAY" : "ATIVAR MODO BLACK FRIDAY AGORA"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <span className="font-bold text-white">Status da Campanha na Vitrine:</span>
              <p className="text-zinc-300">
                {blackFridayMode
                  ? "🔥 ATIVO: Banner superior com contagem regressiva, preços promocionais e barras de lotes ativadas em todos os cards."
                  : "Normal: Exibindo catálogo padrão sem contadores de urgência."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <span className="font-bold text-white">Regra de Frete Grátis Black Friday:</span>
              <p className="text-zinc-300">
                Frete Grátis destravado automaticamente para pedidos acima de R$ 250,00 com gatilho de Order Bump integrado.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 7: MOTOR DE FLUXOS N8N PLAYTECH
      ======================================================== */}
      {activeAdminTab === "FLOW_ENGINE" && <FlowEngineN8N />}

      {/* ========================================================
          TAB 8: CENTRAL DE AGENTES AUTÔNOMOS
      ======================================================== */}
      {activeAdminTab === "AUTONOMOUS_AGENTS" && <AutonomousAgentsCenter />}

      {/* ========================================================
          TAB 9: GESTOR DE BANNERS DA VITRINE HOME
      ======================================================== */}
      {activeAdminTab === "HERO_BANNERS" && <HeroBannersManager />}

      {/* Modal Higienizador IA */}
      {selectedProductForAi && (
        <AiProductBeautifierModal
          product={selectedProductForAi}
          onClose={() => setSelectedProductForAi(null)}
        />
      )}
    </div>
  );
}
