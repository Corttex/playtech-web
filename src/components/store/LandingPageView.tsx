"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Truck,
  Star,
  Play,
  ArrowRight,
  Award
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function LandingPageView() {
  const { products, blackFridayMode, addToCart, setActiveView } = useStore();
  const [selectedBundle, setSelectedBundle] = useState<number>(1);

  const hy320 = products.find((p) => p.sku === "HY320-BLK") || products[0];
  const price = blackFridayMode ? hy320.bfSalePrice : hy320.baseSalePrice;

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8 pb-32">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase tracking-widest">
          <Award className="w-4 h-4 text-blue-600" />
          <span>O PROJETOR MAIS DESEJADO DO BRASIL · EDIÇÃO HOMOLOGADA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight tracking-tight">
          Transforme Qualquer Parede em um <span className="text-blue-600">Cinema 4K</span> de 150 Polegadas.
        </h1>

        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          O <strong className="text-gray-900 dark:text-white">Mini Projetor HY320 Original PlayTech</strong> já vem com sistema Android TV 11 embutido, Netflix e YouTube nativos, Wi-Fi 6 de ultra velocidade e ajuste inteligente automático de ângulo.
        </p>

        {/* Video simulation preview */}
        <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 flex items-center justify-center group shadow-md">
          <img
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80"
            alt="Projetor HY320 em uso"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 fill-gray-900 ml-1" />
            </div>
            <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20">
              Demonstração Real: Qualidade de Imagem no Escuro e na Meia-Luz
            </span>
          </div>
        </div>

        {/* Preço e CTA */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-400 line-through">De R$ 749,90</span>
            <span className="text-4xl sm:text-5xl font-black text-green-600 dark:text-green-400">
              R$ {price.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">no PIX</span>
          </div>

          <button
            onClick={() => addToCart(hy320)}
            className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-black px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-base sm:text-lg transition-all duration-200 shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95"
          >
            GARANTIR MEU HY320 COM FRETE GRÁTIS
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-green-600" /> Envio do Brasil em 24h
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Nota Fiscal e Garantia
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid de Benefícios */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Por que o HY320 é o Melhor Custo-Benefício do Mercado?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Diferenciais de engenharia que colocam o HY320 anos-luz à frente de projetores comuns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              emoji: "📱",
              title: "Android TV 11.0 Nativo",
              desc: "Não precisa de computador, TV Box ou Chromecast. Basta ligar na tomada, conectar no Wi-Fi e abrir seus apps favoritos."
            },
            {
              emoji: "🔄",
              title: "Rotação 180° & Keystone",
              desc: "Projete no teto do seu quarto deitado na cama ou na parede da sala. O alinhamento trapezoidal corrige a tela automaticamente."
            },
            {
              emoji: "🚀",
              title: "Wi-Fi 6 + Bluetooth 5.2",
              desc: "Streaming sem engasgos ou perda de sinal. Conecte sua caixa de som Bluetooth Sabala ou use o alto-falante integrado."
            }
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3 shadow-sm">
              <div className="text-2xl">{item.emoji}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparativo */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-6 shadow-sm">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            Compare: Por Que Comprar na PlayTech Brasil?
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Evite surpresas com taxas alfandegárias de 92% e meses de espera.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold">
                <th className="py-3 px-4">Benefício</th>
                <th className="py-3 px-4 text-green-600 dark:text-green-400 font-black">PlayTech Brasil Oficial</th>
                <th className="py-3 px-4 text-gray-400 dark:text-gray-500">Importação Direta da China</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                {
                  label: "Tempo de Entrega",
                  good: "2 a 5 Dias Úteis (Estoque SP)",
                  bad: "20 a 45 Dias"
                },
                {
                  label: "Risco de Tributação (Remessa Conforme)",
                  good: "ZERO TAXA EXTRA (Impostos Pagos)",
                  bad: "Taxado em até 92% na alfândega"
                },
                {
                  label: "Nota Fiscal & Garantia Nacional",
                  good: "NFe em seu nome + Troca Fácil",
                  bad: "Sem garantia no Brasil"
                },
                {
                  label: "Suporte Técnico em Português",
                  good: "WhatsApp dedicado com técnicos",
                  bad: "Atendimento em inglês/chinês"
                }
              ].map((row) => (
                <tr key={row.label}>
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{row.label}</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> {row.good}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" /> {row.bad}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Avaliações */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white text-center">
          O que dizem os clientes da PlayTech Brasil
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              text: '"Chegou em 3 dias aqui no interior de SP. A imagem é surreal de boa mesmo com a cortina aberta! Uso todo dia com Netflix."',
              author: "Rodrigo M. • São Paulo/SP"
            },
            {
              text: '"Comprei com o Game Stick junto e a família inteira amou. Nota fiscal veio certinho no meu e-mail assim que paguei no PIX."',
              author: "Camila Fernandes • Curitiba/PR"
            },
            {
              text: '"O suporte da PlayTech me ajudou a emparelhar a caixa de som Bluetooth em 2 minutos. Atendimento nota 10."',
              author: "Lucas Albuquerque • Belo Horizonte/MG"
            }
          ].map((review) => (
            <div key={review.author} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3 shadow-sm">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 italic">{review.text}</p>
              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{review.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Buy Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 z-40">
        <div className="flex items-center justify-between max-w-5xl mx-auto px-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Mini Projetor HY320 4K</span>
            <div className="text-lg sm:text-2xl font-black text-green-600 dark:text-green-400">
              R$ {price.toFixed(2)} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">no PIX</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(hy320)}
            className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-black px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition"
          >
            COMPRAR AGORA COM FRETE GRÁTIS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
