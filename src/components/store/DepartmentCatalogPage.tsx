"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Filter,
  LayoutGrid,
  ListFilter,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  Tag,
  ShieldCheck,
  Truck,
  Flame,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import ProductCardClean from "./ProductCardClean";
import StaggeredGrid from "../animations/StaggeredGrid";
import PromoMiniBanner from "./PromoMiniBanner";

interface DepartmentCatalogPageProps {
  category: string;
  onBack: () => void;
}

export default function DepartmentCatalogPage({
  category,
  onBack,
}: DepartmentCatalogPageProps) {
  const { products, blackFridayMode, setSelectedProductForDetail } = useStore();

  // Estados dos Filtros Laterais
  const [searchFilter, setSearchFilter] = useState("");
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [onlyInStock, setOnlyInStock] = useState(true);
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"RELEVANCE" | "LOW_PRICE" | "HIGH_PRICE" | "DISCOUNT">("RELEVANCE");
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Produtos exclusivos do departamento
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === category);
  }, [products, category]);

  // Faixa de preço máxima dinâmica baseada nos produtos da categoria
  const maxCategoryPrice = useMemo(() => {
    if (categoryProducts.length === 0) return 1000;
    const max = Math.max(...categoryProducts.map((p) => p.baseSalePrice));
    return Math.ceil(max / 100) * 100;
  }, [categoryProducts]);

  // Filtro completo refinado
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((p) => {
        const activePrice = blackFridayMode ? p.bfSalePrice : p.baseSalePrice;

        // Busca
        if (
          searchFilter &&
          !p.storefrontTitle.toLowerCase().includes(searchFilter.toLowerCase()) &&
          !p.sku.toLowerCase().includes(searchFilter.toLowerCase())
        ) {
          return false;
        }

        // Preço Máximo
        if (activePrice > priceMax) return false;

        // Apenas com Desconto / Promo
        if (onlyPromos) {
          const discount = ((p.compareAtPrice - activePrice) / p.compareAtPrice) * 100;
          if (discount < 10) return false;
        }

        // Frete Grátis (acima de R$ 250)
        if (freeShippingOnly && activePrice < 250) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = blackFridayMode ? a.bfSalePrice : a.baseSalePrice;
        const priceB = blackFridayMode ? b.bfSalePrice : b.baseSalePrice;

        if (sortBy === "LOW_PRICE") return priceA - priceB;
        if (sortBy === "HIGH_PRICE") return priceB - priceA;
        if (sortBy === "DISCOUNT") {
          const discA = ((a.compareAtPrice - priceA) / a.compareAtPrice);
          const discB = ((b.compareAtPrice - priceB) / b.compareAtPrice);
          return discB - discA;
        }
        return (b.bfSoldPercent || 0) - (a.bfSoldPercent || 0);
      });
  }, [categoryProducts, searchFilter, priceMax, onlyPromos, freeShippingOnly, sortBy, blackFridayMode]);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      {/* ── BREADCRUMB & TOPO DO DEPARTAMENTO ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="space-y-1">
          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 font-bold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Vitrine
            </button>
            <span>/</span>
            <span>Departamentos</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
            <span>{category}</span>
            <span className="text-xs font-normal normal-case px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
              {filteredProducts.length} {filteredProducts.length === 1 ? "produto" : "produtos"}
            </span>
          </h1>
        </div>

        {/* Toolbar de Visualização (Grade / Lista) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
          >
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filtros ({filteredProducts.length})</span>
          </button>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode("GRID")}
              className={`p-1.5 rounded-full transition ${
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
              className={`p-1.5 rounded-full transition ${
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

      {/* ── LAYOUT PRINCIPAL: FILTRO NO CANTO ESQUERDO + GRADE DE PRODUTOS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================
            CANTO ESQUERDO: BARRA LATERAL DE FILTROS COMPLETOS (lg:col-span-3)
        ======================================================== */}
        <motion.aside
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`lg:col-span-3 lg:sticky lg:top-24 space-y-5 bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm transition-all ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-gray-900 dark:text-white">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filtros do Departamento</span>
            </div>
            {(searchFilter || priceMax < maxCategoryPrice || onlyPromos || freeShippingOnly) && (
              <button
                onClick={() => {
                  setSearchFilter("");
                  setPriceMax(maxCategoryPrice);
                  setOnlyPromos(false);
                  setFreeShippingOnly(false);
                }}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Limpar
              </button>
            )}
          </div>

          {/* 1. Busca rápida dentro da categoria */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Buscar no departamento
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: modelo, cabo, bluetooth..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Ordenação */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="RELEVANCE">Mais Vendidos / Destaques</option>
              <option value="LOW_PRICE">Menor Preço</option>
              <option value="HIGH_PRICE">Maior Preço</option>
              <option value="DISCOUNT">Maior Desconto (%)</option>
            </select>
          </div>

          {/* 3. Faixa de Preço */}
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-700 dark:text-gray-300">Preço Máximo</span>
              <span className="font-mono font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                R$ {priceMax.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max={maxCategoryPrice}
              step="10"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>R$ 20,00</span>
              <span>R$ {maxCategoryPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* 4. Checkboxes Especiais */}
          <div className="space-y-2.5 border-t border-gray-100 dark:border-gray-700 pt-3 text-xs">
            <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
              Benefícios e Ofertas
            </span>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyPromos}
                onChange={(e) => setOnlyPromos(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5 font-medium">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                Apenas em Oferta / Desconto
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeShippingOnly}
                onChange={(e) => setFreeShippingOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-green-500" />
                Frete Grátis Destravado (&gt; R$ 250)
              </span>
            </label>
          </div>

          {/* 5. Selo de Confiança */}
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-gray-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Garantia PlayTech Brasil</span>
            </div>
            <p className="leading-snug">
              Produtos originais com envio imediato direto de Brasília-DF com Nota Fiscal.
            </p>
          </div>
        </motion.aside>

        {/* ========================================================
            CANTO DIREITO: GRADE COM TODOS OS PRODUTOS (lg:col-span-9)
        ======================================================== */}
        <section className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-3">
              <Tag className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-base font-bold text-gray-800 dark:text-gray-200">
                Nenhum produto atende a estes filtros no departamento {category}.
              </p>
              <button
                onClick={() => {
                  setSearchFilter("");
                  setPriceMax(maxCategoryPrice);
                  setOnlyPromos(false);
                  setFreeShippingOnly(false);
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Resetar Filtros
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <StaggeredGrid
                key={`${category}-${sortBy}-${viewMode}-${filteredProducts.length}`}
                className={`grid gap-4 ${
                  viewMode === "GRID"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {(() => {
                  const elements: React.ReactNode[] = [];
                  filteredProducts.forEach((prod, idx) => {
                    elements.push(
                      <ProductCardClean key={prod.id} product={prod} viewMode={viewMode} />
                    );

                    // A cada 8 produtos, insere um Mini Banner para quebrar o padrão
                    if ((idx + 1) % 8 === 0 && idx !== filteredProducts.length - 1) {
                      const bannerIdx = Math.floor(idx / 8);
                      elements.push(
                        <PromoMiniBanner key={`dept-mini-banner-${bannerIdx}`} bannerIndex={bannerIdx} />
                      );
                    }
                  });
                  return elements;
                })()}
              </StaggeredGrid>
            </AnimatePresence>
          )}
        </section>
      </div>
    </div>
  );
}

