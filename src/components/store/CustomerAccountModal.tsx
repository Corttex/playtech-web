"use client";

import React, { useState } from "react";
import {
  Package,
  MapPin,
  User,
  Heart,
  LogOut,
  FileText,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  HelpCircle,
  MessageCircle,
  X
} from "lucide-react";
import { useStore } from "@/store/useStore";

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerAccountModal({ isOpen, onClose }: CustomerAccountModalProps) {
  const [activeTab, setActiveTab] = useState<
    "PAINEL" | "PEDIDOS" | "ENDERECO" | "DETALHES" | "WISHLIST" | "AUTOATENDIMENTO"
  >("PAINEL");

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sampleOrders = [
    {
      id: "PT-94281",
      date: "02/11/2026",
      status: "Em Trânsito via Sedex",
      statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      trackingCode: "BR942810423BR",
      total: 499.90,
      paymentMethod: "PIX",
      nfeKey: "35261102938102938472550010000010431092837499",
      items: [
        {
          name: "Mini Projetor Smart HY320 4K Android TV",
          qty: 1,
          price: 499.90,
          img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=100&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "PT-88310",
      date: "18/10/2026",
      status: "Entregue ao Destinatário",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
      trackingCode: "BR883109211BR",
      total: 199.90,
      paymentMethod: "Cartão de Crédito (3x)",
      nfeKey: "35261018938102938472550010000008831092837111",
      items: [
        {
          name: "Console Game Stick X3 Pro Ultra HD 8K",
          qty: 1,
          price: 199.90,
          img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&auto=format&fit=crop&q=80",
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Principal */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row h-[85vh] max-h-[720px] animate-in zoom-in-95 duration-150">
        
        {/* ========================================================
            BARRA LATERAL / MENU DO CLIENTE (EXATAMENTE COMO O PRINT)
        ======================================================== */}
        <aside className="w-full md:w-64 bg-gray-50 dark:bg-black/40 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-4 sm:p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* Header Usuário */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                F
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  Fellipe Oliveira
                </h4>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block truncate">
                  fellipe@playtechbr.com.br
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                  Cliente VIP PlayTech
                </span>
              </div>
            </div>

            {/* Menu de Navegação */}
            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("PAINEL")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                  activeTab === "PAINEL"
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Package className="w-4 h-4" /> Painel Geral
              </button>

              <button
                onClick={() => setActiveTab("PEDIDOS")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition text-left ${
                  activeTab === "PEDIDOS"
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Truck className="w-4 h-4" /> Meus Pedidos
                </span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full font-bold">
                  2
                </span>
              </button>

              <button
                onClick={() => setActiveTab("ENDERECO")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                  activeTab === "ENDERECO"
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <MapPin className="w-4 h-4" /> Endereços de Entrega
              </button>

              <button
                onClick={() => setActiveTab("DETALHES")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                  activeTab === "DETALHES"
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <User className="w-4 h-4" /> Detalhes da Conta
              </button>

              <button
                onClick={() => setActiveTab("WISHLIST")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition text-left ${
                  activeTab === "WISHLIST"
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-4 h-4" /> Lista de Desejos
                </span>
                <span className="text-[10px] bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 px-1.5 py-0.5 rounded-full font-bold">
                  1
                </span>
              </button>

              <button
                onClick={() => setActiveTab("AUTOATENDIMENTO")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left ${
                  activeTab === "AUTOATENDIMENTO"
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                }`}
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" /> Autoatendimento &amp; Trocas
              </button>
            </nav>
          </div>

          {/* Botão Sair */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={onClose}
              className="w-full flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 p-2 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" /> Sair da Conta
            </button>
          </div>
        </aside>

        {/* ========================================================
            CONTEÚDO DINÂMICO DA MINHA CONTA
        ======================================================== */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {activeTab === "PAINEL" && "Painel do Cliente"}
                {activeTab === "PEDIDOS" && "Histórico & Rastreamento em Tempo Real"}
                {activeTab === "ENDERECO" && "Seus Endereços Salvos"}
                {activeTab === "DETALHES" && "Dados Cadastrais & Segurança"}
                {activeTab === "WISHLIST" && "Produtos Salvos"}
                {activeTab === "AUTOATENDIMENTO" && "Central de Ajuda & Autoatendimento"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Consulte notas fiscais, rastreios dos Correios e gerencie seus pedidos sem filas.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* TAB 1: PAINEL GERAL RESUMIDO */}
          {activeTab === "PAINEL" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                    Pedidos Ativos
                  </span>
                  <div className="text-2xl font-black text-blue-900 dark:text-blue-100">1 a caminho</div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">Previsão: 2 dias úteis</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                    Garantia PlayTech
                  </span>
                  <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100">100% Coberto</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Certificado Nacional A1</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 space-y-1">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                    Cashback Acumulado
                  </span>
                  <div className="text-2xl font-black text-amber-900 dark:text-amber-100">R$ 50,00</div>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400">Disponível no próximo pedido</span>
                </div>
              </div>

              {/* Último Pedido em Destaque */}
              <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-gray-400 tracking-wider">
                    Último Pedido em Andamento
                  </span>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    Em Trânsito
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=120&auto=format&fit=crop&q=80"
                    alt="HY320"
                    className="w-16 h-16 rounded-xl object-contain bg-gray-50 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      Mini Projetor Smart HY320 4K Android TV
                    </h4>
                    <span className="text-xs text-gray-500 font-mono">Pedido #PT-94281</span>
                    <div className="text-xs font-black text-emerald-600 mt-0.5">R$ 499,90 via PIX</div>
                  </div>
                  <button
                    onClick={() => setActiveTab("PEDIDOS")}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs font-bold transition shrink-0"
                  >
                    Ver Rastreio
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PEDIDOS COM RASTREIO E NFE */}
          {activeTab === "PEDIDOS" && (
            <div className="space-y-4">
              {sampleOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div>
                      <span className="text-xs font-mono font-black text-gray-900 dark:text-white">
                        Pedido {order.id}
                      </span>
                      <span className="text-[11px] text-gray-400 ml-2">Feito em {order.date}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Itens */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-contain bg-gray-50 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h5>
                          <span className="text-[11px] text-gray-400">
                            Quantidade: {item.qty} &bull; R$ {item.price.toFixed(2)} cada
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Barra de Código de Rastreio dos Correios */}
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-600 dark:text-gray-300">Rastreio Correios:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">
                        {order.trackingCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(order.trackingCode)}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 font-bold text-[11px] text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-1 transition"
                      >
                        {copiedCode === order.trackingCode ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        {copiedCode === order.trackingCode ? "Copiado!" : "Copiar"}
                      </button>

                      <a
                        href={`https://rastreamento.correios.com.br/app/index.php?objeto=${order.trackingCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 transition"
                      >
                        Rastrear <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* NFe e Total */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Chave DANFE emitida via Sefaz</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-gray-400">Total Pago ({order.paymentMethod}):</span>{" "}
                      <strong className="text-sm font-black text-gray-900 dark:text-white">
                        R$ {order.total.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ENDEREÇOS */}
          {activeTab === "ENDERECO" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Endereço Principal de Entrega
                  </span>
                  <span className="text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-2 py-0.5 rounded-full">
                    Padrão
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Fellipe Oliveira
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Av. Paulista, 1000 - Apto 82 &bull; Bela Vista<br />
                  São Paulo - SP &bull; CEP: 01310-100
                </p>
                <p className="text-xs text-gray-500">Telefone: (11) 98765-4321</p>
              </div>
            </div>
          )}

          {/* TAB 4: DETALHES DA CONTA */}
          {activeTab === "DETALHES" && (
            <form className="space-y-4 text-xs max-w-lg">
              <div>
                <label className="text-gray-600 dark:text-gray-400 block mb-1 font-semibold">Nome Completo:</label>
                <input
                  type="text"
                  defaultValue="Fellipe Oliveira"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-gray-900 dark:text-white font-medium outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-600 dark:text-gray-400 block mb-1 font-semibold">E-mail Cadastrado:</label>
                <input
                  type="email"
                  defaultValue="fellipe@playtechbr.com.br"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-gray-900 dark:text-white font-medium outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-600 dark:text-gray-400 block mb-1 font-semibold">CPF (Para emissão de Nota Fiscal):</label>
                <input
                  type="text"
                  defaultValue="123.456.789-00"
                  disabled
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-gray-400 font-mono outline-none cursor-not-allowed"
                />
              </div>

              <button
                type="button"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-sm"
              >
                Salvar Alterações
              </button>
            </form>
          )}

          {/* TAB 5: LISTA DE DESEJOS */}
          {activeTab === "WISHLIST" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&auto=format&fit=crop&q=80"
                    alt="Fone Sabala"
                    className="w-12 h-12 rounded-lg object-contain bg-gray-50 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                      Fone de Ouvido Bluetooth Sabala TWS
                    </h5>
                    <span className="text-xs font-black text-emerald-600">R$ 149,90</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs">
                  Comprar
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: AUTOATENDIMENTO INTELIGENTE (EVITA SUPORTE HUMANO) */}
          {activeTab === "AUTOATENDIMENTO" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Resolva em 1 Minuto sem Fila
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  98% das dúvidas são resolvidas diretamente por aqui com emissão automática de 2ª via ou código de postagem reversa.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-600" /> Troca Fácil ou Devolução em 7 Dias
                  </h4>
                  <p className="text-gray-500">
                    Comprou e não gostou ou produto apresentou avaria? Gere um código de postagem gratuita dos Correios direto na sua tela.
                  </p>
                  <button className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 font-bold text-gray-800 dark:text-gray-200 transition">
                    Solicitar Etiqueta de Postagem Reversa
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" /> 2ª Via da Nota Fiscal Eletrônica (DANFE em PDF)
                  </h4>
                  <p className="text-gray-500">
                    O XML e o PDF da NFe oficial emitida via Sefaz estão sempre disponíveis para download a qualquer momento.
                  </p>
                  <button className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 font-bold text-gray-800 dark:text-gray-200 transition">
                    Baixar PDF do Pedido Recente
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-600" /> Ainda precisa de ajuda com um atendente?
                  </h4>
                  <p className="text-gray-500">
                    Nosso suporte técnico no WhatsApp atende de Segunda a Sexta das 09h às 18h.
                  </p>
                  <a
                    href="https://wa.me/5561996613292?text=Ol%C3%A1%2C+preciso+de+ajuda+com+meu+pedido"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition shadow-xs"
                  >
                    Falar com Atendente no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

