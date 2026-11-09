"use client";

import React from "react";
import {
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  X,
  ExternalLink,
  Phone,
  PackageCheck
} from "lucide-react";

interface ShippingRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShippingRulesModal({ isOpen, onClose }: ShippingRulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-blue-500/10 dark:bg-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                Prazos e Regras de Entrega
              </h2>
              <p className="text-[11px] text-gray-500">
                Logística nacional &bull; Despacho de Brasília-DF &bull; Rastreio em Tempo Real
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
          {/* Banner Frete Grátis e Rapidez */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide">
                FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 250
              </h3>
              <p className="text-[11px] text-blue-100 mt-0.5">
                Envio expresso e seguro para todas as regiões do Brasil via Correios (SEDEX / PAC) e transportadoras parceiras.
              </p>
            </div>
            <PackageCheck className="w-10 h-10 text-blue-200 shrink-0" />
          </div>

          {/* Modalidades e Prazos Médios */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> 1. Modalidades de Envio e Prazos Médios
            </h3>
            <p>
              Os prazos de entrega são calculados em dias úteis a partir do faturamento com emissão de Nota Fiscal:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Centro-Oeste &amp; DF</span>
                <p className="font-bold text-gray-900 dark:text-white">1 a 3 dias úteis</p>
                <p className="text-[11px] text-gray-500">Expedição prioritária direta de Brasília.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Sudeste &amp; Sul</span>
                <p className="font-bold text-gray-900 dark:text-white">2 a 5 dias úteis</p>
                <p className="text-[11px] text-gray-500">SEDEX expresso e malha aérea integrada.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">Nordeste &amp; Norte</span>
                <p className="font-bold text-gray-900 dark:text-white">4 a 9 dias úteis</p>
                <p className="text-[11px] text-gray-500">Cobertura total com seguro de carga incluso.</p>
              </div>
            </div>
          </div>

          {/* Regras e Tentativas de Entrega */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" /> 2. Regras de Entrega e Recebimento
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Tentativas de Entrega:</strong> Os Correios realizam até <strong>3 (três) tentativas consecutivas</strong> de entrega em dias úteis no endereço indicado.
              </li>
              <li>
                <strong>Ausência no Local:</strong> Caso não haja responsável para receber a encomenda nas 3 tentativas, o pacote é direcionado para a agência dos Correios mais próxima, onde permanecerá disponível para retirada por <strong>7 dias corridos</strong> antes de retornar ao remetente.
              </li>
              <li>
                <strong>Conferência Obrigatória no Recebimento:</strong> No momento da entrega pelo carteiro ou entregador, verifique se a caixa apresenta violação, fita rompida ou amassamento severo. Caso note qualquer irregularidade externa, <strong>recuse o recebimento imediatamente</strong> e avise nossa central.
              </li>
              <li>
                <strong>Endereço Incompleto ou Incorreto:</strong> A exatidão do endereço de entrega é de inteira responsabilidade do cliente. Encomendas devolvidas por inconsistência de numeração ou CEP demandarão taxa de reenvio.
              </li>
            </ul>
          </div>

          {/* Rastreamento Seguro */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 space-y-2">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> 3. Rastreamento e Seguro de Carga
            </h4>
            <p className="text-[11px] text-blue-950 dark:text-blue-300">
              Todas as remessas contam com <strong>seguro integral de transporte</strong> contra extravio, roubo de carga ou sinistro. Você receberá o código oficial de rastreamento por WhatsApp e e-mail no mesmo dia do despacho.
            </p>
            <div className="pt-1">
              <a
                href="https://rastreamento.correios.com.br/app/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Consultar Rastreio Oficial dos Correios <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-400">
              <Truck className="w-3.5 h-3.5 text-blue-600" /> Logística PlayTech Brasília-DF
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
