"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  FileText,
  Truck,
  RotateCcw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "PRIVACIDADE" | "ENTREGA" | "TROCAS" | "FAQS";
}

export default function PlayTechPolicyModal({
  isOpen,
  onClose,
  initialTab = "PRIVACIDADE",
}: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<"PRIVACIDADE" | "ENTREGA" | "TROCAS" | "FAQS">(
    initialTab
  );

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: "Quais são as formas de pagamento aceitas?",
      a: "Aceitamos PIX Instantâneo com desconto de 5% à vista (aprovação imediata via Asaas) e Cartão de Crédito em até 12x sem juros (Visa, Mastercard, Elo, Hipercard e American Express). Todas as transações ocorrem em ambiente criptografado com tokenização de segurança.",
    },
    {
      q: "Como rastrear o meu pedido?",
      a: "Assim que seu pedido é faturado com nota fiscal, o código de rastreamento oficial dos Correios é disparado automaticamente para o seu WhatsApp e e-mail. Você pode consultar diretamente em 'Minha Conta > Pedidos' ou no rastreio dos Correios com redirecionamento direto.",
    },
    {
      q: "Quais são os critérios para troca ou devolução?",
      a: "Conforme o artigo 49 do Código de Defesa do Consumidor e orientações do PROCON-DF, você tem até 7 (sete) dias corridos após o recebimento para manifestar desistência ou troca. O produto deve estar em sua embalagem original, sem marcas de mau uso, acompanhado de todos os acessórios e com a Nota Fiscal Eletrônica.",
    },
    {
      q: "O que fazer em caso de problemas na entrega ou atraso?",
      a: "Nossa central de atendimento em Brasília-DF atua imediatamente junto aos Correios. Você pode acionar nosso WhatsApp de atendimento (61) 99661-3292 ou enviar um e-mail para comercial@playtech.com.br informando o número do pedido.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/40 rounded-xl text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                Termos, Garantia &amp; Privacidade
              </h2>
              <p className="text-[11px] text-gray-500">
                PlayTech Store &bull; CNPJ 38.248.064/0001-09 &bull; Guará II, Brasília - DF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-6 gap-2 overflow-x-auto scrollbar-none bg-white dark:bg-gray-900">
          {[
            { id: "PRIVACIDADE", label: "Política de Privacidade (LGPD)", icon: Lock },
            { id: "ENTREGA", label: "Entrega & Envio", icon: Truck },
            { id: "TROCAS", label: "Troca e Devolução", icon: RotateCcw },
            { id: "FAQS", label: "Perguntas Frequentes", icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {/* TAB 1: POLÍTICA DE PRIVACIDADE MELHORADA & LGPD */}
          {activeTab === "PRIVACIDADE" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <Lock className="w-4 h-4 text-blue-600" /> Compromisso com a sua Privacidade e Proteção de Dados (LGPD)
                </span>
                <p className="text-[11px] text-blue-800 dark:text-blue-300">
                  A PlayTech Brasil (https://playtechbr.com.br/) tem como compromisso zelar pela privacidade, sigilo e integridade de todas as informações compartilhadas pelos clientes, em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
                  1. Coleta e Finalidade dos Dados
                </h3>
                <p>
                  Para propiciar um cadastro dinâmico e seguro, coletamos estritamente os dados necessários:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Dados Cadastrais Iniciais:</strong> Nome completo, telefone/WhatsApp, e-mail e CPF (necessário para emissão legal da Nota Fiscal Eletrônica e validação antifraude via Asaas).</li>
                  <li><strong>Dados de Entrega:</strong> Endereço de destino, número, complemento e CEP (coletados no ato do pedido ou complementados posteriormente via link seguro).</li>
                  <li><strong>Informações de Faturamento:</strong> As transações financeiras são processadas diretamente via <em>Gateway Asaas</em> sob padrão PCI-DSS. Nossos servidores <strong>não armazenam dados de segurança ou códigos CVV</strong> de cartões de crédito.</li>
                  <li><strong>Dados de Navegação:</strong> Endereço IP, dispositivo de acesso e cookies técnicos exclusivamente para personalização de sessões e prevenção a bots.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
                  2. Armazenamento Seguro e Criptografia
                </h3>
                <p>
                  Todas as transferências de dados entre seu navegador e a PlayTech Store ocorrem sob túnel criptográfico com certificado <strong>SSL 256-bit</strong>. Os arquivos fiscais e comprovantes são armazenados em infraestrutura segura com redundância e controle rigoroso de acesso corporativo.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
                  3. Compartilhamento Restrito a Operações Essenciais
                </h3>
                <p>
                  A PlayTech <strong>nunca comercializa, aluga ou compartilha seus dados pessoais para fins publicitários de terceiros</strong>. O compartilhamento ocorre única e exclusivamente com:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Correios e Transportadoras Parceiras:</strong> Para emissão de etiquetas e entrega física da encomenda.</li>
                  <li><strong>Secretaria da Fazenda (Sefaz):</strong> Para geração legal do DANFE e XML da Nota Fiscal.</li>
                  <li><strong>Gateway de Pagamento Asaas:</strong> Para processamento de PIX e liquidação bancária.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
                  4. Seus Direitos como Titular dos Dados
                </h3>
                <p>
                  Você pode a qualquer momento consultar, corrigir dados cadastrais ou solicitar a exclusão de suas informações de marketing entrando em contato direto com o nosso Encarregado de Proteção de Dados (DPO):
                </p>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 text-xs">
                  <span><strong>E-mail Oficial:</strong> comercial@playtech.com.br</span>
                  <span><strong>WhatsApp Corporativo:</strong> (61) 99661-3292</span>
                  <span><strong>Atendimento:</strong> Seg a Sex das 08h às 18h &bull; Sáb 08h às 13h</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POLÍTICA DE ENTREGA & ENVIO */}
          {activeTab === "ENTREGA" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black">ENTREGA E EXPEDIÇÃO SEGURA</h3>
                  <p className="text-xs text-blue-100 mt-0.5">
                    Envios para todo o Brasil com rastreamento oficial em tempo real pelos Correios.
                  </p>
                </div>
                <Truck className="w-12 h-12 text-blue-200 shrink-0" />
              </div>

              {/* 4 Passos da Entrega */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs inline-flex items-center justify-center">1</span>
                  <h5 className="font-bold text-gray-900 dark:text-white">Confirmação</h5>
                  <p className="text-[11px] text-gray-500">Pedido confirmado e aprovado via Asaas.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs inline-flex items-center justify-center">2</span>
                  <h5 className="font-bold text-gray-900 dark:text-white">Emissão NFe</h5>
                  <p className="text-[11px] text-gray-500">Nota Fiscal Eletrônica e DANFE gerados na hora.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs inline-flex items-center justify-center">3</span>
                  <h5 className="font-bold text-gray-900 dark:text-white">Despacho</h5>
                  <p className="text-[11px] text-gray-500">Postagem nos Correios em até 24h úteis.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs inline-flex items-center justify-center">4</span>
                  <h5 className="font-bold text-gray-900 dark:text-white">Recebimento</h5>
                  <p className="text-[11px] text-gray-500">Entrega rápida e segura no seu endereço.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white">Regras e Condições de Envio:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300">
                  <li><strong>Frete Grátis:</strong> Disponível em pedidos acima de R$ 250,00 para todo o território nacional.</li>
                  <li><strong>Acompanhamento Direto:</strong> Você receberá o código oficial de rastreio no seu WhatsApp imediatamente após o envio aos Correios.</li>
                  <li><strong>Tentativas de Entrega:</strong> Os Correios realizam até 3 tentativas de entrega no endereço cadastrado.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: TROCAS E DEVOLUÇÕES (PROCON-DF & CDC) */}
          {activeTab === "TROCAS" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1 text-amber-950 dark:text-amber-200">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <RotateCcw className="w-4 h-4 text-amber-600" /> Política de Troca e Devolução (Conforme PROCON-DF e CDC)
                </span>
                <p className="text-[11px]">
                  Total transparência para garantir a sua satisfação, amparada pelo Código de Defesa do Consumidor (Lei 8.078/1990).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-white">Direito de Arrependimento (Art. 49 do CDC):</h4>
                <p>
                  Você tem até <strong>7 (sete) dias corridos</strong> a partir da data de entrega da encomenda para solicitar a devolução ou troca sem custos.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 space-y-2">
                <h5 className="font-bold text-red-800 dark:text-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> O produto NÃO será aceito de volta se:
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-xs text-red-900 dark:text-red-300">
                  <li>Não estiver acompanhado da Nota Fiscal de compra;</li>
                  <li>Estiver sem a embalagem original, com itens danificados ou ausência de acessórios originais;</li>
                  <li>Apresentar sinais evidentes de mau uso, quedas ou danos físicos que inviabilizem a revenda;</li>
                  <li>Não for constatado defeito técnico ou inconsistência relatada no atendimento prévio.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white">Reembolso e Estorno:</h4>
                <p>
                  Após a chegada e conferência do produto em nosso centro logístico no Guará II (DF), o reembolso integral é processado em até <strong>10 dias úteis</strong> no mesmo método de pagamento utilizado na compra (estorno imediato no PIX ou crédito na fatura do cartão).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PERGUNTAS FREQUENTES */}
          {activeTab === "FAQS" && (
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isExpanded = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                      className="w-full p-4 text-left font-bold text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="p-4 pt-0 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer com Contatos Oficiais */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 font-bold text-gray-700 dark:text-gray-300">
              <Mail className="w-3.5 h-3.5 text-blue-600" /> comercial@playtech.com.br
            </span>
            <span className="flex items-center gap-1 font-bold text-green-700 dark:text-green-400">
              <Phone className="w-3.5 h-3.5 text-green-600" /> (61) 99661-3292
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

