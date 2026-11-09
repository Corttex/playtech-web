"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  X,
  Phone,
  Mail,
  Search
} from "lucide-react";

interface FaqsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FaqsModal({ isOpen, onClose }: FaqsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("TODAS");

  if (!isOpen) return null;

  const faqItems = [
    {
      category: "PAGAMENTO",
      q: "Quais são as opções de pagamento e parcelamento?",
      a: "Aceitamos PIX Instantâneo com desconto especial à vista (confirmação imediata) e Cartão de Crédito em até 12x (com opções de parcelamento sem juros). O ambiente de pagamento é criptografado e certificado via Asaas.",
    },
    {
      category: "PEDIDOS",
      q: "Como acompanhar o andamento do meu pedido?",
      a: "Assim que o pedido é aprovado e faturado, enviamos as atualizações via WhatsApp e e-mail. Quando o pacote é despachado, você recebe o código oficial dos Correios para acompanhar o trajeto até a sua porta.",
    },
    {
      category: "ENTREGA",
      q: "Qual o valor do frete e o prazo de entrega?",
      a: "Oferecemos Frete Grátis para todo o Brasil em compras acima de R$ 250. O prazo de entrega varia de 1 a 3 dias úteis para o DF e região central, de 2 a 5 dias úteis para Sudeste e Sul, e de 4 a 9 dias úteis para as demais regiões.",
    },
    {
      category: "GARANTIA",
      q: "Os produtos possuem nota fiscal e garantia?",
      a: "Sim, 100% dos nossos produtos são novos, originais, enviados com Nota Fiscal Eletrônica (NF-e) emitida no nome do comprador e possuem garantia de 1 ano (12 meses) contra defeitos de fabricação.",
    },
    {
      category: "TROCAS",
      q: "Como funciona se eu quiser trocar ou desistir da compra?",
      a: "Você tem até 7 dias corridos após o recebimento para solicitar troca ou devolução sem custos adicionais pelo Código de Defesa do Consumidor. A PlayTech fornece o código de postagem reversa gratuita dos Correios.",
    },
    {
      category: "SEGURANÇA",
      q: "É seguro comprar na PlayTech Store?",
      a: "Totalmente seguro. Nossa loja conta com certificado de segurança SSL de 256 bits, compliance com a LGPD, CNPJ ativo e regularizado (38.248.064/0001-09) e equipe própria de atendimento localizada em Brasília-DF.",
    },
    {
      category: "PEDIDOS",
      q: "Posso alterar o endereço de entrega após concluir o pedido?",
      a: "Se o pedido ainda não tiver sido despachado aos Correios, você pode solicitar a correção imediata contatando nossa equipe pelo WhatsApp (61) 99661-3292 com o número do seu pedido.",
    },
    {
      category: "PAGAMENTO",
      q: "O PIX cai na mesma hora?",
      a: "Sim! O pagamento via PIX é reconhecido automaticamente em segundos pelo nosso sistema, permitindo que seu pedido entre imediatamente na fila de separação e expedição.",
    },
  ];

  const filteredFaqs = faqItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "TODAS" || item.category === selectedCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-purple-500/10 dark:bg-purple-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                Perguntas Frequentes (FAQs)
              </h2>
              <p className="text-[11px] text-gray-500">
                Tire suas dúvidas rápidas sobre compras, pagamentos e suporte
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Filter */}
        <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite sua dúvida (ex: rastreio, PIX, garantia)..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {["TODAS", "PAGAMENTO", "ENTREGA", "GARANTIA", "TROCAS", "PEDIDOS"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-gray-200/80 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Modal Body / FAQs Accordion */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-xs text-gray-500">Nenhuma pergunta encontrada para sua busca.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("TODAS");
                }}
                className="text-xs font-bold text-purple-600 hover:underline cursor-pointer"
              >
                Limpar filtros de busca
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800/80 transition"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full p-4 text-left font-bold text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/40 transition cursor-pointer gap-3"
                  >
                    <span className="text-xs sm:text-sm">{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="p-4 pt-1 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 font-bold text-purple-700 dark:text-purple-400">
              <Phone className="w-3.5 h-3.5 text-purple-600" /> Ainda tem dúvidas? WhatsApp (61) 99661-3292
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs hover:opacity-90 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
