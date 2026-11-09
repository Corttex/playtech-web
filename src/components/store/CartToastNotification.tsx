"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function CartToastNotification() {
  const { cartToast, setCartToast, toggleCart } = useStore();

  useEffect(() => {
    if (cartToast) {
      const timer = setTimeout(() => {
        setCartToast(null);
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [cartToast, setCartToast]);

  return (
    <AnimatePresence>
      {cartToast && (
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed top-20 right-4 sm:right-6 z-[9999] max-w-sm w-full bg-white dark:bg-gray-900 border border-emerald-500/30 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3"
        >
          {/* Imagem do Produto ou Ícone */}
          <div className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
            {cartToast.imageUrl ? (
              <img
                src={cartToast.imageUrl}
                alt={cartToast.productTitle}
                className="w-full h-full object-contain"
              />
            ) : (
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
          </div>

          {/* Textos */}
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              ✓ Adicionado ao carrinho
            </span>
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {cartToast.productTitle}
            </p>
            <span className="text-xs font-black text-gray-900 dark:text-gray-100">
              R$ {cartToast.productPrice.toFixed(2)}
            </span>
          </div>

          {/* Botão Ver Carrinho */}
          <button
            onClick={() => {
              setCartToast(null);
              toggleCart(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shrink-0 flex items-center gap-1 shadow-xs transition cursor-pointer"
          >
            <span>Ver</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Fechar */}
          <button
            onClick={() => setCartToast(null)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
