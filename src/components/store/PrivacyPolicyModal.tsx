"use client";

import React from "react";
import {
  Lock,
  ShieldCheck,
  FileText,
  UserCheck,
  Server,
  X,
  Mail,
  Phone,
  CheckCircle2
} from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-emerald-500/10 dark:bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-600">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                Política de Privacidade (LGPD)
              </h2>
              <p className="text-[11px] text-gray-500">
                Conformidade com a Lei Federal nº 13.709/2018 &bull; PlayTech Store &bull; CNPJ 38.248.064/0001-09
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
          {/* Declaração Inicial */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1 text-emerald-950 dark:text-emerald-200">
            <span className="font-bold flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Transparência e Segurança no Tratamento de Dados
            </span>
            <p className="text-[11px] leading-relaxed">
              A <strong>PlayTech Brasil</strong> valoriza profundamente a confiança depositada por nossos clientes. Esta Política de Privacidade descreve de forma clara quais dados coletamos, como são protegidos e os seus direitos como titular.
            </p>
          </div>

          {/* 1. Quais dados coletamos e finalidade */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> 1. Dados Coletados e Base Legal
            </h3>
            <p>
              Coletamos exclusivamente as informações imprescindíveis para viabilizar sua compra, cumprir obrigações fiscais e garantir a entrega:
            </p>
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <p className="font-bold text-gray-900 dark:text-white">Identificação e Faturamento Fiscal:</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Nome completo, CPF e endereço de cobrança — exigidos por legislação fazendária para emissão da Nota Fiscal Eletrônica (NF-e).
                </p>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <p className="font-bold text-gray-900 dark:text-white">Contato e Rastreamento:</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Número de WhatsApp/telefone e e-mail — utilizados unicamente para envio do comprovante do pedido, link do boleto/PIX e atualizações em tempo real do rastreio dos Correios.
                </p>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <p className="font-bold text-gray-900 dark:text-white">Dados de Pagamento (PCI-DSS):</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Transações são processadas via gateway homologado Asaas. <strong>A PlayTech não armazena, em nenhuma hipótese, dados de cartão ou códigos de segurança (CVV).</strong>
                </p>
              </div>
            </div>
          </div>

          {/* 2. Segurança e Criptografia */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" /> 2. Armazenamento e Criptografia
            </h3>
            <p>
              Toda a navegação em nosso domínio é protegida por certificados <strong>SSL/TLS com criptografia de 256 bits</strong>. O banco de dados opera em ambiente isolado, com backups automáticos e controle de privilégios de acesso restrito aos operadores autorizados.
            </p>
          </div>

          {/* 3. Compartilhamento Estritamente Operacional */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
              3. Compartilhamento de Dados
            </h3>
            <p>
              Não alugamos, vendemos ou compartilhamos seus dados para listas de telemarketing ou terceiros não envolvidos na operação. Os dados são transmitidos apenas para:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Correios e Transportadoras:</strong> Dados essenciais de entrega para etiquetagem e roteamento;</li>
              <li><strong>Secretaria da Fazenda (SEFAZ):</strong> Para autorização e validação fiscal;</li>
              <li><strong>Instituição de Pagamento Autorizada:</strong> Para liquidação e checagem antifraude.</li>
            </ul>
          </div>

          {/* 4. Direitos do Titular (LGPD) e Contato do DPO */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-2">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" /> 4. Seus Direitos e Contato com o DPO
            </h4>
            <p className="text-[11px] text-emerald-950 dark:text-emerald-300">
              Nos termos do art. 18 da LGPD, você tem direito a confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou requerer a eliminação de dados cadastrais não fiscais a qualquer momento.
            </p>
            <div className="pt-1 flex flex-wrap gap-4 text-[11px] font-semibold text-emerald-900 dark:text-emerald-300">
              <span>Canal DPO: comercial@playtech.com.br</span>
              <span>Telefone/WhatsApp: (61) 99661-3292</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> PlayTech Segurança de Dados
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
