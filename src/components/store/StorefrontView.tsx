"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter,
  Filter,
  X,
  Tv,
  Gamepad2,
  Headphones,
  Lightbulb,
  Home,
  Watch,
  Smartphone,
  ArrowRight,
  Sparkles,
  Layers,
  Car,
  Zap,
  Wrench,
  Utensils,
  Cpu,
  Laptop,
  Truck,
  ShieldCheck,
  CreditCard,
  Projector,
  PlugZap,
  Flame,
  Star,
  Tag,
  Trophy
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariant, quickStaggerContainer } from "@/lib/animation-variants";
import PlayTechHeroMotorola from "./PlayTechHeroMotorola";
import ProductCardClean from "./ProductCardClean";
import ProductDetailView from "./ProductDetailView";
import ThematicCategoryShowcases from "./ThematicCategoryShowcases";
import DepartmentCatalogPage from "./DepartmentCatalogPage";
import StaggeredGrid from "../animations/StaggeredGrid";
import PromoMiniBanner from "./PromoMiniBanner";
import CustomerReviewsShowcase from "./CustomerReviewsShowcase";
import StickyAddToCartBar from "./StickyAddToCartBar";
import GamerArcadeBackground from "./GamerArcadeBackground";

export default function StorefrontView() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    blackFridayMode,
    selectedProductForDetail,
    setSelectedProductForDetail
  } = useStore();

  const [sortBy, setSortBy] = useState<"POPULAR" | "LOW_PRICE" | "HIGH_PRICE">("POPULAR");
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isViewingFullDepartment, setIsViewingFullDepartment] = useState(false);
  const [quickFilter, setQuickFilter] = useState<"ALL" | "IMMEDIATE" | "PROMO" | "TOP_SELLER" | "UNDER_100" | "FREE_SHIPPING">("ALL");
  const [gamerSubFilter, setGamerSubFilter] = useState<"ALL" | "STICK" | "CONTROLLER" | "CONSOLE">("ALL");

  const isGamerMode = selectedCategory === "Gaming & Retrô" || selectedCategory === "Stick & Video Games";

  useEffect(() => {
    setGamerSubFilter("ALL");
  }, [selectedCategory]);

  const carouselRef = useRef<HTMLDivElement>(null);

  const checkScrollable = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 14);
    }
  };

  useEffect(() => {
    checkScrollable();
    const timer = setTimeout(checkScrollable, 200);
    window.addEventListener("resize", checkScrollable);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === "TODOS") {
      setIsViewingFullDepartment(false);
    }
  }, [selectedCategory]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollable, 300);
    }
  };

  // TODAS as categorias da PlayTech organizadas com gradiente azul contínuo do escuro para o claro e ícones aumentados
  const allDepartmentCircles = [
    {
      label: "TODOS",
      name: "Todos",
      icon: Layers,
      bgGradient: "linear-gradient(135deg, #020b18 0%, #0a1f44 100%)",
      glowColor: "rgba(10, 31, 68, 0.6)",
    },
    {
      label: "Projetores & Câmeras",
      name: "Projetores",
      icon: Projector,
      bgGradient: "linear-gradient(135deg, #04122b 0%, #0d2a5e 100%)",
      glowColor: "rgba(13, 42, 94, 0.5)",
    },
    {
      label: "Smartwatches",
      name: "Smartwatch",
      icon: Watch,
      bgGradient: "linear-gradient(135deg, #06193d 0%, #103678 100%)",
      glowColor: "rgba(16, 54, 120, 0.5)",
    },
    {
      label: "Gaming & Retrô",
      name: "Games",
      icon: Gamepad2,
      bgGradient: "linear-gradient(135deg, #08214f 0%, #144392 100%)",
      glowColor: "rgba(20, 67, 146, 0.45)",
    },
    {
      label: "Stick & Video Games",
      name: "Game Stick",
      icon: Tv,
      bgGradient: "linear-gradient(135deg, #092557 0%, #15459a 100%)",
      glowColor: "rgba(21, 69, 154, 0.45)",
    },
    {
      label: "Áudio & Som",
      name: "Áudio",
      icon: Headphones,
      bgGradient: "linear-gradient(135deg, #0a2962 0%, #1851ac 100%)",
      glowColor: "rgba(24, 81, 172, 0.45)",
    },
    {
      label: "Iluminação",
      name: "Iluminação",
      icon: Lightbulb,
      bgGradient: "linear-gradient(135deg, #0d3275 0%, #1d5fc6 100%)",
      glowColor: "rgba(29, 95, 198, 0.45)",
    },
    {
      label: "Carregadores e Cabos",
      name: "Carregadores",
      icon: PlugZap,
      bgGradient: "linear-gradient(135deg, #0f3c88 0%, #226ee0 100%)",
      glowColor: "rgba(34, 110, 224, 0.45)",
    },
    {
      label: "Automotivo e Acessórios",
      name: "Automotivo",
      icon: Car,
      bgGradient: "linear-gradient(135deg, #13479c 0%, #297df0 100%)",
      glowColor: "rgba(41, 125, 240, 0.45)",
    },
    {
      label: "Casa & Utensílios",
      name: "Cozinha",
      icon: Utensils,
      bgGradient: "linear-gradient(135deg, #1853b0 0%, #3a8df8 100%)",
      glowColor: "rgba(58, 141, 248, 0.45)",
    },
    {
      label: "Ferramentas e Utilidades",
      name: "Ferramentas",
      icon: Wrench,
      bgGradient: "linear-gradient(135deg, #1e60c4 0%, #4f9dfc 100%)",
      glowColor: "rgba(79, 157, 252, 0.45)",
    },
    {
      label: "Informática",
      name: "Informática",
      icon: Laptop,
      bgGradient: "linear-gradient(135deg, #266fd8 0%, #68adfe 100%)",
      glowColor: "rgba(104, 173, 254, 0.45)",
    },
    {
      label: "Acessórios Diversos",
      name: "Diversos",
      icon: Sparkles,
      bgGradient: "linear-gradient(135deg, #327fec 0%, #85beff 100%)",
      glowColor: "rgba(133, 190, 255, 0.45)",
    },
  ];

  if (selectedProductForDetail) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProductDetailView
          product={selectedProductForDetail}
          onBack={() => setSelectedProductForDetail(null)}
        />
      </div>
    );
  }

  // Se o usuário clicou para ver a página completa do departamento
  if (isViewingFullDepartment && selectedCategory !== "TODOS") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
        <DepartmentCatalogPage
          category={selectedCategory}
          onBack={() => setIsViewingFullDepartment(false)}
        />
      </div>
    );
  }

  const filteredProducts = products
    .filter((p) => {
      const price = blackFridayMode ? p.bfSalePrice : p.baseSalePrice;
      const matchesSearch =
        p.storefrontTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const isStickVideoGame = (item: typeof p) => {
        const text = ((item.storefrontTitle || "") + " " + ((item as any).title || "")).toLowerCase();
        return (
          item.category === "Gaming & Retrô" &&
          (text.includes("stick") ||
           text.includes("game stick") ||
           text.includes("console") ||
           text.includes("vídeo game") ||
           text.includes("video game") ||
           text.includes("portátil") ||
           text.includes("620") ||
           text.includes("emuelec"))
        );
      };

      const matchesCategory =
        selectedCategory === "TODOS"
          ? true
          : selectedCategory === "Stick & Video Games"
          ? isStickVideoGame(p)
          : p.category === selectedCategory;

      const matchesGamerSub =
        !isGamerMode || gamerSubFilter === "ALL"
          ? true
          : gamerSubFilter === "STICK"
          ? ((p.storefrontTitle || "") + " " + ((p as any).title || "")).toLowerCase().includes("stick")
          : gamerSubFilter === "CONTROLLER"
          ? ((p.storefrontTitle || "") + " " + ((p as any).title || "")).toLowerCase().includes("controle") ||
            ((p.storefrontTitle || "") + " " + ((p as any).title || "")).toLowerCase().includes("joystick")
          : gamerSubFilter === "CONSOLE"
          ? ((p.storefrontTitle || "") + " " + ((p as any).title || "")).toLowerCase().includes("console") ||
            ((p.storefrontTitle || "") + " " + ((p as any).title || "")).toLowerCase().includes("portátil") ||
            ((p.storefrontTitle || "") + " " + ((p as any).title || "")).toLowerCase().includes("620")
          : true;

      const matchesPrice = price <= priceRange;

      const matchesQuick =
        quickFilter === "ALL"
          ? true
          : quickFilter === "IMMEDIATE"
            ? ((p as any).stockQuantity || (p as any).stock || 0) > 0
            : quickFilter === "PROMO"
              ? (p.compareAtPrice > price || p.bfSalePrice < p.baseSalePrice || (p.bfSoldPercent || 0) >= 60)
              : quickFilter === "TOP_SELLER"
                ? (p.bfSoldPercent || 0) >= 45
                : quickFilter === "UNDER_100"
                  ? price <= 100
                  : quickFilter === "FREE_SHIPPING"
                    ? price >= 199
                    : true;

      return matchesSearch && matchesCategory && matchesGamerSub && matchesPrice && matchesQuick;
    })
    .sort((a, b) => {
      const priceA = blackFridayMode ? a.bfSalePrice : a.baseSalePrice;
      const priceB = blackFridayMode ? b.bfSalePrice : b.baseSalePrice;

      if (quickFilter === "TOP_SELLER" && sortBy === "POPULAR") {
        return (b.bfSoldPercent || 0) - (a.bfSoldPercent || 0);
      }
      if (quickFilter === "UNDER_100" && sortBy === "POPULAR") {
        return priceA - priceB;
      }
      if (sortBy === "LOW_PRICE") return priceA - priceB;
      if (sortBy === "HIGH_PRICE") return priceB - priceA;
      return (b.bfSoldPercent || 0) - (a.bfSoldPercent || 0);
    });

  return (
    <div className="space-y-8 pb-20">
      {/* ========================================================
          1. BANNER HERO FLAGSHIP MOTOROLA NO TOPO
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <PlayTechHeroMotorola />
      </div>

      {/* ========================================================
          2. CARROSSEL DE DEPARTAMENTOS EM BOLINHAS (FUNDO ESTICADO FULL-WIDTH)
          No desktop: 12 opções cabem perfeitamente sem corte e sem setas em cima
          No tablet/mobile: bolinhas mais compactas, mostrando 4 a 5 opções no mobile e convidando ao arrastar
      ======================================================== */}
      <section className="w-full bg-gray-50/80 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800/80 py-3 sm:py-3.5 relative flex justify-center group/carousel">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 w-full relative">
          {/* Botão Seta Esquerda (aparece apenas quando há conteúdo para rolar à esquerda) */}
          {canScrollLeft && (
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          )}

          {/* Trilho Deslizável do Carrossel */}
          <motion.div
            ref={carouselRef}
            onScroll={checkScrollable}
            variants={quickStaggerContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-start lg:justify-between xl:justify-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-1.5 xl:gap-2.5 2xl:gap-3 overflow-x-auto py-1.5 scrollbar-none px-2 sm:px-4 lg:px-0 scroll-smooth w-full select-none"
          >
            {allDepartmentCircles.map((dept) => {
              const isSelected = selectedCategory === dept.label;
              const Icon = dept.icon;

              return (
                <motion.button
                  key={dept.label}
                  variants={fadeUpVariant}
                  whileHover={{ scale: 1.07, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setSelectedCategory(dept.label);
                    setIsViewingFullDepartment(false);
                  }}
                  className="flex flex-col items-center gap-1 sm:gap-1.5 group shrink-0 focus:outline-none cursor-pointer py-1 w-[58px] sm:w-[64px] md:w-[70px] lg:w-[54px] xl:w-[64px] 2xl:w-[72px]"
                >
                  {/* Bolinha Circular com Gradiente Azul Contínuo e Ícone Aumentado */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-11 lg:h-11 xl:w-13 xl:h-13 2xl:w-14 2xl:h-14 rounded-full p-0.5 sm:p-1 transition-all duration-300 relative flex items-center justify-center ${isSelected
                      ? "ring-2.5 sm:ring-3 ring-blue-500 ring-offset-2 dark:ring-offset-gray-950 scale-105 shadow-lg shadow-blue-500/35"
                      : "ring-1.5 sm:ring-2 ring-gray-200/90 dark:ring-gray-700/80 hover:ring-blue-400 hover:shadow-md"
                      }`}
                  >
                    <div
                      style={{
                        background: dept.bgGradient,
                        boxShadow: `0 3px 12px ${dept.glowColor}`,
                      }}
                      className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300"
                    >
                      {/* Efeito sutil de brilho superior vitrificado */}
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full pointer-events-none" />

                      {/* Ícone Nítido e Proporcional */}
                      <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-6.5 2xl:h-6.5 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110 stroke-[2.2]" />
                    </div>
                  </div>

                  {/* Nome do Departamento */}
                  <span
                    className={`text-[9.5px] sm:text-[10.5px] lg:text-[10px] xl:text-[11px] font-bold tracking-tight text-center leading-tight transition-colors duration-200 w-full truncate px-0.5 ${isSelected
                      ? "text-blue-600 dark:text-blue-400 font-black"
                      : "text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-white"
                      }`}
                    title={dept.name}
                  >
                    {dept.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Botão Seta Direita (aparece apenas quando há conteúdo para rolar à direita) */}
          {canScrollRight && (
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
              aria-label="Rolar para direita"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </section>

      {/* ========================================================
          3. FAIXA DE BENEFÍCIOS FULL-WIDTH (TRUST STRIP PLAYTECH)
      ======================================================== */}
      <section className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Envio Expresso Sedex</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Postagem rápida para todo o Brasil</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Garantia Oficial PlayTech</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">1 ano de garantia + suporte Brasília</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Até 12x Sem Juros</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Ou 5% de desconto à vista no PIX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">100% Originais Testados</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Controle rigoroso antes do envio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CABEÇALHO DO CATÁLOGO & VITRINE DE PRODUTOS SELECIONADOS
      ======================================================== */}
      <section
        className={`w-full relative transition-all duration-700 ${
          isGamerMode
            ? "py-10 my-4 border-y border-purple-500/40 shadow-2xl shadow-purple-950/50 overflow-hidden"
            : "py-2"
        }`}
      >
        {/* Renderiza o Fundo de Arcade Animado de ponta a ponta (Full Width) exclusivamente quando em Modo Gamer */}
        {isGamerMode && <GamerArcadeBackground />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <div className="relative z-10 text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1.5">
          <span>Home</span>
          <span>|</span>
          <span>Catálogo</span>
          <span>|</span>
          <span className={isGamerMode ? "text-purple-300 font-bold" : "text-gray-700 dark:text-gray-300 font-bold"}>
            {selectedCategory === "TODOS" ? "Todos os Departamentos" : selectedCategory}
          </span>
        </div>

        {/* Header Especial da Zona Gamer PlayTech */}
        {isGamerMode ? (
          <div className="relative z-10 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/85 via-indigo-950/80 to-slate-950/85 border border-purple-500/40 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/25 text-purple-300 border border-purple-400/30 text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                ⚡ Modo Gamer PlayTech • 4K 60FPS
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase drop-shadow-md">
                {selectedCategory === "Stick & Video Games"
                  ? "GAME STICKS & CONSOLES RETRÔ 4K"
                  : "GAMING & RETRÔ PLAYTECH ZONE"}
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl font-medium">
                De 1.000 a 40.000 jogos nostálgicos com 2 controles sem fio de resposta instantânea, conexão HDMI plug &amp; play e joysticks Bluetooth para PC e mobile.
              </p>
            </div>

            {/* Sub-abas gamers rápidas */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-black/60 p-2 rounded-2xl border border-purple-500/30 shrink-0 shadow-lg">
              {[
                { id: "ALL", label: "Todos os Games", icon: Gamepad2 },
                { id: "STICK", label: "Game Sticks 4K", icon: Tv },
                { id: "CONTROLLER", label: "Controles & Joysticks", icon: Sparkles },
                { id: "CONSOLE", label: "Consoles Retrô", icon: Trophy },
              ].map((sub) => {
                const active = gamerSubFilter === sub.id;
                const Icon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setGamerSubFilter(sub.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      active
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40 ring-1 ring-purple-400"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Heading Padrão */}
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {selectedCategory === "TODOS" ? "CATÁLOGO DE IMPORTADOS PLAYTECH" : selectedCategory}
            </h2>

            {/* Subtítulo com ver mais */}
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
              <p>
                Confira o portfólio completo de dispositivos na PlayTech Store. Dezenas de modelos com entrega rápida para todo o Brasil, nota fiscal e condições especiais de parcelamento. Especialistas prontos para ajudar.
                {showFullDesc && (
                  <span className="block mt-2 text-gray-600 dark:text-gray-300">
                    Nossos produtos passam por rigoroso controle de qualidade em Brasília-DF, com envio imediato via Correios Sedex, garantia estendida e suporte pós-venda humanizado.
                  </span>
                )}
              </p>
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{showFullDesc ? "ver menos" : "ver mais"}</span>
                {showFullDesc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            CHIPS DE FILTRO RÁPIDO (PILLS DE 1-CLIQUE - IDEIA 4)
        ======================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: "Todos os Produtos", icon: Layers },
            { id: "IMMEDIATE", label: "Envio Imediato", icon: Zap },
            { id: "PROMO", label: "Super Ofertas", icon: Flame },
            { id: "TOP_SELLER", label: "Mais Vendidos", icon: Star },
            { id: "UNDER_100", label: "Até R$ 100", icon: Tag },
            { id: "FREE_SHIPPING", label: "Frete Grátis", icon: Truck },
          ].map((chip) => {
            const active = quickFilter === chip.id;
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => setQuickFilter(active && chip.id !== "ALL" ? "ALL" : (chip.id as any))}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-102 ring-2 ring-blue-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-white shadow-2xs"
                  }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${active
                    ? "text-white"
                    : chip.id === "IMMEDIATE"
                      ? "text-amber-500"
                      : chip.id === "PROMO"
                        ? "text-orange-500"
                        : chip.id === "TOP_SELLER"
                          ? "text-yellow-500 fill-yellow-500/30"
                          : chip.id === "UNDER_100"
                            ? "text-emerald-500"
                            : chip.id === "FREE_SHIPPING"
                              ? "text-sky-500"
                              : "text-blue-500"
                    }`}
                />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            4. TOOLBAR DE CONTROLES
        ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm text-xs">

          <div className="flex flex-wrap items-center gap-2">
            {/* Botão Filtrar */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-bold border border-gray-200 dark:border-gray-600 transition"
            >
              <Filter className="w-3.5 h-3.5 text-blue-500" />
              <span>Filtrar</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Ordenar por */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3.5 py-2 rounded-full border border-gray-200 dark:border-gray-600">
              <span className="font-bold text-gray-500 dark:text-gray-400">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-black text-gray-900 dark:text-white outline-none cursor-pointer text-xs"
              >
                <option value="POPULAR" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Mais Vendidos / Relevância</option>
                <option value="LOW_PRICE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Menor Preço</option>
                <option value="HIGH_PRICE" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Maior Preço</option>
              </select>
            </div>
          </div>

          {/* Lado Direito: Totalizador + Grade/Lista */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">
              Mostrando <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> produtos
            </span>

            {/* Toggle Grade / Lista */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1 border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setViewMode("GRID")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition ${viewMode === "GRID"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grade</span>
              </button>
              <button
                onClick={() => setViewMode("LIST")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition ${viewMode === "LIST"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lista</span>
              </button>
            </div>
          </div>
          {/* Botão de Atalho para o Catálogo Geral */}
          <button
            onClick={() => {
              setSelectedProductForDetail(null);
              useStore.getState().setActiveView("CATALOG");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gray-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-600 text-white dark:text-gray-900 dark:hover:text-white text-xs font-bold transition shadow-md cursor-pointer group"
          >
            <span>Ver Catálogo Completo (330+ Itens)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Gaveta de Filtro */}
        {showFilterDrawer && (
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">Filtrar por Faixa de Preço Máximo</span>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="flex-1 accent-blue-600"
              />
              <span className="text-xs font-mono font-black text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                Até R$ {priceRange.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setPriceRange(1000)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* ========================================================
            5. GRADE / LISTA DE PRODUTOS COM TRANSIÇÃO EM ONDA (STAGGERED)
            Na Home (TODOS), limita aos 8 melhores produtos para manter a página rápida e focada.
            Em departamento específico, mostra os 4 melhores com botão "Ver mais".
        ======================================================== */}
        <AnimatePresence mode="wait">
          <StaggeredGrid
            key={`${selectedCategory}-${sortBy}-${viewMode}-${quickFilter}`}
            className={`grid gap-4 ${viewMode === "GRID"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-5xl mx-auto"
              }`}
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-14 text-center space-y-3 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                  <Filter className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="text-base font-black text-gray-900 dark:text-white">
                  Nenhum produto encontrado com este filtro
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Tente selecionar outro critério de busca ou redefinir para todos os produtos.
                </p>
                <button
                  onClick={() => setQuickFilter("ALL")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-md transition"
                >
                  Ver todos os produtos
                </button>
              </div>
            ) : (
              (isGamerMode
                ? filteredProducts.slice(0, 8)
                : selectedCategory !== "TODOS"
                ? filteredProducts.slice(0, 4)
                : quickFilter === "ALL"
                  ? filteredProducts.slice(0, 8)
                  : filteredProducts.slice(0, 16)
              ).map((product) => (
                <ProductCardClean key={product.id} product={product} viewMode={viewMode} />
              ))
            )}
          </StaggeredGrid>
        </AnimatePresence>

        {/* Banner CTA para Modo Gamer (quando houver mais de 8 produtos) */}
        {isGamerMode && filteredProducts.length > 8 && (
          <div className="pt-6 pb-2 flex flex-col items-center justify-center relative z-10">
            <div className="w-full max-w-4xl rounded-3xl bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-slate-950/90 p-6 sm:p-8 text-white shadow-2xl border border-purple-500/40 text-center space-y-3 relative overflow-hidden backdrop-blur-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-purple-400/30">
                <Gamepad2 className="w-3.5 h-3.5 text-cyan-300" /> PlayTech Arcade Universe
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Gostou dessa seleção gamer? Temos mais {filteredProducts.length - 8} modelos e acessórios esperando por você!
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/80 max-w-lg mx-auto">
                Game Sticks 4K, consoles retrô clássicos e controles sem fio para PC, PS4, Switch e Smartphone com nota fiscal e garantia total.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedProductForDetail(null);
                    useStore.getState().setActiveView("CATALOG");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-sm inline-flex items-center gap-2 shadow-xl shadow-purple-600/30 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Explorar Catálogo Gamer Completo ({filteredProducts.length} itens)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Banner CTA para Explorar o Catálogo Completo quando estiver na Home (TODOS) */}
        {selectedCategory === "TODOS" && filteredProducts.length > 8 && (
          <div className="pt-8 pb-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/20 text-center space-y-4 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" /> Estoque Oficial PlayTech
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Gostou dessa seleção? Temos mais {filteredProducts.length - 8} produtos esperando por você!
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
                Explore nosso catálogo completo com mais de 300 itens importados: projetores, fones, smartwatches, gadgets gamer e automotivos com garantia de 1 ano e envio expresso.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedProductForDetail(null);
                    useStore.getState().setActiveView("CATALOG");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-white text-blue-600 hover:bg-gray-100 active:scale-95 font-black text-sm inline-flex items-center gap-2 shadow-lg transition-all cursor-pointer group"
                >
                  <span>Explorar Catálogo Completo ({filteredProducts.length} itens)</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botão de Destaque para abrir a página completa do departamento */}
        {selectedCategory !== "TODOS" && !isGamerMode && filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-2">
            <button
              onClick={() => setIsViewingFullDepartment(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 transition-all group cursor-pointer"
            >
              <span>Ver mais produtos dessa categoria ({filteredProducts.length} itens)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Nenhum produto encontrado com os filtros atuais.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("TODOS");
                setSearchQuery("");
                setPriceRange(1000);
              }}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
        </div>
      </section>

      {/* ========================================================
          6. SHOWCASES TEMÁTICOS DE DEPARTAMENTOS (CONFORME OS PRINTS)
      ======================================================== */}
      {selectedCategory === "TODOS" && <ThematicCategoryShowcases />}

      {/* ========================================================
          7. DEPOIMENTOS REAIS DE CLIENTES (SOCIAL PROOF - IDEIA 9)
      ======================================================== */}
      {selectedCategory === "TODOS" && <CustomerReviewsShowcase />}

      {/* ========================================================
          8. BARRA FLUTUANTE DE COMPRA RÁPIDA (IDEIA 1)
      ======================================================== */}
      <StickyAddToCartBar />
    </div>
  );
}
