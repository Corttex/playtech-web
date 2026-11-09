"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react";
import { useStore, HeroSlide, SecondaryBanners } from "@/store/useStore";

const CATEGORIES_LIST = [
  "Projetores & Câmeras",
  "Smartwatches",
  "Gaming & Retrô",
  "Áudio & Som",
  "Iluminação",
  "Carregadores e Cabos",
  "Automotivo e Acessórios",
  "Casa & Utensílios",
  "Ferramentas e Utilidades",
  "Informática",
  "Acessórios Diversos"
];

export default function HeroBannersManager() {
  const {
    heroSlides,
    secondaryBanners,
    setHeroSlides,
    updateHeroSlide,
    addHeroSlide,
    removeHeroSlide,
    setSecondaryBanners,
    updateSecondaryBanner,
    resetHeroBannersToDefault
  } = useStore();

  const [activeTab, setActiveTab] = useState<"MAIN_SLIDES" | "SECONDARY">("MAIN_SLIDES");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  const handleSaveAll = () => {
    // Força gravação no localStorage
    try {
      localStorage.setItem("playtech_hero_slides", JSON.stringify(heroSlides));
      localStorage.setItem("playtech_secondary_banners", JSON.stringify(secondaryBanners));
    } catch {}

    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleAddNewSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      title: "NOVO DESTAQUE PLAYTECH",
      desc: "Descreva a oferta especial ou nova linha de produtos aqui.",
      cta: "Conferir Oferta",
      category: "Projetores & Câmeras",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop&q=80",
      badge: "Novidade",
      btnClass: "bg-blue-600 hover:bg-blue-500 text-white"
    };
    addHeroSlide(newSlide);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-black text-white">
              Gestor de Banners &amp; Vitrine Principal
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Configure o carrossel do primeiro card grande (até 3+ slides rotativos) e os 3 banners laterais. As imagens cobrem 100% dos containers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetHeroBannersToDefault}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition flex items-center gap-1.5 cursor-pointer"
            title="Restaurar Banners Originais"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Padrões</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar na Vitrine</span>
          </button>
        </div>
      </div>

      {/* Alerta de Sucesso */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Banners salvos com sucesso! As alterações já estão ativas na página inicial.</span>
        </div>
      )}

      {/* Navegação entre Abas */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("MAIN_SLIDES")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "MAIN_SLIDES"
              ? "bg-amber-500 text-black shadow-md"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Card Maior (Carrossel de {heroSlides.length} Slides)</span>
        </button>

        <button
          onClick={() => setActiveTab("SECONDARY")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "SECONDARY"
              ? "bg-amber-500 text-black shadow-md"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>2. Banners Laterais (Fones, Games, Watches)</span>
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/20 transition"
        >
          <span>Visualizar Loja</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* ========================================================
          ABA 1: GESTOR DO CARROSSEL PRINCIPAL (CARD MAIOR)
      ======================================================== */}
      {activeTab === "MAIN_SLIDES" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Slides Ativos ({heroSlides.length}) &bull; Passando a cada 5.5s
            </span>
            <button
              onClick={handleAddNewSlide}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Adicionar Slide</span>
            </button>
          </div>

          <div className="space-y-4">
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-white/10 shadow-lg space-y-4 relative overflow-hidden"
              >
                {/* Header do Card com numeração e ação de exclusão */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-500/30">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-black text-white">
                      Slide #{idx + 1}: {slide.title || "Sem Título"}
                    </span>
                  </div>

                  {heroSlides.length > 1 && (
                    <button
                      onClick={() => removeHeroSlide(idx)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                      title="Excluir este slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Grid de Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Título Principal */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-400">Título em Destaque (H2)</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => updateHeroSlide(idx, { title: e.target.value })}
                      placeholder="Ex: SEGURANÇA E QUALIDADE EM UM CLIQUE"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Subtítulo / Descrição */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-400">Subtítulo / Descrição</label>
                    <input
                      type="text"
                      value={slide.desc}
                      onChange={(e) => updateHeroSlide(idx, { desc: e.target.value })}
                      placeholder="Ex: Câmeras IP e acessórios para monitoramento."
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-medium outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Badge de Destaque */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-400">Selo / Badge (opcional)</label>
                    <input
                      type="text"
                      value={slide.badge || ""}
                      onChange={(e) => updateHeroSlide(idx, { badge: e.target.value })}
                      placeholder="Ex: Lançamento 2026, Campeão de Vendas"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Texto do Botão (CTA) */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-400">Texto do Botão (CTA)</label>
                    <input
                      type="text"
                      value={slide.cta}
                      onChange={(e) => updateHeroSlide(idx, { cta: e.target.value })}
                      placeholder="Ex: Conhecer Projetores"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Categoria de Destino ao Clicar */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-400">Departamento de Destino</label>
                    <select
                      value={slide.category}
                      onChange={(e) => updateHeroSlide(idx, { category: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-amber-400 transition cursor-pointer"
                    >
                      {CATEGORIES_LIST.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL da Imagem de Fundo 100% */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-400">URL da Imagem (Fundo 100%)</label>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => updateHeroSlide(idx, { image: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-zinc-300 font-mono text-[11px] outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                {/* Mini Preview do Slide */}
                <div className="pt-2">
                  <div className="relative h-24 rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center px-4">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                    <div className="relative z-10 space-y-0.5">
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">
                        Preview: {slide.category}
                      </span>
                      <h4 className="text-xs font-black text-white truncate max-w-md">
                        {slide.title}
                      </h4>
                      <p className="text-[10px] text-zinc-300 truncate max-w-sm">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          ABA 2: BANNERS LATERAIS (FONES, GAMES, SMARTWATCHES)
      ======================================================== */}
      {activeTab === "SECONDARY" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* FONES DE OUVIDO */}
          <div className="p-5 rounded-3xl bg-zinc-900 border border-white/10 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                Card Superior (Fones de Ouvido)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Título</label>
                <input
                  type="text"
                  value={secondaryBanners.headphones.title}
                  onChange={(e) => updateSecondaryBanner("headphones", { title: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Subtítulo</label>
                <input
                  type="text"
                  value={secondaryBanners.headphones.desc}
                  onChange={(e) => updateSecondaryBanner("headphones", { desc: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Texto Botão</label>
                <input
                  type="text"
                  value={secondaryBanners.headphones.cta}
                  onChange={(e) => updateSecondaryBanner("headphones", { cta: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">URL da Imagem 100%</label>
                <input
                  type="text"
                  value={secondaryBanners.headphones.image}
                  onChange={(e) => updateSecondaryBanner("headphones", { image: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-300 font-mono text-[11px] outline-none focus:border-amber-400"
                />
              </div>

              {/* Preview */}
              <div className="relative h-20 rounded-xl overflow-hidden bg-black/60 border border-white/10 mt-2">
                <img
                  src={secondaryBanners.headphones.image}
                  alt="Preview Fones"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* GAME STICK */}
          <div className="p-5 rounded-3xl bg-zinc-900 border border-white/10 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                Card Inferior 1 (Game Stick)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Título</label>
                <input
                  type="text"
                  value={secondaryBanners.gamestick.title}
                  onChange={(e) => updateSecondaryBanner("gamestick", { title: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Subtítulo</label>
                <input
                  type="text"
                  value={secondaryBanners.gamestick.desc}
                  onChange={(e) => updateSecondaryBanner("gamestick", { desc: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Texto Botão</label>
                <input
                  type="text"
                  value={secondaryBanners.gamestick.cta}
                  onChange={(e) => updateSecondaryBanner("gamestick", { cta: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">URL da Imagem 100%</label>
                <input
                  type="text"
                  value={secondaryBanners.gamestick.image}
                  onChange={(e) => updateSecondaryBanner("gamestick", { image: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-300 font-mono text-[11px] outline-none focus:border-amber-400"
                />
              </div>

              {/* Preview */}
              <div className="relative h-20 rounded-xl overflow-hidden bg-black/60 border border-white/10 mt-2">
                <img
                  src={secondaryBanners.gamestick.image}
                  alt="Preview Game Stick"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* SMARTWATCHES */}
          <div className="p-5 rounded-3xl bg-zinc-900 border border-white/10 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                Card Inferior 2 (Smartwatches)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Título</label>
                <input
                  type="text"
                  value={secondaryBanners.smartwatch.title}
                  onChange={(e) => updateSecondaryBanner("smartwatch", { title: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Subtítulo</label>
                <input
                  type="text"
                  value={secondaryBanners.smartwatch.desc}
                  onChange={(e) => updateSecondaryBanner("smartwatch", { desc: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Texto Botão</label>
                <input
                  type="text"
                  value={secondaryBanners.smartwatch.cta}
                  onChange={(e) => updateSecondaryBanner("smartwatch", { cta: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">URL da Imagem 100%</label>
                <input
                  type="text"
                  value={secondaryBanners.smartwatch.image}
                  onChange={(e) => updateSecondaryBanner("smartwatch", { image: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-zinc-300 font-mono text-[11px] outline-none focus:border-amber-400"
                />
              </div>

              {/* Preview */}
              <div className="relative h-20 rounded-xl overflow-hidden bg-black/60 border border-white/10 mt-2">
                <img
                  src={secondaryBanners.smartwatch.image}
                  alt="Preview Smartwatches"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
