"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  X,
  Tag,
  Gift,
  Truck
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { staggerContainer, delayedPopVariant } from "@/lib/animation-variants";

const drawerVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 220,
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.28, ease: "easeInOut" },
  },
};

const cartItemVariants: Variants = {
  hidden: { x: 25, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SlideOverCartGamified() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    orderBumps,
    addToCart,
    freeShippingThreshold,
    blackFridayMode,
    setActiveView,
  } = useStore();

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0),
    [cart]
  );

  // Economia total calculada comparando o preço original compareAtPrice
  const totalSavings = useMemo(() => {
    return cart.reduce((acc, item) => {
      const orig = (item.product as any).compareAtPrice || item.selectedPrice * 1.3;
      return acc + Math.max(0, orig - item.selectedPrice) * item.quantity;
    }, 0);
  }, [cart]);

  // Gamificação em 2 níveis: R$ 199 Frete Grátis + R$ 350 Brinde VIP
  const freeGiftThreshold = 350;
  const freeShippingUnlocked = cartSubtotal >= freeShippingThreshold;
  const freeGiftUnlocked = cartSubtotal >= freeGiftThreshold;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const missingForGift = Math.max(0, freeGiftThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeGiftThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay Escuro com Fade Suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Gaveta Lateral Deslizante */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-l border-gray-200 dark:border-gray-700 h-full flex flex-col justify-between p-6 shadow-2xl overflow-hidden"
          >
            {/* Top Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  Seu Carrinho PlayTech
                </h3>
                <button
                  onClick={() => toggleCart(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                  title="Fechar carrinho"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Barra de Progresso Dupla Gamificada (Frete Grátis + Brinde) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {freeGiftUnlocked ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-emerald-500" /> FRETE GRÁTIS + BRINDE DESTRAVADOS!
                      </span>
                    ) : freeShippingUnlocked ? (
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-emerald-500" /> Frete Grátis OK! Faltam R$ {missingForGift.toFixed(2)} p/ Brinde
                      </span>
                    ) : (
                      <>
                        Faltam <strong className="text-blue-600 dark:text-blue-400">R$ {missingForFreeShipping.toFixed(2)}</strong> para Frete Grátis
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    R$ {cartSubtotal.toFixed(2)} / R$ {freeGiftThreshold}
                  </span>
                </div>

                {/* Trilho Duplo */}
                <div className="relative w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${freeGiftUnlocked
                      ? "bg-gradient-to-r from-blue-500 to-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                      : freeShippingUnlocked
                        ? "bg-blue-600"
                        : "bg-blue-500"
                      }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Marcadores */}
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold pt-0.5">
                  <span className={`flex items-center gap-0.5 ${freeShippingUnlocked ? "text-emerald-600 font-black" : ""}`}>
                    {freeShippingUnlocked ? "✓" : "○"} Frete Grátis (R$ {freeShippingThreshold.toFixed(0)})
                  </span>
                  <span className={`flex items-center gap-0.5 ${freeGiftUnlocked ? "text-emerald-600 font-black" : ""}`}>
                    {freeGiftUnlocked ? "✓" : "○"} Brinde VIP (R$ {freeGiftThreshold.toFixed(0)})
                  </span>
                </div>
              </div>
            </div>

            {/* Itens do Carrinho com Animação em Cascata */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto my-4 space-y-3 pr-1"
            >
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-sm">Seu carrinho está vazio.</p>
                  <button
                    onClick={() => toggleCart(false)}
                    className="text-xs text-blue-600 dark:text-blue-400 underline font-bold cursor-pointer"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cartItemVariants}
                    layout
                    className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {item.product.storefrontTitle}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                          R$ {item.selectedPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase">cada</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                          title="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition cursor-pointer"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}

              {/* ORDER BUMP */}
              {!freeShippingUnlocked && cart.length > 0 && (
                <motion.div
                  variants={cartItemVariants}
                  className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 space-y-3"
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 dark:text-amber-300">
                    <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>DICA: Adicione 1 item e destrave Frete Grátis</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400">
                    Em vez de pagar frete avulso, adicione um acessório útil:
                  </p>

                  <div className="space-y-2">
                    {orderBumps.map((bump) => {
                      const bumpPrice = blackFridayMode ? bump.bfSalePrice : bump.baseSalePrice;
                      return (
                        <div
                          key={bump.id}
                          className="flex items-center justify-between bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex-1 pr-2">
                            <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                              {bump.storefrontTitle}
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400 font-bold mt-0.5">
                              + R$ {bumpPrice.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(bump, true)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-black text-xs transition active:scale-95 shrink-0 cursor-pointer"
                          >
                            + Adicionar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={delayedPopVariant}
              className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Frete:</span>
                  <span className={freeShippingUnlocked ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-gray-700 dark:text-gray-300"}>
                    {freeShippingUnlocked ? "GRÁTIS (Destravado!)" : "Calculado no Checkout"}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 rounded-xl flex items-center justify-between border border-emerald-200/50 dark:border-emerald-800/40">
                    <span>Economia total no pedido:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      R$ {totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm items-baseline pt-1">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Subtotal:</span>
                  <div className="text-right">
                    <span className="font-black text-2xl text-gray-900 dark:text-white">
                      R$ {cartSubtotal.toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      com desconto no PIX
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  toggleCart(false);
                  setActiveView("STORE");
                  window.location.hash = "#checkout";
                }}
                disabled={cart.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition cursor-pointer"
              >
                Finalizar Pedido
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Compra 100% Segura • Garantia PlayTech Brasil</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
