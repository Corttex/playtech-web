"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ArrowRight, X } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function FloatingComparePill() {
  const { comparedProducts, setIsCompareModalOpen, clearCompare } = useStore();

  if (comparedProducts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 bg-gray-900/95 dark:bg-blue-950/95 text-white border border-blue-500/40 rounded-full px-4 py-2.5 shadow-2xl backdrop-blur-md flex items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold">
            Comparar ({comparedProducts.length}/3)
          </span>
        </div>

        <button
          onClick={() => setIsCompareModalOpen(true)}
          className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-xs font-black transition flex items-center gap-1 cursor-pointer"
        >
          <span>Abrir</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={clearCompare}
          className="text-gray-400 hover:text-white p-1"
          title="Limpar comparação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
