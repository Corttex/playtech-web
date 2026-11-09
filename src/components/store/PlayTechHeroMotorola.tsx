"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { staggerContainer } from "@/lib/animation-variants";

export default function PlayTechHeroMotorola() {
  const {
    setSelectedCategory,
    blackFridayMode,
    heroSlides,
    secondaryBanners,
  } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [];
  const currentSlide = slides[activeSlide] || slides[0];

  // Autoplay do carrossel principal a cada 5.5s
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, isPaused]);

  if (!currentSlide) return null;

  return (
    <section className="w-full select-none my-2">
      {/* Grid Bento Flagship com Entrada em Cascata Staggered */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch"
      >
        {/* ========================================================
            CARD 1 (ESQUERDA - DESTAQUE GRANDE COM CARROSSEL DE 3+ SLIDES)
            lg:col-span-6 / h-full
            Imagem 100% cobrindo o container com gradiente protetor do texto
        ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`lg:col-span-6 relative rounded-3xl overflow-hidden bg-gray-950 p-6 sm:p-10 flex flex-col justify-between min-h-[380px] sm:min-h-[460px] shadow-xl text-white group transition-all duration-500 ${
            blackFridayMode ? "bf-glow-border" : "border border-gray-200/20 dark:border-white/10"
          }`}
        >
          {/* Imagem de Fundo 100% Cobrindo o Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id || activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradiente Protetor Inteligente:
              Escuro e denso do lado esquerdo (onde fica o texto e botões)
              e translúcido no lado direito para revelar o produto */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/85 md:via-gray-950/70 to-transparent/30 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-black/20 pointer-events-none z-10" />

          {/* Conteúdo Superior com Informações e CTA */}
          <div className="relative z-20 max-w-sm sm:max-w-md space-y-3.5">
            {currentSlide.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {currentSlide.badge}
              </span>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id || activeSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
                className="space-y-2.5"
              >
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight uppercase drop-shadow-md">
                  {currentSlide.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-sm drop-shadow-sm font-medium">
                  {currentSlide.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCategory(currentSlide.category)}
                className={`px-6 py-3 rounded-2xl font-black text-xs transition-all shadow-xl active:scale-95 inline-flex items-center gap-2 cursor-pointer ${
                  currentSlide.btnClass || "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                <span>{currentSlide.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controles do Carrossel Inferior (Pill com bolinhas e setas) */}
          <div className="relative z-20 flex items-center justify-between pt-6 border-t border-white/15 mt-6">
            {/* Indicadores de Slide */}
            <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10 shadow-lg">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? "w-7 bg-white shadow-xs"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Setas Anterior / Próximo e Pause indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/10 cursor-pointer active:scale-90"
                aria-label="Slide anterior"
                title="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/10 cursor-pointer active:scale-90"
                aria-label="Próximo slide"
                title="Próximo slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            COLUNA DIREITA (3 CARDS COM IMAGENS 100% FULL-BLEED)
            lg:col-span-6
        ======================================================== */}
        <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4 justify-between">
          
          {/* CARD 2: FONES DE OUVIDO (AZUL COM FOTO 100% COBRINDO O CONTAINER) */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            onClick={() => setSelectedCategory(secondaryBanners.headphones.category)}
            className={`relative rounded-3xl overflow-hidden bg-blue-950 text-white p-6 sm:p-8 flex items-center justify-between min-h-[190px] sm:min-h-[215px] shadow-lg cursor-pointer group transition-all duration-500 ${
              blackFridayMode ? "bf-glow-border" : "border border-blue-500/20"
            }`}
          >
            {/* Imagem 100% Cobrindo o Fundo */}
            <img
              src={secondaryBanners.headphones.image}
              alt={secondaryBanners.headphones.title}
              className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />

            {/* Gradiente Azul Escuro Protegendo o Texto no Lado Esquerdo */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 sm:via-blue-900/65 to-transparent/20 pointer-events-none z-10" />

            {/* Texto e Botão */}
            <div className="relative z-20 max-w-xs space-y-2">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight drop-shadow-md">
                {secondaryBanners.headphones.title}
              </h3>
              <p className="text-xs text-blue-100 font-medium drop-shadow-sm">
                {secondaryBanners.headphones.desc}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition border border-white/20 shadow-md flex items-center gap-1.5"
                >
                  <span>{secondaryBanners.headphones.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* GRID INFERIOR (2 CARDS LADO A LADO COM FOTOS 100% COBRINDO) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            
            {/* CARD 3: GAME STICK (FOTO 100% COBRINDO COM GRADIENTE ESCURO) */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              onClick={() => setSelectedCategory(secondaryBanners.gamestick.category)}
              className={`relative rounded-3xl overflow-hidden bg-slate-950 text-white p-5 flex flex-col justify-between min-h-[195px] sm:min-h-[220px] shadow-lg cursor-pointer group transition-all duration-500 ${
                blackFridayMode ? "bf-glow-border" : "border border-white/10"
              }`}
            >
              {/* Imagem 100% Cobrindo o Card */}
              <img
                src={secondaryBanners.gamestick.image}
                alt={secondaryBanners.gamestick.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />

              {/* Gradiente Protetor para Legibilidade Superior e Inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/50 pointer-events-none z-10" />

              <div className="relative z-20 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 drop-shadow-sm">
                  {secondaryBanners.gamestick.title}
                </span>
                <p className="text-xs text-gray-200 font-medium drop-shadow-sm">
                  {secondaryBanners.gamestick.desc}
                </p>
              </div>

              <div className="relative z-20 pt-4">
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition shadow-md text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{secondaryBanners.gamestick.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>

            {/* CARD 4: SMARTWATCHES (FOTO 100% COBRINDO COM GRADIENTE ESCURO) */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              onClick={() => setSelectedCategory(secondaryBanners.smartwatch.category)}
              className={`relative rounded-3xl overflow-hidden bg-stone-950 text-white p-5 flex flex-col justify-between min-h-[195px] sm:min-h-[220px] shadow-lg cursor-pointer group transition-all duration-500 ${
                blackFridayMode ? "bf-glow-border" : "border border-white/10"
              }`}
            >
              {/* Imagem 100% Cobrindo o Card */}
              <img
                src={secondaryBanners.smartwatch.image}
                alt={secondaryBanners.smartwatch.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />

              {/* Gradiente Protetor para Legibilidade Superior e Inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-stone-950/50 pointer-events-none z-10" />

              <div className="relative z-20 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-200 drop-shadow-sm">
                  {secondaryBanners.smartwatch.title}
                </span>
                <p className="text-xs text-gray-200 font-medium drop-shadow-sm">
                  {secondaryBanners.smartwatch.desc}
                </p>
              </div>

              <div className="relative z-20 pt-4">
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition shadow-md text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{secondaryBanners.smartwatch.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
