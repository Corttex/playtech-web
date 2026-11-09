"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Check, ArrowRight, Wand2 } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";

interface AiModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function AiProductBeautifierModal({ product, onClose }: AiModalProps) {
  const { updateProduct } = useStore();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const [form, setForm] = useState({
    storefrontTitle: product?.storefrontTitle || "",
    marketplaceTitleML: product?.marketplaceTitleML || "",
    shortHeadline: product?.shortHeadline || "",
    descriptionHtml: product?.descriptionHtml || "",
  });

  if (!product) return null;

  const handleAiOptimize = () => {
    setLoading(true);
    setTimeout(() => {
      setForm({
        storefrontTitle: `${product.storefrontTitle} — Edição Especial PlayTech`,
        marketplaceTitleML: `${product.storefrontTitle.slice(0, 50)} Original Nfe`,
        shortHeadline: `Destaque absoluto com garantia estendida, suporte técnico dedicado e envio imediato com nota fiscal.`,
        descriptionHtml: `<p>A PlayTech Brasil traz com exclusividade este modelo homologado, com acabamento premium e desempenho superior comprovado em testes de bancada.</p>`,
      });
      setLoading(false);
    }, 700);
  };

  const handleSave = () => {
    updateProduct(product.id, form);
    setApplied(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12131A] border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Higienizador de Catálogo IA (Gemini)
              </h3>
              <p className="text-xs text-zinc-400">
                Transforme dados fiscais crus em copy de alta conversão para o site e Mercado Livre.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xs font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>

        {/* Dado Bruto Fiscal */}
        <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">
            Título Bruto Original da Nota Fiscal (Bling / Fornecedor):
          </span>
          <p className="font-mono text-zinc-300 mt-1 font-semibold">{product.invoiceTitle}</p>
        </div>

        {/* Inputs otimizados */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-bold mb-1">
              Título Comercial Vitrine (PlayTech Storefront):
            </label>
            <input
              type="text"
              value={form.storefrontTitle}
              onChange={(e) => setForm({ ...form, storefrontTitle: e.target.value })}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-zinc-400 font-bold">
                Título Mercado Livre (SEO de Busca — máx. 60 chars):
              </label>
              <span className={`text-[10px] font-mono ${form.marketplaceTitleML.length > 60 ? "text-red-400 font-bold" : "text-zinc-400"}`}>
                {form.marketplaceTitleML.length} / 60
              </span>
            </div>
            <input
              type="text"
              value={form.marketplaceTitleML}
              maxLength={60}
              onChange={(e) => setForm({ ...form, marketplaceTitleML: e.target.value })}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-400 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-bold mb-1">
              Headline Curta (Subtítulo de Impacto):
            </label>
            <input
              type="text"
              value={form.shortHeadline}
              onChange={(e) => setForm({ ...form, shortHeadline: e.target.value })}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-400 outline-none"
            />
          </div>
        </div>

        {/* Botoes de Acao */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handleAiOptimize}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/40 px-4 py-2.5 rounded-xl text-xs font-bold transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            {loading ? "Gerando com IA..." : "Sugerir com IA (Gemini)"}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              {applied ? <Check className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
              {applied ? "Aplicado!" : "Salvar no Catálogo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
