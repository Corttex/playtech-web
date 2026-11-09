"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO_PLAYTECH_DARK, LOGO_PLAYTECH_LIGHT } from "@/lib/logosBase64";

interface PlayTechSplashScreenProps {
  durationMs?: number;
  onFinish?: () => void;
}

export default function PlayTechSplashScreen({
  durationMs = 1800,
  onFinish,
}: PlayTechSplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Incremento suave da barra de carregamento até 100%
    const intervalTime = 25;
    const step = 100 / (durationMs / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + step);
      });
    }, intervalTime);

    // Fade-out do overlay
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, durationMs);

    return () => {
      clearInterval(timer);
      clearTimeout(hideTimeout);
    };
  }, [durationMs, onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-950 overflow-hidden select-none"
        >
          {/* Efeito sutil de gradiente vivo de fundo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-gray-50 dark:from-blue-950/40 dark:via-gray-950 dark:to-black opacity-80" />

          {/* Container Central com Animação Fluida */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-xs w-full px-6 text-center space-y-6"
          >
            {/* Logo PlayTech Centralizada (Embutida em Base64 - Render 100% Instantâneo sem delay de rede) */}
            <div className="relative flex items-center justify-center min-h-[50px] w-full">
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  filter: [
                    "drop-shadow(0 4px 12px rgba(29,86,245,0.15))",
                    "drop-shadow(0 8px 24px rgba(29,86,245,0.30))",
                    "drop-shadow(0 4px 12px rgba(29,86,245,0.15))"
                  ]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-56 sm:w-64 h-auto flex items-center justify-center"
              >
                {/* Logo Dark para fundo Light */}
                <img
                  src={LOGO_PLAYTECH_DARK}
                  alt="PlayTech Store"
                  className="w-full h-auto object-contain dark:hidden drop-shadow-sm"
                />
                {/* Logo Light para fundo Dark */}
                <img
                  src={LOGO_PLAYTECH_LIGHT}
                  alt="PlayTech Store"
                  className="w-full h-auto object-contain hidden dark:block drop-shadow-sm"
                />
              </motion.div>
            </div>

            {/* Texto de Status */}
            <div className="space-y-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400"
              >
                Carregando a Loja...
              </motion.p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                Sincronizando catálogos e ofertas
              </p>
            </div>

            {/* Barra de Progresso Elegante com Glow */}
            <div className="w-full space-y-2">
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-200/60 dark:border-gray-700/60 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-full shadow-sm"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span>PlayTech OS</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
