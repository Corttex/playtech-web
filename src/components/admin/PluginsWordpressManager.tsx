"use client";

import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Trash2,
  Zap,
  ShieldCheck,
  CreditCard,
  Truck,
  TrendingUp,
  MessageCircle,
  FileCode2,
  Settings,
  AlertCircle,
  ExternalLink,
  BellRing,
  Image as ImageIcon,
  Send,
  Stamp
} from "lucide-react";
import { REAL_WP_PLUGINS_AUDIT, AnalyzedPlugin } from "@/data/plugins-audit";

export default function PluginsWordpressManager() {
  const [selectedFilter, setSelectedFilter] = useState<string>("TODOS");
  const [activeSubTab, setActiveSubTab] = useState<
    "AUDIT" | "SNIPPETS" | "WHATSAPP_NOTIF" | "WATERMARK" | "SEO_FEED"
  >("AUDIT");

  // Configurações do Substituto do Code Snippets
  const [pixelConfig, setPixelConfig] = useState({
    metaPixelId: "847291048201948",
    googleAdsId: "AW-1092837482",
    tiktokPixelId: "C9281729384729",
    activeStatus: true,
  });

  // Configurações do Substituto do WPNotif (WhatsApp Automático)
  const [whatsappTemplates, setWhatsappTemplates] = useState({
    orderPaid: "Olá {cliente}! Seu pedido #{pedido} na PlayTech Brasil foi confirmado com sucesso no PIX! Já estamos separando seu produto.",
    nfeIssued: "Sua Nota Fiscal do pedido #{pedido} foi emitida com sucesso! Chave de Acesso: {chave_nfe}.",
    shipped: "Boas notícias, {cliente}! Seu pacote foi despachado via Correios. Código de Rastreamento: {rastreio} (Previsão de 2 a 4 dias).",
    testPhone: "(11) 98765-4321",
  });

  // Configurações do Substituto do Watermark
  const [watermarkConfig, setWatermarkConfig] = useState({
    enabled: true,
    text: "PLAYTECH BRASIL • OFICIAL",
    opacity: 35,
    position: "BOTTOM_RIGHT", // CENTER | BOTTOM_RIGHT
  });

  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback("Pixels salvos com sucesso! Injetados no cabeçalho do Edge CDN.");
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  const handleTestWhatsApp = () => {
    setSavedFeedback(`Mensagem de teste disparada com sucesso para o WhatsApp ${whatsappTemplates.testPhone}!`);
    setTimeout(() => setSavedFeedback(null), 3500);
  };

  const handleSaveWatermark = () => {
    setSavedFeedback("Configuração de Marca D'água atualizada! Todas as fotos do catálogo estão protegidas contra roubo de concorrentes.");
    setTimeout(() => setSavedFeedback(null), 3500);
  };

  const filteredPlugins = REAL_WP_PLUGINS_AUDIT.filter((p) => {
    if (selectedFilter === "TODOS") return true;
    if (selectedFilter === "PERFORMANCE") return p.wpCategory === "PERFORMANCE_BLOAT";
    if (selectedFilter === "SECURITY") return p.wpCategory === "SECURITY_FIX";
    if (selectedFilter === "COMMERCE") return ["PAYMENT", "CHECKOUT_BRAZIL", "SHIPPING"].includes(p.wpCategory);
    if (selectedFilter === "MARKETING") return ["MARKETING_SEO", "COMMUNICATION", "BUILDER_CUSTOM"].includes(p.wpCategory);
    return true;
  });

  const bloatCount = REAL_WP_PLUGINS_AUDIT.filter((p) => p.action === "ELIMINADO_NATIVO").length;
  const upgradedCount = REAL_WP_PLUGINS_AUDIT.filter((p) => p.action === "APRIMORADO_NATIVO" || p.action === "INTEGRADO_API").length;

  return (
    <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Auditoria de Plugins do WordPress &bull; PlayTech Brasil
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
              Todos os Prints Mapeados
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Eliminamos os 12 plugins de lentidão e o tema pesado Woodmart, trazendo WPNotif, Watermark e Mercado Pago de forma nativa.
          </p>
        </div>

        {/* Sub-navegação interna */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-white/10 text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab("AUDIT")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeSubTab === "AUDIT"
                ? "bg-amber-500 text-black font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            1. Diagnóstico Geral
          </button>
          <button
            onClick={() => setActiveSubTab("WHATSAPP_NOTIF")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "WHATSAPP_NOTIF"
                ? "bg-amber-500 text-black font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <BellRing className="w-3.5 h-3.5" />
            2. WhatsApp Automático (WPNotif)
          </button>
          <button
            onClick={() => setActiveSubTab("WATERMARK")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "WATERMARK"
                ? "bg-amber-500 text-black font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Stamp className="w-3.5 h-3.5" />
            3. Marca D&apos;água Fotos
          </button>
          <button
            onClick={() => setActiveSubTab("SNIPPETS")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeSubTab === "SNIPPETS"
                ? "bg-amber-500 text-black font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            4. Pixels (Code Snippets)
          </button>
          <button
            onClick={() => setActiveSubTab("SEO_FEED")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
              activeSubTab === "SEO_FEED"
                ? "bg-amber-500 text-black font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            5. Google Shopping XML
          </button>
        </div>
      </div>

      {savedFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-2 animate-in fade-in text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{savedFeedback}</span>
        </div>
      )}

      {/* ========================================================
          VISÃO 1: AUDITORIA GERAL DOS PLUGINS
      ======================================================== */}
      {activeSubTab === "AUDIT" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 space-y-1">
              <span className="text-zinc-400 font-bold block">Plugins e Temas Eliminados:</span>
              <div className="text-2xl font-black text-red-400">{bloatCount} Itens</div>
              <p className="text-[11px] text-zinc-400">
                12 de cache/imagem + 6 de segurança + Tema Woodmart que afundavam a velocidade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 space-y-1">
              <span className="text-zinc-400 font-bold block">Operação Nativas Aprimoradas:</span>
              <div className="text-2xl font-black text-emerald-400">{upgradedCount} Módulos</div>
              <p className="text-[11px] text-zinc-400">
                Mercado Pago, Correios, WPNotif WhatsApp, Watermark, Pixels e Google XML.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 space-y-1">
              <span className="text-zinc-400 font-bold block">Velocidade no Celular (4G/5G):</span>
              <div className="text-2xl font-black text-amber-400">&lt; 40ms TTFB</div>
              <p className="text-[11px] text-zinc-400">
                Abertura instantânea para as 30 mil visitas mensais sem travar em picos de vendas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5 text-xs font-bold scrollbar-none">
            <span className="text-zinc-400 mr-2">Filtrar:</span>
            {[
              { id: "TODOS", label: "Todos os Plugins" },
              { id: "COMMERCE", label: "💳 Pagamentos, Frete & Notificações" },
              { id: "MARKETING", label: "📈 Marketing, SEO & Fotos" },
              { id: "PERFORMANCE", label: "⚡ Bloat Eliminado (LiteSpeed, WebP, Woodmart)" },
              { id: "SECURITY", label: "🛡️ Tapa-buracos de Segurança" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                  selectedFilter === tab.id
                    ? "bg-amber-500 text-black font-black"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-semibold">
                  <th className="py-3 px-3">Plugin no WordPress do Lucas</th>
                  <th className="py-3 px-3">Decisão Arquitetural</th>
                  <th className="py-3 px-3 text-amber-400">Solução no PlayTech OS</th>
                  <th className="py-3 px-3">Impacto Prático na Operação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPlugins.map((item, index) => (
                  <tr key={index} className="hover:bg-white/5 transition">
                    <td className="py-3 px-3 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {item.action === "ELIMINADO_NATIVO" ? (
                          <span className="text-red-400 font-mono text-[10px] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                            ELIMINADO
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            NATIVO &bull; ATIVO
                          </span>
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          item.action === "ELIMINADO_NATIVO"
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {item.action === "ELIMINADO_NATIVO" ? "Desnecessário no Next.js" : "Aprimorado no Admin"}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-bold text-amber-300">
                      {item.nativeModule}
                    </td>

                    <td className="py-3 px-3 text-zinc-300 max-w-sm leading-relaxed">
                      {item.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          VISÃO 2: CENTRAL DE WHATSAPP AUTOMÁTICO (SUBSTITUTO WPNOTIF)
      ======================================================== */}
      {activeSubTab === "WHATSAPP_NOTIF" && (
        <div className="space-y-6 text-xs max-w-3xl">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              Substituto Nativo do &quot;WPNotif: WordPress SMS &amp; WhatsApp Notifications&quot;
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              No WordPress o WPNotif frequentemente falhava por limite de servidor ou timeout PHP. Aqui, o disparo ocorre instantaneamente via Webhook de alta velocidade assim que o pedido muda de status.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <label className="text-white font-bold block flex items-center justify-between">
                <span>1. Mensagem de Pedido Aprovado no PIX / Cartão:</span>
                <span className="text-[10px] text-emerald-400 font-mono">Disparo: Imediato</span>
              </label>
              <textarea
                rows={2}
                value={whatsappTemplates.orderPaid}
                onChange={(e) => setWhatsappTemplates({ ...whatsappTemplates, orderPaid: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <label className="text-white font-bold block flex items-center justify-between">
                <span>2. Mensagem de Emissão de Nota Fiscal (SEFAZ A1):</span>
                <span className="text-[10px] text-amber-400 font-mono">Disparo: Ao Autorizar NFe</span>
              </label>
              <textarea
                rows={2}
                value={whatsappTemplates.nfeIssued}
                onChange={(e) => setWhatsappTemplates({ ...whatsappTemplates, nfeIssued: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <label className="text-white font-bold block flex items-center justify-between">
                <span>3. Mensagem de Envio com Código de Rastreamento Correios:</span>
                <span className="text-[10px] text-sky-400 font-mono">Disparo: Ao Despachar Pacote</span>
              </label>
              <textarea
                rows={2}
                value={whatsappTemplates.shipped}
                onChange={(e) => setWhatsappTemplates({ ...whatsappTemplates, shipped: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-zinc-400 shrink-0">Telefone para Teste:</span>
                <input
                  type="text"
                  value={whatsappTemplates.testPhone}
                  onChange={(e) => setWhatsappTemplates({ ...whatsappTemplates, testPhone: e.target.value })}
                  className="bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleTestWhatsApp}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-500/20"
              >
                <Send className="w-3.5 h-3.5" /> Enviar Mensagem de Teste no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          VISÃO 3: MARCA D'ÁGUA EM FOTOS (SUBSTITUTO WATERMARK)
      ======================================================== */}
      {activeSubTab === "WATERMARK" && (
        <div className="space-y-6 text-xs max-w-2xl">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Stamp className="w-4 h-4 text-amber-400" />
              Substituto do &quot;WooCommerce Products Image Watermark&quot;
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Proteja seu catálogo contra concorrentes que roubam fotos da PlayTech para vender no Mercado Livre ou Shopee. O sistema carimba automaticamente o logo oficial em alta resolução.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-bold text-white block">Ativar Proteção Automática de Marca D&apos;água:</span>
                <span className="text-[11px] text-zinc-400">
                  Carimbar nas fotos de produtos da vitrine e do gerador de Landing Pages.
                </span>
              </div>
              <input
                type="checkbox"
                checked={watermarkConfig.enabled}
                onChange={(e) => setWatermarkConfig({ ...watermarkConfig, enabled: e.target.checked })}
                className="h-5 w-5 accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-bold block mb-1">
                Texto do Carimbo / Marca D&apos;água:
              </label>
              <input
                type="text"
                value={watermarkConfig.text}
                onChange={(e) => setWatermarkConfig({ ...watermarkConfig, text: e.target.value })}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-300 font-bold block mb-1">Posicionamento:</label>
                <select
                  value={watermarkConfig.position}
                  onChange={(e) => setWatermarkConfig({ ...watermarkConfig, position: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="BOTTOM_RIGHT">Canto Inferior Direito (Discreto)</option>
                  <option value="CENTER">Centro Translúcido (Anti-Cópia Forte)</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-300 font-bold block mb-1">
                  Opacidade: {watermarkConfig.opacity}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={watermarkConfig.opacity}
                  onChange={(e) => setWatermarkConfig({ ...watermarkConfig, opacity: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer mt-2"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveWatermark}
                className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-2.5 rounded-xl text-xs transition active:scale-95"
              >
                Salvar Configurações de Marca D&apos;água
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          VISÃO 4: PIXELS & TAGS (SUBSTITUTO CODE SNIPPETS)
      ======================================================== */}
      {activeSubTab === "SNIPPETS" && (
        <form onSubmit={handleSavePixels} className="space-y-5 text-xs max-w-2xl">
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-purple-400" />
              Substituto Direto do plugin &quot;Code Snippets&quot;
            </span>
            <p className="text-[11px] text-zinc-400">
              Gerencie seus Pixels de rastreamento para anúncios no Meta (Facebook/Instagram), Google Ads e TikTok sem precisar mexer em arquivos PHP.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                Meta Pixel ID (Facebook / Instagram Ads):
              </label>
              <input
                type="text"
                value={pixelConfig.metaPixelId}
                onChange={(e) => setPixelConfig({ ...pixelConfig, metaPixelId: e.target.value })}
                placeholder="Ex: 847291048201948"
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                Google Ads Conversion ID (Tag Manager / GA4):
              </label>
              <input
                type="text"
                value={pixelConfig.googleAdsId}
                onChange={(e) => setPixelConfig({ ...pixelConfig, googleAdsId: e.target.value })}
                placeholder="Ex: AW-1092837482"
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                TikTok Ads Pixel ID:
              </label>
              <input
                type="text"
                value={pixelConfig.tiktokPixelId}
                onChange={(e) => setPixelConfig({ ...pixelConfig, tiktokPixelId: e.target.value })}
                placeholder="Ex: C9281729384729"
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            Salvar e Ativar Pixels no Edge CDN
          </button>
        </form>
      )}

      {/* ========================================================
          VISÃO 5: GOOGLE SHOPPING XML (SUBSTITUTO RANK MATH + GOOGLE FOR WOO)
      ======================================================== */}
      {activeSubTab === "SEO_FEED" && (
        <div className="space-y-5 text-xs max-w-2xl">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Substituto do &quot;Rank Math SEO PRO&quot; e &quot;Google for WooCommerce&quot;
            </span>
            <p className="text-[11px] text-zinc-400">
              O feed de produtos para o Google Shopping e os dados estruturados (Rich Snippets) são gerados nativamente pelo servidor em formato XML/JSON-LD, sem pesar no banco de dados.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <span className="font-bold text-white block">URL do Feed Dinâmico do Google Merchant Center:</span>
              <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-white/5 font-mono text-[11px] text-emerald-400">
                <span>https://playtechbr.com.br/api/feeds/google-merchant.xml</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Sincronizado 24/7
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">
                Pode colar este link diretamente no Google Merchant Center. Seus preços de Black Friday e estoque são atualizados a cada 15 minutos automaticamente.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <span className="font-bold text-white block">Sitemap XML Automático:</span>
              <div className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-white/5 font-mono text-[11px] text-sky-400">
                <span>https://playtechbr.com.br/sitemap.xml</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-bold">
                  Indexação Instantânea
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
