"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap, Check } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";

interface StickyAddToCartBarProps {
  product?: Product | null;
}

export default function StickyAddToCartBar({ product }: StickyAddToCartBarProps) {
  const { products, addToCart, blackFridayMode, selectedProductForDetail } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);

  // Produto alvo: ou o passado via prop, ou o selecionado em detalhe, ou o HY320 de destaque
  const activeProduct =
    product ||
    selectedProductForDetail ||
    products.find((p) => p.sku === "HY320-BLK") ||
    products[0];

  useEffect(() => {
    const handleScroll = () => {
      // Exibe a barra após rolar 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!activeProduct) return null;

  const activePrice = blackFridayMode
    ? activeProduct.bfSalePrice
    : activeProduct.baseSalePrice;
  const pixPrice = activePrice * 0.95;

  const handleBuy = () => {
    addToCart(activeProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-4 py-3"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Esquerda: Miniatura + Nome */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 p-1 flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.storefrontTitle}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block truncate">
                  {activeProduct.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {activeProduct.storefrontTitle}
                </h4>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hidden sm:inline">
                  ✓ Estoque em Brasília &bull; Envio Imediato Sedex
                </span>
              </div>
            </div>

            {/* Direita: Preços + Botão de 1-Clique */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-base sm:text-xl font-black text-gray-900 dark:text-white">
                    R$ {pixPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">no PIX</span>
                </div>
                <span className="text-[10px] text-gray-400 block">
                  ou 12x de R$ {(activePrice / 12).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleBuy}
                className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Comprar Agora</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
