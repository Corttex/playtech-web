"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Check, Eye, Scale, Play, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { fadeUpVariant, delayedPopVariant } from "@/lib/animation-variants";
import ProtectedProductImage from "./ProtectedProductImage";

interface ProductCardCleanProps {
  product: Product;
  viewMode?: "GRID" | "LIST";
}

export default function ProductCardClean({ product, viewMode = "GRID" }: ProductCardCleanProps) {
  const {
    blackFridayMode,
    addToCart,
    setSelectedProductForDetail,
    addToCompare,
    comparedProducts,
    setDemoModalProduct
  } = useStore();
  const [isFav, setIsFav] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isCompared = comparedProducts.some((p) => p.id === product.id);
  const activePrice = blackFridayMode ? product.bfSalePrice : product.baseSalePrice;
  const pixSavings = Math.max(15, product.compareAtPrice - activePrice);
  const discountPercent = Math.round(
    ((product.compareAtPrice - activePrice) / product.compareAtPrice) * 100
  );
  const installment12x = (activePrice / 12).toFixed(2);
  const buyersCount = 14 + (product.sku.charCodeAt(0) % 25);

  const handleAddWithFeedback = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // MODO LISTA COMPACTA
  if (viewMode === "LIST") {
    return (
      <motion.div
        variants={fadeUpVariant}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        onClick={() => setSelectedProductForDetail(product)}
        className="product-card group rounded-2xl p-3 sm:p-4 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-md border border-gray-200 dark:border-gray-700"
      >
        {/* Imagem Compacta com Protetor Anti-Download */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-600">
          <ProtectedProductImage
            src={product.imageUrl}
            alt={product.storefrontTitle}
            aspectClass="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute top-2 left-2 text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded-full shadow-xs z-30">
            -{discountPercent}%
          </span>
        </div>

        {/* Informações Centrais */}
        <div className="flex-1 min-w-0 space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {product.category}
            </span>
            {product.badge && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {product.badge}
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug truncate group-hover:text-blue-600 transition-colors">
            {product.storefrontTitle}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 hidden sm:block">
            {product.shortHeadline || "Dispositivo importado com garantia de 1 ano, Nota Fiscal e envio expresso."}
          </p>

          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            ✓ Em estoque &bull; Envio Imediato
          </div>
        </div>

        {/* Preços e Ações */}
        <motion.div
          variants={delayedPopVariant}
          className="flex flex-col items-center sm:items-end justify-center gap-2 shrink-0 sm:pl-4 sm:border-l border-gray-100 dark:border-gray-700 w-full sm:w-auto"
        >
          <div className="text-center sm:text-right">
            <span className="text-xs text-gray-400 dark:text-gray-500 line-through block">
              R$ {product.compareAtPrice.toFixed(2)}
            </span>
            <div className="flex items-baseline gap-1 justify-center sm:justify-end">
              <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                R$ {activePrice.toFixed(2)}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">no PIX</span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 block">
              ou 12x de R$ {installment12x} sem juros
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setIsFav(!isFav); }}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:text-red-500 text-gray-400 transition"
              title="Salvar na Lista de Desejos"
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button
              type="button"
              onClick={handleAddWithFeedback}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
                justAdded
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {justAdded ? (
                <><Check className="w-4 h-4" /> Adicionado!</>
              ) : (
                <><ShoppingCart className="w-4 h-4" /> Comprar</>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // MODO GRADE PADRÃO COM PROTEÇÃO DE IMAGEM
  return (
    <motion.div
      variants={fadeUpVariant}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={() => setSelectedProductForDetail(product)}
      className="product-card group rounded-2xl flex flex-col cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
    >
      {/* 1. Imagem com Escudo Anti-Pirataria e Marca d'Água do Favicon (100% de preenchimento até as bordas) */}
      <div className="relative bg-gray-50 dark:bg-gray-700 aspect-square flex items-center justify-center overflow-hidden">
        <ProtectedProductImage
          src={product.imageUrl}
          alt={product.storefrontTitle}
          aspectClass="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge de desconto */}
        <span className="absolute top-2.5 left-2.5 badge-discount z-30">
          -{discountPercent}%
        </span>

        {/* Badge Black Friday */}
        {blackFridayMode && (
          <span className="absolute top-2.5 right-10 text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full z-30">
            🔥 PROMO
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsFav(!isFav); }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600 text-gray-400 hover:text-red-500 transition z-30"
          title="Favoritar"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Comparar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCompare(product);
          }}
          className={`absolute top-2 right-9 p-1.5 rounded-full shadow-sm border transition z-30 cursor-pointer ${
            isCompared
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-400 hover:text-blue-600 border-gray-200 dark:border-gray-600"
          }`}
          title={isCompared ? "Produto no comparador" : "Adicionar ao Comparador"}
        >
          <Scale className="w-3.5 h-3.5" />
        </button>

        {/* Overlay "Ver Detalhes" */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20 pointer-events-none">
          <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
            <Eye className="w-3.5 h-3.5" /> Ver Detalhes
          </span>
        </div>
      </div>

      {/* 2. Textos do Card */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 block truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
              <Flame className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              <span>{buyersCount} hoje</span>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.storefrontTitle}
          </h3>
          {(product.category.includes("Projetor") || product.category.includes("Game") || product.category.includes("Smartwatch")) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDemoModalProduct(product);
              }}
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-blue-600 text-blue-600" /> Ver em funcionamento
            </button>
          )}
        </div>

        {/* Badge tag do produto */}
        {product.badge && (
          <span className="badge-tag w-fit">{product.badge}</span>
        )}

        {/* 3. Preços e Botões */}
        <motion.div variants={delayedPopVariant} className="mt-auto space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-400 dark:text-gray-500 line-through">
                R$ {product.compareAtPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-xl font-black text-gray-900 dark:text-white">
                R$ {activePrice.toFixed(2)}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium ml-1.5">
                no PIX
              </span>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
              <span>Economize R$ {pixSavings.toFixed(2)} à vista</span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
              ou 12x de R$ {installment12x} sem juros
            </span>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setSelectedProductForDetail(product); }}
              className="btn-outline py-2 rounded-lg text-xs font-semibold text-center"
            >
              Detalhes
            </button>
            <button
              type="button"
              onClick={handleAddWithFeedback}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 ${
                justAdded
                  ? "bg-green-500 text-white"
                  : "btn-buy"
              }`}
            >
              {justAdded ? (
                <><Check className="w-3.5 h-3.5" /> Adicionado!</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> Comprar</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
