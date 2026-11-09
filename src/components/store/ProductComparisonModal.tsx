"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, Trash2, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function ProductComparisonModal() {
  const {
    comparedProducts,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    addToCart,
    blackFridayMode
  } = useStore();

  if (!isCompareModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCompareModalOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                PlayTech Comparador Técnico
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
                Comparação Lado a Lado ({comparedProducts.length} itens)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {comparedProducts.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="text-xs font-bold text-gray-400 hover:text-red-500 transition px-2.5 py-1 rounded-lg"
                >
                  Limpar tudo
                </button>
              )}
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white bg-gray-100 dark:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {comparedProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm font-bold text-gray-500">
                  Nenhum produto selecionado para comparação.
                </p>
                <p className="text-xs text-gray-400">
                  Clique no ícone de balança nos cards dos produtos para adicioná-los aqui!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparedProducts.map((p) => {
                  const activePrice = blackFridayMode ? p.bfSalePrice : p.baseSalePrice;
                  const pixDiscount = Math.round(activePrice * 0.05);
                  const pixPrice = activePrice - pixDiscount;

                  return (
                    <div
                      key={p.id}
                      className="rounded-2xl p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-4 relative"
                    >
                      {/* Botão Remover */}
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700 transition"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Imagem */}
                      <div className="aspect-square w-full max-h-44 bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700">
                        <img
                          src={p.imageUrl}
                          alt={p.storefrontTitle}
                          className="max-h-full object-contain"
                        />
                      </div>

                      {/* Título & Categoria */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {p.category}
                        </span>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white line-clamp-2 mt-0.5">
                          {p.storefrontTitle}
                        </h4>
                      </div>

                      {/* Preços e Economia PIX */}
                      <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-1">
                        <div className="text-[11px] text-gray-400 line-through">
                          R$ {p.compareAtPrice.toFixed(2)}
                        </div>
                        <div className="text-xl font-black text-gray-900 dark:text-white">
                          R$ {pixPrice.toFixed(2)}{" "}
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">no PIX</span>
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                          ✓ Economia de R$ {pixDiscount.toFixed(2)} à vista
                        </div>
                        <div className="text-[10px] text-gray-500">
                          ou 12x de R$ {(activePrice / 12).toFixed(2)} sem juros
                        </div>
                      </div>

                      {/* Especificações Técnicas */}
                      <div className="space-y-2 text-xs divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-gray-400">Garantia:</span>
                          <span className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> 1 Ano Oficial
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-gray-400">Voltagem:</span>
                          <span className="font-bold text-gray-800 dark:text-gray-200">
                            Bivolt Automático
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-gray-400">Envio:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Pronta Entrega
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-gray-400">Origem:</span>
                          <span className="font-bold text-gray-800 dark:text-gray-200">
                            Estoque Brasília-DF
                          </span>
                        </div>
                      </div>

                      {/* Botão Adicionar ao Carrinho */}
                      <button
                        onClick={() => {
                          addToCart(p);
                        }}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" /> Comprar Este
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
