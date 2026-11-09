"use client";

import React, { useMemo } from "react";
import { ArrowRight, ShoppingCart, Tv, Lightbulb, Wrench, Utensils, Watch, Car, Zap, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { sectionFadeVariant, fadeUpVariant, staggerContainer } from "@/lib/animation-variants";
import { Product } from "@/types";
import ProtectedProductImage from "./ProtectedProductImage";

export default function ThematicCategoryShowcases() {
  const { setSelectedCategory, addToCart, setSelectedProductForDetail, products } = useStore();

  // Helper para buscar produto real do catálogo ou fallback inteligente
  const getProductBySkuOrTitle = (searchTerm: string, fallbackCategory?: string): Product | undefined => {
    return (
      products.find(
        (p) =>
          p.sku.toLowerCase() === searchTerm.toLowerCase() ||
          p.storefrontTitle.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (fallbackCategory
        ? products.find((p) => p.category.toLowerCase().includes(fallbackCategory.toLowerCase()))
        : undefined)
    );
  };

  // 1. PROJETOR PRINCIPAL (HY320)
  const hy320 = useMemo(() => {
    return (
      products.find((p) => p.sku === "HY320-BLK") ||
      products.find((p) => p.storefrontTitle.toLowerCase().includes("hy320")) ||
      products.find((p) => p.category.includes("Projetores")) ||
      products[0]
    );
  }, [products]);

  // 2. ILUMINAÇÃO (5 PRODUTOS REAIS)
  const lightingProducts = useMemo(() => {
    const list = products.filter((p) => p.category === "Iluminação");
    if (list.length >= 5) return list.slice(0, 5);
    return products.slice(0, 5);
  }, [products]);

  // 3. FERRAMENTAS E UTILIDADES (5 PRODUTOS REAIS)
  const toolProducts = useMemo(() => {
    const desiredSkus = ["PTHC2431", "MINI-087123", "FTW-01", "KC-31", "XM-5S2P"];
    const found = desiredSkus
      .map((sku) => products.find((p) => p.sku === sku))
      .filter(Boolean) as Product[];

    if (found.length < 5) {
      const rest = products.filter(
        (p) => p.category.includes("Casa") && !found.some((f) => f.id === p.id)
      );
      return [...found, ...rest].slice(0, 5);
    }
    return found;
  }, [products]);

  // 4. COZINHA E UTENSÍLIOS (5 PRODUTOS REAIS)
  const kitchenProducts = useMemo(() => {
    const desiredSkus = ["ML-USB380", "CZJ001", "KA-9038", "GL228", "GB-560-VACUUM"];
    const found = desiredSkus
      .map((sku) => products.find((p) => p.sku === sku))
      .filter(Boolean) as Product[];

    if (found.length < 5) {
      const rest = products.filter(
        (p) => p.category.includes("Casa") && !found.some((f) => f.id === p.id)
      );
      return [...found, ...rest].slice(0, 5);
    }
    return found;
  }, [products]);

  // 5. SMARTWATCHES (4 PRODUTOS REAIS)
  const smartwatchProducts = useMemo(() => {
    const list = products.filter(
      (p) =>
        p.category === "Smartwatches" ||
        p.storefrontTitle.toLowerCase().includes("smartwatch") ||
        p.storefrontTitle.toLowerCase().includes("hw9") ||
        p.storefrontTitle.toLowerCase().includes("hw68")
    );
    if (list.length >= 4) return list.slice(0, 4);
    return products.slice(0, 4);
  }, [products]);

  // 6. AUTOMOTIVO (5 PRODUTOS REAIS)
  const automotiveProducts = useMemo(() => {
    const list = products.filter((p) => p.category.includes("Automotivo"));
    if (list.length >= 5) return list.slice(0, 5);
    return products.slice(0, 5);
  }, [products]);

  // 7. CARREGADORES E CABOS (5 PRODUTOS REAIS)
  const chargerProducts = useMemo(() => {
    const list = products.filter((p) => p.category.includes("Carregadores"));
    if (list.length >= 5) return list.slice(0, 5);
    return products.slice(0, 5);
  }, [products]);

  // Componente de Card Reutilizável com Preenchimento 100% da Foto e Clique Total para Abrir Detalhes
  const ShowcaseProductCard = ({ product }: { product: Product }) => {
    return (
      <div
        onClick={() => setSelectedProductForDetail(product)}
        className="bg-white dark:bg-gray-800 rounded-2xl flex flex-col justify-between overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      >
        {/* Bloco da Imagem 100% preenchido até as bordas */}
        <div className="relative aspect-square w-full bg-gray-50 dark:bg-gray-700/50 overflow-hidden">
          <ProtectedProductImage
            src={product.imageUrl}
            alt={product.storefrontTitle}
            aspectClass="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 text-[9px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full z-30 shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Informações e Botão de Ação */}
        <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
          <div className="space-y-1">
            <h5
              className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              title={product.storefrontTitle}
            >
              {product.storefrontTitle}
            </h5>
            <span className="text-[10px] text-gray-400 block truncate">{product.category}</span>
            <span className="text-[10px] font-bold text-green-600 dark:text-green-400 block">✓ Em estoque</span>
            <div className="text-sm font-black text-gray-900 dark:text-white pt-0.5">
              R$ {product.baseSalePrice.toFixed(2)}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition active:scale-95 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Adicionar Ao Carrinho
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 my-8">

      {/* ========================================================
          BLOCO 1: OS MELHORES PROJETORES (SHOWCASE COM FOTO DE CINEMA)
          Fundo Esticado Full-Width com Ambient Glow Cinematográfico
      ======================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeVariant}
        className="w-full bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-gray-900/90 dark:via-gray-900 dark:to-gray-950 py-12 border-y border-gray-200/80 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              OS MELHORES PROJETORES
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Qualidade cinematográfica com Android TV 11 e resolução 4K em sua casa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Card Esquerdo: Imagem Cenográfica do Cinema e Apps */}
            <div
              onClick={() => setSelectedProductForDetail(hy320)}
              className="lg:col-span-8 rounded-2xl overflow-hidden relative shadow-md group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80"
                alt="Projetor HY320 em Uso"
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Cinema em Casa &bull; 150 Polegadas
                </span>
                <h3 className="text-lg sm:text-2xl font-black">
                  Netflix, YouTube, Prime Video e Canais Nativos sem precisar de TV Box
                </h3>
                <div className="pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory("Projetores & Câmeras");
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Tv className="w-3.5 h-3.5 text-blue-600" /> Ver Todos os Projetores &amp; Câmeras
                  </button>
                </div>
              </div>
            </div>

            {/* Card Direito: Produto em Destaque (HY320 Real 100% Clicável) */}
            <div
              onClick={() => setSelectedProductForDetail(hy320)}
              className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
            >
              <div className="relative aspect-square w-full bg-gray-50 dark:bg-gray-700/50 overflow-hidden">
                <ProtectedProductImage
                  src={hy320.imageUrl}
                  alt={hy320.storefrontTitle}
                  aspectClass="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full z-30 shadow-xs">
                  Original PlayTech
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {hy320.storefrontTitle}
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Projetores e Câmeras &bull; Bivolt Automático
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 font-bold pt-1">
                    ✓ Em estoque &bull; Envio Imediato
                  </div>
                  <div className="text-xl font-black text-gray-900 dark:text-white pt-1">
                    R$ {hy320.baseSalePrice.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(hy320);
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" /> Adicionar Ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          BLOCO 2: ILUMINAÇÃO (FAIXA NOTURNA FULL-WIDTH COM PRODUTOS REAIS)
      ======================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeVariant}
        className="w-full bg-[#080d1a] text-white py-14 border-y border-blue-900/40 relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-2xl font-black uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" /> ILUMINAÇÃO
            </h3>
            <button
              onClick={() => setSelectedCategory("Iluminação")}
              className="text-xs font-bold text-blue-300 hover:text-white bg-blue-900/40 hover:bg-blue-900/80 px-4 py-2 rounded-full transition inline-flex items-center gap-1.5 border border-blue-400/20 cursor-pointer"
            >
              Mais Produtos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {lightingProducts.map((product) => (
              <ShowcaseProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          BLOCO 3: FERRAMENTAS E UTILIDADES (PRODUTOS REAIS)
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionFadeVariant}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 space-y-6 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-600" /> FERRAMENTAS E UTILIDADES
            </h3>
            <button
              onClick={() => setSelectedCategory("Casa & Utensílios")}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1 cursor-pointer"
            >
              Mais Produtos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {toolProducts.map((product) => (
              <ShowcaseProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.section>
      </div>

      {/* ========================================================
          BLOCO 4: COZINHA E UTENSÍLIOS + SMARTWATCHES (FUNDO ESTICADO)
      ======================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeVariant}
        className="w-full bg-gradient-to-r from-emerald-950/15 via-teal-950/10 to-cyan-950/15 dark:from-emerald-950/30 dark:via-gray-900 dark:to-cyan-950/20 py-14 border-y border-emerald-500/20 shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Cozinha e Utensílios */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" /> COZINHA E UTENSÍLIOS
              </h3>
              <button
                onClick={() => setSelectedCategory("Casa & Utensílios")}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1 cursor-pointer"
              >
                Mais Produtos <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {kitchenProducts.map((product) => (
                <ShowcaseProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Sub-bloco Smartwatch */}
          <div className="space-y-4 pt-4 border-t border-emerald-500/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Watch className="w-5 h-5 text-blue-600" /> SMARTWATCHES
              </h3>
              <button
                onClick={() => setSelectedCategory("Smartwatches")}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1 cursor-pointer"
              >
                Mais Produtos <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              {smartwatchProducts.map((product) => (
                <ShowcaseProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================================
          BLOCO 5: AUTOMOTIVO E CARREGADORES & CABOS
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionFadeVariant}
          className="bg-gray-50 dark:bg-gray-800/40 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 space-y-8 shadow-xs"
        >
          {/* Automotivo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" /> AUTOMOTIVO
              </h3>
              <button
                onClick={() => setSelectedCategory("Automotivo e Acessórios")}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 hover:bg-gray-100 px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1 border border-gray-200 dark:border-gray-600 cursor-pointer"
              >
                Mais Produtos <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {automotiveProducts.map((product) => (
                <ShowcaseProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Carregadores e Cabos */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" /> CARREGADORES &amp; CABOS
              </h3>
              <button
                onClick={() => setSelectedCategory("Carregadores e Cabos")}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 hover:bg-gray-100 px-3.5 py-1.5 rounded-full transition inline-flex items-center gap-1 border border-gray-200 dark:border-gray-600 cursor-pointer"
              >
                Mais Produtos <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {chargerProducts.map((product) => (
                <ShowcaseProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </motion.section>
      </div>

    </div>
  );
}
