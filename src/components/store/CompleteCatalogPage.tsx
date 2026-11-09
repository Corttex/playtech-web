"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Filter,
  LayoutGrid,
  ListFilter,
  Search,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  Flame,
  X,
  ChevronDown,
  Layers,
  Check,
  Percent,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import ProductCardClean from "./ProductCardClean";
import StaggeredGrid from "../animations/StaggeredGrid";
import PromoMiniBanner from "./PromoMiniBanner";

export default function CompleteCatalogPage() {
  const { products, blackFridayMode, setActiveView, setSelectedProductForDetail } = useStore();

  // Estados dos Filtros
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"RELEVANCE" | "LOW_PRICE" | "HIGH_PRICE" | "DISCOUNT">("RELEVANCE");
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Paginação por botão "Ver mais": inicia com 12 e carrega de 4 em 4
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Categorias presentes no catálogo
  const allCategories = useMemo(() => {
    const setCats = new Set(products.map((p) => p.category));
    return ["TODAS", ...Array.from(setCats)];
  }, [products]);

  // Preço máximo no catálogo
  const maxCatalogPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    const max = Math.max(...products.map((p) => p.baseSalePrice));
    return Math.ceil(max / 100) * 100;
  }, [products]);

  // Filtragem completa
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const activePrice = blackFridayMode ? p.bfSalePrice : p.baseSalePrice;

        // Busca por título ou SKU
        const matchesSearch =
          searchFilter === "" ||
          p.storefrontTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.category.toLowerCase().includes(searchFilter.toLowerCase());

        // Categoria
        const matchesCat =
          selectedCategory === "TODAS" || p.category === selectedCategory;

        // Preço
        const matchesPrice = activePrice <= priceMax;

        // Promoções
        const matchesPromo =
          !onlyPromos || p.compareAtPrice > activePrice || p.isBlackFridayDeal;

        // Frete grátis (> R$ 250)
        const matchesShipping = !freeShippingOnly || activePrice >= 250;

        return (
          matchesSearch &&
          matchesCat &&
          matchesPrice &&
          matchesPromo &&
          matchesShipping
        );
      })
      .sort((a, b) => {
        const priceA = blackFridayMode ? a.bfSalePrice : a.baseSalePrice;
        const priceB = blackFridayMode ? b.bfSalePrice : b.baseSalePrice;

        if (sortBy === "LOW_PRICE") return priceA - priceB;
        if (sortBy === "HIGH_PRICE") return priceB - priceA;
        if (sortBy === "DISCOUNT") {
          const discA = (a.compareAtPrice - priceA) / a.compareAtPrice;
          const discB = (b.compareAtPrice - priceB) / b.compareAtPrice;
          return discB - discA;
        }
        return (b.bfSoldPercent || 0) - (a.bfSoldPercent || 0);
      });
  }, [products, searchFilter, selectedCategory, priceMax, onlyPromos, freeShippingOnly, sortBy, blackFridayMode]);

  // Produtos fatiados para exibição (inicia em 12)
  const paginatedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    // Carrega de 4 em 4
    setVisibleCount((prev) => Math.min(prev + 4, filteredProducts.length));
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      {/* ── BREADCRUMB & TOPO DO CATÁLOGO COMPLETO ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
        <div className="space-y-1">
          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-2">
            <button
              onClick={() => setActiveView("STORE")}
              className="inline-flex items-center gap-1 font-bold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Vitrine
            </button>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">Catálogo Completo</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
            <span>Catálogo Geral de Importados</span>
            <span className="text-xs font-normal normal-case px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
              {filteredProducts.length} itens encontrados
            </span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            Navegue por todo o estoque oficial da PlayTech Store com filtros avançados de busca, categorias, faixa de preço e frete grátis.
          </p>
        </div>

        {/* Toolbar de Visualização (Grade / Lista & Filtro Mobile) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filtros ({filteredProducts.length})</span>
          </button>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode("GRID")}
              className={`p-1.5 rounded-full transition cursor-pointer ${
                viewMode === "GRID"
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-xs"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Exibição em Grade"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`p-1.5 rounded-full transition cursor-pointer ${
                viewMode === "LIST"
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-xs"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              title="Exibição em Lista"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── LAYOUT PRINCIPAL: SIDEBAR DE FILTROS + GRADE DE PRODUTOS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================
            SIDEBAR DE FILTROS AVANÇADOS (lg:col-span-3)
        ======================================================== */}
        <motion.aside
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`space-y-6 bg-white dark:bg-gray-850 p-5 rounded-3xl border border-gray-200 dark:border-gray-750 shadow-sm ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          } lg:col-span-3`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filtros do Catálogo</span>
            </div>
            <button
              onClick={() => {
                setSearchFilter("");
                setSelectedCategory("TODAS");
                setPriceMax(maxCatalogPrice);
                setOnlyPromos(false);
                setFreeShippingOnly(false);
                setSortBy("RELEVANCE");
                setVisibleCount(12);
              }}
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Limpar
            </button>
          </div>

          {/* 1. Busca textual */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Buscar Produto / SKU
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Ex: Projetor, HY320, Fone..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-blue-500 transition"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Seleção de Categoria */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
              <span>Departamento</span>
              <span className="text-[10px] text-gray-400 font-normal">
                {allCategories.length - 1} disponíveis
              </span>
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
              {allCategories.map((cat) => {
                const count =
                  cat === "TODAS"
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(12);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="truncate">{cat === "TODAS" ? "Todos os Departamentos" : cat}</span>
                    <span className="text-[10px] opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Ordenação */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Ordenar Resultados
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white outline-none cursor-pointer"
            >
              <option value="RELEVANCE">Mais Relevantes (Mais Vendidos)</option>
              <option value="LOW_PRICE">Menor Preço Primeiro</option>
              <option value="HIGH_PRICE">Maior Preço Primeiro</option>
              <option value="DISCOUNT">Maiores Descontos (%)</option>
            </select>
          </div>

          {/* 4. Faixa de Preço */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Preço Máximo
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                Até R$ {priceMax.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max={maxCatalogPrice}
              step="10"
              value={priceMax}
              onChange={(e) => {
                setPriceMax(Number(e.target.value));
                setVisibleCount(12);
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>R$ 20</span>
              <span>R$ {maxCatalogPrice}</span>
            </div>
          </div>

          {/* 5. Checkboxes de Filtros Especiais */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyPromos}
                onChange={(e) => {
                  setOnlyPromos(e.target.checked);
                  setVisibleCount(12);
                }}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5 font-medium">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                Apenas em Oferta / Promoção
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeShippingOnly}
                onChange={(e) => {
                  setFreeShippingOnly(e.target.checked);
                  setVisibleCount(12);
                }}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-green-500" />
                Frete Grátis Destravado (&gt; R$ 250)
              </span>
            </label>
          </div>

          {/* 6. Selo de Confiança */}
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-gray-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Garantia PlayTech Brasil</span>
            </div>
            <p className="leading-snug">
              Produtos originais com envio imediato direto de Brasília-DF com Nota Fiscal Eletrônica.
            </p>
          </div>
        </motion.aside>

        {/* ========================================================
            CANTO DIREITO: GRADE COM PRODUTOS PAGINADOS (lg:col-span-9)
        ======================================================== */}
        <section className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-3">
              <Tag className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-base font-bold text-gray-800 dark:text-gray-200">
                Nenhum produto atende a estes critérios de busca no catálogo.
              </p>
              <button
                onClick={() => {
                  setSearchFilter("");
                  setSelectedCategory("TODAS");
                  setPriceMax(maxCatalogPrice);
                  setOnlyPromos(false);
                  setFreeShippingOnly(false);
                  setVisibleCount(12);
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Resetar Filtros
              </button>
            </div>
          ) : (
            <>
              {/* Contador de Exibição */}
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>
                  Exibindo <strong>{paginatedProducts.length}</strong> de{" "}
                  <strong>{filteredProducts.length}</strong> produtos
                </span>
                {hasMore && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    +{filteredProducts.length - paginatedProducts.length} itens a carregar
                  </span>
                )}
              </div>

              {/* Grade de Produtos com Mini Banners a cada 8 itens */}
              <AnimatePresence mode="wait">
                <StaggeredGrid
                  key={`catalog-${selectedCategory}-${sortBy}-${viewMode}-${paginatedProducts.length}`}
                  className={`grid gap-4 ${
                    viewMode === "GRID"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {(() => {
                    const elements: React.ReactNode[] = [];
                    paginatedProducts.forEach((prod, idx) => {
                      elements.push(
                        <ProductCardClean key={prod.id} product={prod} viewMode={viewMode} />
                      );

                      // Mini banner a cada 8 produtos para quebrar a monotonia
                      if ((idx + 1) % 8 === 0 && idx !== paginatedProducts.length - 1) {
                        const bannerIdx = Math.floor(idx / 8);
                        elements.push(
                          <PromoMiniBanner key={`catalog-mini-banner-${bannerIdx}`} bannerIndex={bannerIdx} />
                        );
                      }
                    });
                    return elements;
                  })()}
                </StaggeredGrid>
              </AnimatePresence>

              {/* Botão Ver Mais (+4 produtos por clique) */}
              {hasMore && (
                <div className="flex flex-col items-center justify-center gap-2 pt-8 pb-4">
                  <button
                    onClick={handleLoadMore}
                    className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-blue-500/25 transition-all cursor-pointer group"
                  >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span>Carregar Mais Produtos (+4)</span>
                  </button>
                  <p className="text-[11px] text-gray-400">
                    Mostrando {paginatedProducts.length} de {filteredProducts.length} itens disponíveis
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

