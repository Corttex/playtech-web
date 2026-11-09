"use client";

import React, { useState } from "react";
import { Home, Grid, ShoppingBag, User, Flame, Search } from "lucide-react";
import { useStore } from "@/store/useStore";
import CustomerAccountModal from "./CustomerAccountModal";

export default function MobileBottomDock() {
  const {
    activeView,
    setActiveView,
    setSelectedCategory,
    setSelectedProductForDetail,
    cart,
    toggleCart,
    blackFridayMode,
    toggleBlackFridayMode,
  } = useStore();

  const [showAccountModal, setShowAccountModal] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleGoHome = () => {
    setSelectedProductForDetail(null);
    setSelectedCategory("TODOS");
    setActiveView("STORE");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoCatalog = () => {
    setSelectedProductForDetail(null);
    setActiveView("CATALOG");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── BARRA DOCK FLUTUANTE INFERIOR MOBILE (md:hidden) ── */}
      <nav
        aria-label="Navegação mobile rápida"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/92 dark:bg-gray-900/92 backdrop-blur-lg border-t border-gray-200/80 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5 safe-area-pb"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. Início */}
          <button
            onClick={handleGoHome}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              activeView === "STORE"
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 tracking-tight">Início</span>
          </button>

          {/* 2. Catálogo Completo */}
          <button
            onClick={handleGoCatalog}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              activeView === "CATALOG"
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Grid className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 tracking-tight">Catálogo</span>
          </button>

          {/* 3. Carrinho de Compras (com Badge de Quantidade) */}
          <button
            onClick={() => toggleCart()}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">Carrinho</span>
          </button>

          {/* 4. Ofertas / Black Friday */}
          <button
            onClick={() => {
              toggleBlackFridayMode();
              handleGoHome();
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              blackFridayMode
                ? "text-red-500 font-bold animate-pulse"
                : "text-gray-500 dark:text-gray-400 hover:text-red-500"
            }`}
          >
            <Flame className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 tracking-tight">
              {blackFridayMode ? "Ofertas ON" : "Ofertas"}
            </span>
          </button>

          {/* 5. Minha Conta / Pedidos */}
          <button
            onClick={() => setShowAccountModal(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
          >
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] mt-0.5 tracking-tight">Conta</span>
          </button>
        </div>
      </nav>

      {/* Modal de Conta Aberto Diretamente via Dock Mobile */}
      <CustomerAccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </>
  );
}
