"use client";

import React from "react";
import { Truck, ShieldCheck, Zap, Sparkles, ArrowRight, Gift, Percent, Clock } from "lucide-react";
import { useStore } from "@/store/useStore";

interface PromoMiniBannerProps {
  bannerIndex: number;
}

export default function PromoMiniBanner({ bannerIndex }: PromoMiniBannerProps) {
  const { toggleCart, setSelectedCategory, setActiveView } = useStore();

  const banners = [
    {
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      icon: Truck,
      badge: "LOGÍSTICA EXPRESSA",
      title: "Frete Grátis Destravado em Todo o Brasil",
      subtitle: "Compras a partir de R$ 250 com envio no mesmo dia e código de rastreamento direto no seu WhatsApp.",
      cta: "Aproveitar Frete Grátis",
      action: () => {
        setSelectedCategory("TODOS");
        setActiveView("STORE");
      },
    },
    {
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
      icon: Percent,
      badge: "ECONOMIA INSTANTÂNEA",
      title: "Desconto Exclusivo de 5% no PIX Instantâneo",
      subtitle: "Aprovação em segundos sem juros ou taxas extras. O menor preço garantido para seus gadgets.",
      cta: "Conferir Ofertas PIX",
      action: () => {
        setSelectedCategory("TODOS");
        setActiveView("STORE");
      },
    },
    {
      gradient: "from-amber-600 via-orange-600 to-red-600",
      icon: ShieldCheck,
      badge: "GARANTIA NACIONAL",
      title: "1 Ano de Garantia PlayTech + Troca Fácil em 7 Dias",
      subtitle: "Aparelhos 100% originais com Nota Fiscal Eletrônica emitida em seu nome e suporte técnico humanizado.",
      cta: "Ver Produtos Garantidos",
      action: () => {
        setSelectedCategory("TODOS");
        setActiveView("STORE");
      },
    },
    {
      gradient: "from-purple-700 via-fuchsia-600 to-pink-600",
      icon: Gift,
      badge: "CUPOM ESPECIAL",
      title: "Cupom PLAYTECH10 Ativo para Primeira Compra",
      subtitle: "Ganhe 10% de desconto adicional no carrinho e parcelamento facilitado em até 12x sem juros.",
      cta: "Abrir Meu Carrinho",
      action: () => {
        toggleCart(true);
      },
    },
  ];

  const current = banners[bannerIndex % banners.length];
  const Icon = current.icon;

  return (
    <div className="col-span-full my-3">
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${current.gradient} p-6 sm:p-8 text-white shadow-xl`}
      >
        {/* Elementos visuais de fundo */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden md:block">
          <Icon className="w-36 h-36 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-white">
              <Icon className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {current.subtitle}
            </p>
          </div>

          <button
            onClick={current.action}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-white text-gray-950 font-black text-xs sm:text-sm hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer group"
          >
            <span>{current.cta}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

