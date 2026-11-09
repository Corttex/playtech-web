"use client";

import React, { useState, useEffect } from "react";
import { Flame, ExternalLink, Sun, Moon } from "lucide-react";
import { useStore } from "@/store/useStore";
import PlayTechMotorolaHeader from "@/components/store/PlayTechMotorolaHeader";
import PlayTechFooterComplete from "@/components/store/PlayTechFooterComplete";
import StorefrontView from "@/components/store/StorefrontView";
import LandingPageView from "@/components/store/LandingPageView";
import SlideOverCartGamified from "@/components/store/SlideOverCartGamified";
import CheckoutView from "@/components/store/CheckoutView";
import PlayTechSplashScreen from "@/components/store/PlayTechSplashScreen";
import DepartmentCatalogPage from "@/components/store/DepartmentCatalogPage";
import CompleteCatalogPage from "@/components/store/CompleteCatalogPage";
import CartToastNotification from "@/components/store/CartToastNotification";
import FloatingComparePill from "@/components/store/FloatingComparePill";
import ProductComparisonModal from "@/components/store/ProductComparisonModal";
import ProductDemoModal from "@/components/store/ProductDemoModal";

export default function HomePage() {
  const {
    activeView,
    setActiveView,
    blackFridayMode,
    toggleBlackFridayMode,
    theme,
    toggleTheme,
    setTheme,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductForDetail,
    isProductLoading,
  } = useStore();

  const [isCheckout, setIsCheckout] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const match = document.cookie.match(/playtech_theme=(dark|light)/);
    if (match) setTheme(match[1] as "dark" | "light");
  }, [setTheme]);

  useEffect(() => {
    const handleHashChange = () => {
      setIsCheckout(window.location.hash === "#checkout");
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      {/* ── SPLASH SCREEN COM ABERTURA SUAVE (1.8s) ── */}
      {showSplash && (
        <PlayTechSplashScreen
          durationMs={1800}
          onFinish={() => setShowSplash(false)}
        />
      )}

      {/* ── MICRO-LOADING RÁPIDO AO CLICAR EM PRODUTOS (280ms) ── */}
      {isProductLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
            <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-black text-gray-800 dark:text-gray-200 uppercase tracking-wider">
              Carregando produto...
            </span>
          </div>
        </div>
      )}

      {/* ── HEADER MOTOROLA ── */}
      {!isCheckout && <PlayTechMotorolaHeader />}

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <main className="w-full">
        {isCheckout ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <CheckoutView
              onBack={() => {
                setIsCheckout(false);
                window.location.hash = "";
              }}
            />
          </div>
        ) : activeView === "CATALOG" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <CompleteCatalogPage />
          </div>
        ) : activeView === "DEPARTMENT" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <DepartmentCatalogPage
              category={selectedCategory}
              onBack={() => {
                setActiveView("STORE");
                setSelectedCategory("TODOS");
              }}
            />
          </div>
        ) : (
          !showSplash && <StorefrontView />
        )}
      </main>

      {/* ── RODAPÉ ── */}
      {!isCheckout && <PlayTechFooterComplete />}

      <SlideOverCartGamified />
      <CartToastNotification />
      <FloatingComparePill />
      <ProductComparisonModal />
      <ProductDemoModal />
    </div>
  );
}
