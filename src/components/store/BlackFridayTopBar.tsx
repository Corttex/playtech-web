"use client";

import React, { useState, useEffect } from "react";
import { Flame, Clock, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function BlackFridayTopBar() {
  const { blackFridayMode } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 27, seconds: 43 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!blackFridayMode) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 text-black px-4 py-2 font-black tracking-wide text-xs md:text-sm flex flex-wrap items-center justify-center gap-3 shadow-md z-40 relative">
      <div className="flex items-center gap-1.5 animate-pulse">
        <Flame className="w-4 h-4 fill-black" />
        <span className="uppercase">ESQUENTA BLACK FRIDAY PLAYTECH</span>
      </div>

      <span className="hidden md:inline">•</span>

      <span>ATÉ 50% OFF + FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 250!</span>

      <div className="flex items-center gap-1 bg-black text-amber-400 px-3 py-1 rounded-md font-mono text-xs font-bold tracking-wider ml-1 shadow-inner">
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        <span>LOTE ENCERRA EM:</span>
        <span className="text-white">
          {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
        </span>
      </div>
    </div>
  );
}
