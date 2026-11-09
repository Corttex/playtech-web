"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Tv, Sparkles, Check, ShoppingCart, Volume2, Maximize2, Shield } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function ProductDemoModal() {
  const { demoModalProduct, setDemoModalProduct, addToCart, blackFridayMode } = useStore();
  const [activeTab, setActiveTab] = useState<"CINEMA" | "GAMES" | "APPS">("CINEMA");

  if (!demoModalProduct) return null;

  const activePrice = blackFridayMode
    ? demoModalProduct.bfSalePrice
    : demoModalProduct.baseSalePrice;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDemoModalProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="relative w-full max-w-4xl bg-gray-950 border border-blue-500/30 text-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center">
                <Play className="w-4 h-4 fill-blue-400" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                  Demonstração em Funcionamento
                </span>
                <h3 className="text-sm sm:text-lg font-black truncate max-w-md">
                  {demoModalProduct.storefrontTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setDemoModalProduct(null)}
              className="p-2 rounded-xl text-gray-400 hover:text-white bg-gray-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Display de Demonstração Interativo */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-2xl group">
              {activeTab === "CINEMA" && (
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80"
                  alt="Cinema em Casa 150 Polegadas"
                  className="w-full h-full object-cover animate-in fade-in duration-500"
                />
              )}
              {activeTab === "GAMES" && (
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80"
                  alt="Modo Jogos e Emuladores 60FPS"
                  className="w-full h-full object-cover animate-in fade-in duration-500"
                />
              )}
              {activeTab === "APPS" && (
                <img
                  src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&auto=format&fit=crop&q=80"
                  alt="Android TV com Apps Nativos"
                  className="w-full h-full object-cover animate-in fade-in duration-500"
                />
              )}

              {/* Overlays informativos */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    {activeTab === "CINEMA" ? "Projeção até 150\"" : activeTab === "GAMES" ? "Latência Ultra-Baixa" : "Android TV 11 Integrado"}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-200">
                    {activeTab === "CINEMA"
                      ? "Foco automático e correção trapezoidal automática em qualquer parede ou teto."
                      : activeTab === "GAMES"
                      ? "Conecte controles Bluetooth e jogue PS1, Super Nintendo e Arcade sem atraso."
                      : "Acesse Netflix, YouTube e Prime Video direto no aparelho sem precisar de cabos."}
                  </p>
                </div>
              </div>
            </div>

            {/* Controles de Modo Interativo */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveTab("CINEMA")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "CINEMA"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                🎬 Modo Cinema 150"
              </button>
              <button
                onClick={() => setActiveTab("GAMES")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "GAMES"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                🎮 Modo Jogos 60FPS
              </button>
              <button
                onClick={() => setActiveTab("APPS")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === "APPS"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                📱 Modo Apps Android TV
              </button>
            </div>

            {/* Destaques Técnicos Rápidos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase">Resolução</span>
                <p className="text-sm font-black text-white">4K Nativo Upscale</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase">Conexão</span>
                <p className="text-sm font-black text-white">Wi-Fi 6 + BT 5.0</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase">Giro</span>
                <p className="text-sm font-black text-white">180° Parede &amp; Teto</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase">Garantia</span>
                <p className="text-sm font-black text-emerald-400">1 Ano PlayTech</p>
              </div>
            </div>
          </div>

          {/* Footer com CTA */}
          <div className="p-4 sm:p-6 border-t border-gray-800 bg-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-400 uppercase block">Oferta Oficial</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  R$ {(activePrice * 0.95).toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-400">no PIX (-5%)</span>
                <span className="text-xs text-gray-500">ou 12x de R$ {(activePrice / 12).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(demoModalProduct);
                setDemoModalProduct(null);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Garantir o Meu Agora
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
