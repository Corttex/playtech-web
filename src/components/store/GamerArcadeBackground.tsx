"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Sparkles, Zap, Trophy, Disc, Crosshair, Swords, Radio, Cpu } from "lucide-react";

export default function GamerArcadeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 w-full">
      {/* ── 1. GRADIENTE FULL-WIDTH DEEP CYBERPUNK ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090514]/95 via-[#0e0724]/90 to-[#050816]/95" />

      {/* ── 2. NEON GLOW BLURS DE SETUP RGB ULTRA WIDE ── */}
      <div className="absolute -top-32 left-[5%] w-[450px] h-[450px] bg-purple-600/25 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute top-1/3 right-[5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      <div className="absolute -bottom-32 left-[35%] w-[400px] h-[400px] bg-pink-600/18 rounded-full blur-[130px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-[15%] w-[350px] h-[350px] bg-cyan-600/15 rounded-full blur-[120px] animate-pulse delay-1500" />

      {/* ── 3. GRID CIBERNÉTICO SUAVE DE FUNDO (FULL WIDTH) ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70d_1px,transparent_1px),linear-gradient(to_bottom,#a855f70d_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-80" />

      {/* ── 4. VETORES E ÍCONES GAMER ESTILIZADOS NO BACKGROUND (BG VECTORS) ── */}
      {/* D-Pad e Botões de Controle PlayStation / Retrô à Esquerda */}
      <div className="absolute -left-12 top-16 opacity-[0.08] text-purple-300 pointer-events-none">
        <svg className="w-80 h-80" viewBox="0 0 100 100" fill="currentColor">
          {/* Cruz Direcional (D-Pad) */}
          <rect x="38" y="10" width="24" height="80" rx="4" />
          <rect x="10" y="38" width="80" height="24" rx="4" />
        </svg>
      </div>

      {/* Botões de Ação ABXY à Direita */}
      <div className="absolute -right-8 top-20 opacity-[0.07] text-blue-300 pointer-events-none">
        <svg className="w-72 h-72" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="50" cy="20" r="10" />
          <circle cx="50" cy="80" r="10" />
          <circle cx="20" cy="50" r="10" />
          <circle cx="80" cy="50" r="10" />
        </svg>
      </div>

      {/* Arcade Joystick Gigante no Centro Inferior */}
      <div className="absolute left-[45%] -bottom-16 -translate-x-1/2 opacity-[0.05] text-purple-200 pointer-events-none">
        <svg className="w-96 h-96" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="25" r="16" />
          <rect x="46" y="36" width="8" height="34" rx="2" />
          <path d="M20 70 L80 70 L85 85 L15 85 Z" />
        </svg>
      </div>

      {/* ── 5. ANIMAÇÕES DE JOGOS PASSANDO CONTINUAMENTE NA TELA ── */}
      {/* Gamepad flutuando e deslizando */}
      <motion.div
        initial={{ x: "110vw", y: 30, opacity: 0 }}
        animate={{
          x: "-20vw",
          y: [30, 60, 20, 50, 30],
          opacity: [0, 0.15, 0.15, 0],
          rotate: [0, 15, -10, 8, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
          delay: 0.5,
        }}
        className="absolute top-10 flex items-center gap-2 text-purple-400"
      >
        <Gamepad2 className="w-16 h-16 stroke-[1.4]" />
      </motion.div>

      {/* Space Invader Pixel Retro Alien */}
      <motion.div
        initial={{ x: "-15vw", y: 150, opacity: 0 }}
        animate={{
          x: "115vw",
          y: [150, 120, 170, 130, 150],
          opacity: [0, 0.14, 0.14, 0],
          rotate: [-12, 10, -8, 12],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
        className="absolute top-24 flex items-center gap-3 text-cyan-400"
      >
        <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
          <path d="M6 3h2v2H6V3zm10 0h2v2h-2V3zM4 6h2v2H4V6zm14 0h2v2h-2V6zm-2 2h-1V7h-6v1H8v2h1v1h6v-1h1V8zm4 0h2v4h-2V8zM2 8h2v4H2V8zm4 3h1v1H6v-1zm11 0h1v1h-1v-1zm-9 2h8v1h-1v1h-1v1h-4v-1H9v-1H8v-1zm-3 2h2v3H5v-3zm12 0h2v3h-2v-3zM3 18h2v3H3v-3zm16 0h2v3h-2v-3z" />
        </svg>
      </motion.div>

      {/* Pacman & Fantasma Pixel */}
      <motion.div
        initial={{ x: "110vw", y: 300, opacity: 0 }}
        animate={{
          x: "-20vw",
          y: [300, 280, 320, 300],
          opacity: [0, 0.12, 0.12, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          delay: 8,
        }}
        className="absolute top-64 flex items-center gap-4 text-yellow-400"
      >
        {/* Pacman SVG */}
        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.61-3.39L12 12l8.8-3.66C19.34 5.06 15.97 2 12 2z" />
        </svg>
        {/* Pixel Dots */}
        <span className="w-2.5 h-2.5 bg-yellow-300 rounded-full" />
        <span className="w-2.5 h-2.5 bg-yellow-300 rounded-full" />
        <span className="w-2.5 h-2.5 bg-yellow-300 rounded-full" />
      </motion.div>

      {/* Troféu Gamer e Espadas Cruzadas */}
      <motion.div
        initial={{ x: "-20vw", y: 450, opacity: 0 }}
        animate={{
          x: "110vw",
          y: [450, 480, 430, 470, 450],
          opacity: [0, 0.13, 0.13, 0],
          rotate: [10, -15, 8, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 13,
        }}
        className="absolute top-96 flex items-center gap-3 text-pink-400"
      >
        <Trophy className="w-13 h-13 stroke-[1.4]" />
        <Swords className="w-11 h-11 stroke-[1.3] text-purple-400" />
      </motion.div>

      {/* Crosshair Mira Gamer */}
      <motion.div
        initial={{ x: "115vw", y: 200, opacity: 0 }}
        animate={{
          x: "-15vw",
          y: [200, 230, 180, 210],
          opacity: [0, 0.11, 0.11, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "linear",
          delay: 17,
        }}
        className="absolute text-emerald-400"
      >
        <Crosshair className="w-16 h-16 stroke-[1.2]" />
      </motion.div>

      {/* Micropartículas de Pixels Flutuantes Verticais */}
      <div className="absolute inset-0">
        {[
          { left: "8%", delay: 0, size: "w-2 h-2", color: "bg-purple-500/35" },
          { left: "22%", delay: 2.5, size: "w-1.5 h-1.5", color: "bg-cyan-400/35" },
          { left: "40%", delay: 1.2, size: "w-2.5 h-2.5", color: "bg-pink-500/30" },
          { left: "62%", delay: 3.5, size: "w-2 h-2", color: "bg-purple-400/35" },
          { left: "78%", delay: 1.8, size: "w-1.5 h-1.5", color: "bg-blue-400/35" },
          { left: "92%", delay: 4.2, size: "w-2 h-2", color: "bg-emerald-400/30" },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{ left: p.left }}
            className={`absolute bottom-0 ${p.size} ${p.color} rounded-xs shadow-[0_0_8px_currentColor]`}
          />
        ))}
      </div>

      {/* Vinhetas de transição suave nas bordas superior e inferior */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-gray-50/90 dark:from-[#020617] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/95 dark:from-[#020617] to-transparent pointer-events-none" />
    </div>
  );
}
