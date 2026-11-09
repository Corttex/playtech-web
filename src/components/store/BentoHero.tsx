"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function BentoHero() {
  const { products, blackFridayMode, addToCart, setSelectedProductForDetail } = useStore();

  const hy320 = products.find((p) => p.sku === "HY320-BLK") || products[0];
  const gameStick = products.find((p) => p.sku === "X3-PRO-8K") || products[1];

  const hy320Price = blackFridayMode ? hy320.bfSalePrice : hy320.baseSalePrice;
  const gameStickPrice = blackFridayMode ? gameStick.bfSalePrice : gameStick.baseSalePrice;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
      {/* Bloco 1 Principal (HY320 Projetor) */}
      <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 sm:p-10 flex flex-col justify-between min-h-[380px] shadow-sm">
        
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            {blackFridayMode ? "DESTAQUE BLACK FRIDAY · LOTE LIMITADO" : "LANÇAMENTO EXCLUSIVO PLAYTECH"}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            Cinema 4K de 150&quot; na Parede da Sua Casa.
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            O consagrado <strong className="text-gray-900 dark:text-white">Mini Projetor Smart HY320</strong> com Android TV nativo, Wi-Fi 6 Ultra e rotação 180°. Assista Netflix e YouTube sem precisar de computador.
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 pt-1">
            <span className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Bivolt Automático
            </span>
            <span className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Rotação de 180°
            </span>
            <span className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Envio Imediato c/ NFe
            </span>
          </div>
        </div>

        <div className="pt-8 flex flex-wrap items-end justify-between gap-4 border-t border-gray-200 dark:border-gray-600 mt-6">
          <div>
            <span className="text-xs text-gray-400 line-through block">
              De R$ {hy320.compareAtPrice.toFixed(2)}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-green-600 dark:text-green-500">
                R$ {hy320Price.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">no PIX (-10%)</span>
            </div>
            <span className="text-xs text-gray-400 block mt-0.5">
              ou 12x de R$ {(hy320Price / 12).toFixed(2)} sem juros no cartão
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToCart(hy320)}
              className="bg-green-600 hover:bg-green-700 text-white font-black px-6 py-3.5 rounded-xl flex items-center gap-2 transition duration-200 shadow-sm active:scale-95 text-sm"
            >
              Comprar c/ Frete Grátis <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProductForDetail(hy320)}
              className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 transition active:scale-95"
            >
              Ver Detalhes do HY320
            </button>
          </div>
        </div>
      </div>

      {/* Bloco 2 Secundário (Game Stick X3 Pro) */}
      <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-7 flex flex-col justify-between shadow-sm">
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-black bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
            🎮 +50.000 JOGOS NA TV
          </div>

          <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
            Console Game Stick X3 Pro Ultra HD 8K
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Reviva os clássicos do PS1, Super Nintendo e Arcade. Inclui 2 Controles Sem Fio 2.4GHz e cartão de 64GB.
          </p>

          <div className="space-y-1.5 py-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>Plugue direto no HDMI da TV</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>Sem precisar de internet para jogar</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-600 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-600">
            <span className="text-xs text-gray-400 line-through">De R$ {gameStick.compareAtPrice.toFixed(2)}</span>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              R$ {gameStickPrice.toFixed(2)}
            </div>
            <span className="text-[11px] text-gray-400">Em até 12x sem juros no cartão</span>
          </div>

          <button
            onClick={() => addToCart(gameStick)}
            className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-black py-3 rounded-xl text-sm transition shadow-sm active:scale-95"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </section>
  );
}
