// lib/animation-variants.ts
// Regras Globais de Animação — PlayTech Scrollytelling & Staggered UI
import { Variants } from "framer-motion";

// Cascata principal para listas (Grids, Menus, Carrinho)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09, // Tempo entre o surgimento de um card e outro
      delayChildren: 0.06,   // Atraso inicial antes de começar a onda
    },
  },
};

// Cascata rápida para itens de menu e departamentos circulares
export const quickStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
};

// Surgimento suave de baixo para cima (Cards, Textos e Imagens)
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 130, 
      damping: 18,
      mass: 0.8
    } 
  },
};

// Gatilho de conversão final (Preços e Botões de Compra) - Leve atraso e micro-pop
export const delayedPopVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 6 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 170, 
      damping: 16, 
      delay: 0.16 
    } 
  },
};

// Entrada suave para seções inteiras ao rolar a página (Scrollytelling)
export const sectionFadeVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};
