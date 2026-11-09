"use client";

import React, { useState } from "react";
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Package,
  X,
  Phone,
  Mail,
  HelpCircle
} from "lucide-react";

interface ReturnsWarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReturnsWarrantyModal({ isOpen, onClose }: ReturnsWarrantyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-amber-500/10 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-xl text-amber-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                Política de Trocas &amp; Garantia
              </h2>
              <p className="text-[11px] text-gray-500">
                PlayTech Store &bull; Respeito integral ao CDC (Lei 8.078/1990) &bull; Guará II, Brasília - DF
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {/* Destaque CDC */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1 text-amber-950 dark:text-amber-200">
            <span className="font-bold flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Direito de Arrependimento (Artigo 49 do CDC)
            </span>
            <p className="text-[11px] leading-relaxed">
              Você tem até <strong>7 (sete) dias corridos</strong> a partir do recebimento do produto para solicitar a devolução ou troca por arrependimento, com <strong>custo de frete reverso 100% arcado pela PlayTech Store</strong>.
            </p>
          </div>

          {/* Garantia Nacional */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Garantia Oficial PlayTech (1 Ano)
            </h3>
            <p>
              Todos os aparelhos e eletrônicos comercializados acompanham garantia legal e contratual de <strong>1 ano (12 meses)</strong> contra defeitos de fabricação ou vícios ocultos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <p className="font-bold text-gray-900 dark:text-white mb-1">Garantia Legal (Primeiros 90 dias):</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Amparo imediato conforme o Código de Defesa do Consumidor, com reparo ou substituição direta sem qualquer burocracia.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <p className="font-bold text-gray-900 dark:text-white mb-1">Garantia Contratual (Até 12 meses):</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Assistência técnica especializada com suporte em laboratório próprio em Brasília-DF ou rede credenciada de assistência.
                </p>
              </div>
            </div>
          </div>

          {/* Passo a Passo para Troca ou Acionamento */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> 2. Passo a Passo do Acionamento de Troca
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Solicitação:</strong> Entre em contato com nosso atendimento pelo WhatsApp <strong>(61) 99661-3292</strong> ou pelo e-mail <strong>comercial@playtech.com.br</strong> com o número do pedido e relato do ocorrido.
              </li>
              <li>
                <strong>Código de Postagem Reversa:</strong> Fornecemos uma etiqueta dos Correios pré-paga para você despachar o item na agência mais próxima sem custo de frete.
              </li>
              <li>
                <strong>Avaliação Técnica:</strong> Ao chegar em nossa unidade logística no Guará II (DF), nossa equipe realiza a perícia técnica em até <strong>3 dias úteis</strong>.
              </li>
              <li>
                <strong>Conclusão:</strong> Você poderá optar por troca por um item novo idêntico, cupom de crédito na loja ou reembolso financeiro integral.
              </li>
            </ol>
          </div>

          {/* O que não cobre */}
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/20 space-y-2">
            <h4 className="font-bold text-red-800 dark:text-red-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" /> Situações Não Cobertas pela Garantia:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-red-900 dark:text-red-300">
              <li>Danos por queda, impacto, tela trincada, esmagamento ou avarias físicas evidentes;</li>
              <li>Contato com líquidos, umidade excessiva ou oxidação interna (salvo modelos com certificação à prova d&apos;água utilizada dentro das especificações);</li>
              <li>Surtos elétricos, uso de carregadores paralelos ou voltagem inadequada;</li>
              <li>Aparelhos com lacres violados ou abertos por assistências técnicas não autorizadas.</li>
            </ul>
          </div>

          {/* Estornos e Prazos */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
              3. Prazos de Reembolso e Estorno
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Pagamento via PIX:</strong> O estorno é realizado diretamente na mesma conta bancária pagadora em até <strong>24 a 48 horas úteis</strong> após a conferência técnica.
              </li>
              <li>
                <strong>Cartão de Crédito:</strong> A solicitação de cancelamento/estorno é enviada ao emissor em até 3 dias úteis. A devolução dos valores constará na fatura seguinte ou subsequente (conforme operadora do cartão).
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 font-bold text-green-700 dark:text-green-400">
              <Phone className="w-3.5 h-3.5 text-green-600" /> Suporte &amp; Trocas: (61) 99661-3292
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs hover:opacity-90 transition cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
