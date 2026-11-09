"use client";

import React from "react";
import { Star, ShieldCheck, ThumbsUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { sectionFadeVariant } from "@/lib/animation-variants";

export default function CustomerReviewsShowcase() {
  const reviews = [
    {
      name: "Lucas Meneses",
      city: "Brasília - DF",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      product: "Projetor HY320 4K Android TV",
      rating: 5,
      date: "Há 3 dias",
      comment:
        "O HY320 superou todas as expectativas. Projeto direto na parede branca do quarto e a imagem fica gigante, com cores vivas e som ótimo. O envio por Sedex chegou em 2 dias aqui em Brasília. Nota 10!",
    },
    {
      name: "Renata Silveira",
      city: "São Paulo - SP",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      product: "Smartwatch HW9 Ultra 2 + Fita LED",
      rating: 5,
      date: "Há 1 semana",
      comment:
        "Atendimento impecável! O relógio tem acabamento premium idêntico ao da marca famosa, responde super rápido e a bateria dura mais de 4 dias. Chegou super bem embalado e com nota fiscal.",
    },
    {
      name: "Felipe Andrade",
      city: "Curitiba - PR",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      product: "Game Stick Retrô 4K Wireless",
      rating: 5,
      date: "Há 2 semanas",
      comment:
        "Comprei para jogar com meus filhos os clássicos do PS1 e Super Nintendo. Conectou direto na TV sem configurar nada. O suporte pelo WhatsApp me atendeu muito bem antes da compra. Recomendo demais!",
    },
    {
      name: "Mariana Costa",
      city: "Belo Horizonte - MG",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      product: "Kit Iluminação Solar 200W + Ferramentas",
      rating: 5,
      date: "Há 3 semanas",
      comment:
        "O desconto no PIX foi excelente. O refletor solar iluminou o quintal todo da chácara sem gastar nada de energia elétrica. PlayTech virou minha loja de confiança para importados.",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionFadeVariant}
      className="w-full bg-gray-50/80 dark:bg-gray-900/60 py-16 border-y border-gray-200/70 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header da Seção */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> +12.000 Clientes Satisfeitos no Brasil
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Quem Compra na PlayTech Recomenda
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-gray-900 dark:text-white">4.9 / 5.0</span>
            <span className="text-xs text-gray-400">(1.840 avaliações verificadas)</span>
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              {/* Estrelas + Data */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">{r.date}</span>
              </div>

              {/* Comentário */}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic">
                "{r.comment}"
              </p>

              {/* Tag do Produto Comprado */}
              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg truncate">
                📦 {r.product}
              </div>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {r.name}
                    </h5>
                    <span title="Compra Verificada">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block truncate">
                    {r.city} &bull; Compra Verificada
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
