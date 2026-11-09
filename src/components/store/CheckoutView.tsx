"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Truck,
  FileCheck2,
  Lock,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  Info
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function CheckoutView({ onBack }: { onBack: () => void }) {
  const { cart, freeShippingThreshold } = useStore();

  // Método de pagamento Asaas
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD">("PIX");
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [installments, setInstallments] = useState<number>(1);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cadastro Inicial Simples: Nome, Telefone, Email, CPF
  const [customer, setCustomer] = useState({
    name: "Fellipe Oliveira",
    email: "fellipe@playtechbr.com.br",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    // Campos opcionais complementares
    cep: "",
    street: "",
    number: "",
    complement: "",
    bairro: "",
    city: "",
    state: "SP",
  });

  // Dados do Cartão
  const [cardData, setCardData] = useState({
    number: "",
    holderName: "",
    expiry: "",
    cvv: "",
  });

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  }, [cart]);

  const freeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = freeShipping ? 0 : 24.90;
  
  // 5% de desconto no PIX
  const pixDiscount = paymentMethod === "PIX" ? (cartSubtotal * 0.05) : 0;
  const totalAmount = Math.max(0, cartSubtotal + shippingCost - pixDiscount);

  // PIX Payload dinâmico Asaas
  const [dynamicPixPayload, setDynamicPixPayload] = useState(
    "00020126580014br.gov.bcb.pix0136asaas-playtech-store-hub5204000053039865407" +
      totalAmount.toFixed(2) +
      "5802BR5915Playtech Brasil6009Sao Paulo62070503***6304C8A1"
  );
  const [pixQrCodeImg, setPixQrCodeImg] = useState<string | null>(null);

  // Formatação de Máscaras
  const formatCPF = (val: string) => {
    return val
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatPhone = (val: string) => {
    return val
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2")
      .slice(0, 15);
  };

  const formatCardNumber = (val: string) => {
    return val
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .slice(0, 19);
  };

  const formatExpiry = (val: string) => {
    return val
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(dynamicPixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validação estrita dos 4 campos do cadastro inicial
    if (!customer.name.trim()) {
      setErrorMessage("Por favor, preencha o Nome Completo.");
      return;
    }
    if (!customer.phone.trim()) {
      setErrorMessage("Por favor, preencha o Telefone / WhatsApp.");
      return;
    }
    if (!customer.email.trim() || !customer.email.includes("@")) {
      setErrorMessage("Por favor, informe um E-mail válido.");
      return;
    }
    if (!customer.cpf.trim() || customer.cpf.replace(/\D/g, "").length < 11) {
      setErrorMessage("Por favor, informe um CPF válido (11 dígitos).");
      return;
    }

    if (paymentMethod === "CREDIT_CARD") {
      if (!cardData.number || !cardData.holderName || !cardData.expiry || !cardData.cvv) {
        setErrorMessage("Por favor, preencha todos os dados do cartão de crédito.");
        return;
      }
    }

    setIsProcessing(true);

    try {
      const [expMonth, expYear] = cardData.expiry.split("/");

      const res = await fetch("/api/payments/asaas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          cpf: customer.cpf,
          paymentMethod,
          amount: totalAmount,
          installments,
          creditCard: paymentMethod === "CREDIT_CARD" ? {
            holderName: cardData.holderName,
            number: cardData.number,
            expiryMonth: expMonth || "12",
            expiryYear: expYear ? (expYear.length === 2 ? `20${expYear}` : expYear) : "2028",
            ccv: cardData.cvv
          } : undefined,
          address: showAddressFields ? {
            cep: customer.cep,
            street: customer.street,
            number: customer.number,
            state: customer.state
          } : undefined,
          items: cart.map(i => ({ id: i.id, title: i.product.storefrontTitle, price: i.selectedPrice, quantity: i.quantity }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro no processamento do Asaas");
      }

      if (paymentMethod === "PIX") {
        if (data.pixPayload) {
          setDynamicPixPayload(data.pixPayload);
        }
        if (data.pixQrCodeBase64) {
          setPixQrCodeImg(`data:image/png;base64,${data.pixQrCodeBase64}`);
        }
      }

      // Conclui pedido
      setOrderCompleted(true);
    } catch (err: any) {
      console.error("Erro no checkout:", err);
      setErrorMessage(err.message || "Houve um problema com o gateway Asaas. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass =
    "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs transition placeholder:text-gray-400";
  const labelClass = "text-gray-700 dark:text-gray-300 block mb-1 text-xs font-semibold";

  if (orderCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6 text-center animate-in fade-in">
        <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-700">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Gateway Asaas Integrado
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Pedido Gerado com Sucesso!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Obrigado, <strong className="text-gray-900 dark:text-white">{customer.name}</strong>. Cobrança processada com segurança pelo gateway <strong className="text-blue-600">Asaas</strong>.
          </p>
        </div>

        {paymentMethod === "PIX" ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 text-left space-y-4 text-xs shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
              <span className="text-gray-500">Valor com Desconto PIX (5% OFF):</span>
              <span className="text-lg font-black text-green-600">
                R$ {totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="text-center py-2 space-y-3">
              <div className="inline-block p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                {pixQrCodeImg ? (
                  <img src={pixQrCodeImg} alt="QR Code PIX Asaas" className="w-44 h-44 mx-auto" />
                ) : (
                  <div className="w-44 h-44 bg-gray-50 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400">
                    <QrCode className="w-16 h-16 text-blue-600 mb-2" />
                    <span className="text-[10px] font-bold">QR Code Asaas Ativo</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">Abra o app do seu banco e aponte a câmera para o QR Code acima.</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-gray-700 dark:text-gray-300 block">Código Copia e Cola:</span>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 font-mono text-[11px]">
                <span className="truncate flex-1 text-gray-700 dark:text-gray-300">{dynamicPixPayload}</span>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-bold shrink-0 text-xs transition"
                >
                  {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPix ? "Copiado!" : "Copiar Chave"}
                </button>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-800 dark:text-blue-300 text-[11px] flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
              <span>Assim que você pagar, o Asaas avisa nosso servidor em até 10 segundos e seu comprovante é enviado ao WhatsApp <strong>{customer.phone}</strong>.</span>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left space-y-4 text-xs shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
              <span className="text-gray-500">Total Transacionado:</span>
              <span className="text-lg font-black text-gray-900 dark:text-white">
                R$ {totalAmount.toFixed(2)} ({installments}x de R$ {(totalAmount / installments).toFixed(2)})
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Transação Aprovada via Asaas Gateway
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-xs">
              A cobrança foi autorizada e os detalhes da compra foram encaminhados para o e-mail: <strong>{customer.email}</strong>.
            </p>
          </div>
        )}

        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left space-y-3 text-xs">
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <Truck className="w-4 h-4" />
            <span>Endereço de Entrega &amp; Rastreamento:</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {customer.street ? (
              <span>Entregar em: {customer.street}, {customer.number} {customer.complement && `- ${customer.complement}`} ({customer.city}/{customer.state}).</span>
            ) : (
              <span>Você optou por completar o endereço depois. Um link seguro foi enviado no WhatsApp <strong>{customer.phone}</strong> para você confirmar o local exato antes do despacho.</span>
            )}
          </p>
        </div>

        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-3 rounded-xl text-xs transition shadow-sm"
        >
          Voltar para a Loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      {/* Topo do Checkout */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Catálogo
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            <ShieldCheck className="w-3.5 h-3.5" /> Pagamentos Asaas
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-green-600 dark:text-green-400 font-bold">
            <Lock className="w-3.5 h-3.5" /> 256-bit SSL
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold animate-in fade-in">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna Esquerda: Cadastro Lean + Pagamento */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. CADASTRO INICIAL OTIMIZADO (Nome, Telefone, E-mail, CPF) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> 1. Cadastro Inicial Rápido
              </h3>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Apenas 4 Campos
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Preencha os dados essenciais para emissão fiscal no Asaas. O endereço completo você pode preencher agora ou depois.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Campo 1: Nome Completo */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lucas Henrique Silva"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* Campo 2: Telefone / WhatsApp */}
              <div>
                <label className={labelClass}>
                  WhatsApp / Celular <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="(11) 98765-4321"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: formatPhone(e.target.value) })}
                  className={inputClass}
                />
              </div>

              {/* Campo 3: E-mail */}
              <div>
                <label className={labelClass}>
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              {/* Campo 4: CPF */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  CPF <span className="text-red-500">*</span>
                  <span className="text-[10px] font-normal text-gray-400 ml-1.5">(exigido pelo Banco Central &amp; Asaas)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={customer.cpf}
                  onChange={(e) => setCustomer({ ...customer, cpf: formatCPF(e.target.value) })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Endereço Secundário (Opcional / Preencher Depois) */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setShowAddressFields(!showAddressFields)}
                className="flex items-center justify-between w-full py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {showAddressFields ? "Ocultar endereço de entrega (preencher depois)" : "+ Deseja informar o endereço de entrega agora? (Opcional)"}
                </span>
                {showAddressFields ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAddressFields && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 animate-in fade-in">
                  <div>
                    <label className={labelClass}>CEP:</label>
                    <input
                      type="text"
                      placeholder="00000-000"
                      value={customer.cep}
                      onChange={(e) => setCustomer({ ...customer, cep: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Rua / Logradouro:</label>
                    <input
                      type="text"
                      placeholder="Av. Paulista"
                      value={customer.street}
                      onChange={(e) => setCustomer({ ...customer, street: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Número:</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={customer.number}
                      onChange={(e) => setCustomer({ ...customer, number: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Complemento:</label>
                    <input
                      type="text"
                      placeholder="Apto 42"
                      value={customer.complement}
                      onChange={(e) => setCustomer({ ...customer, complement: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Estado (UF):</label>
                    <input
                      type="text"
                      placeholder="SP"
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value.toUpperCase() })}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. FORMA DE PAGAMENTO (ASAAS) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" /> 2. Pagamento Asaas
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-gray-500 font-bold">
                <span>Ambiente Seguro Asaas</span>
              </div>
            </div>

            {/* Seletores de Método */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("PIX")}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                  paymentMethod === "PIX"
                    ? "bg-blue-50/60 dark:bg-blue-900/30 border-blue-600 text-blue-950 dark:text-white font-bold ring-1 ring-blue-600"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${paymentMethod === "PIX" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs block font-bold">PIX Asaas</span>
                    <span className="text-[10px] text-green-600 font-bold">Aprovação imediata</span>
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-black border border-green-200">
                  -5% OFF
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("CREDIT_CARD")}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                  paymentMethod === "CREDIT_CARD"
                    ? "bg-blue-50/60 dark:bg-blue-900/30 border-blue-600 text-blue-950 dark:text-white font-bold ring-1 ring-blue-600"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${paymentMethod === "CREDIT_CARD" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs block font-bold">Cartão de Crédito</span>
                    <span className="text-[10px] text-gray-400">Até 12x no cartão</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              </button>
            </div>

            {/* Bloco PIX Info */}
            {paymentMethod === "PIX" && (
              <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Você economiza R$ {pixDiscount.toFixed(2)} pagando no PIX!</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-relaxed">
                  Ao clicar em <strong>Finalizar Pedido</strong>, o Asaas gerará um QR Code instantâneo com código Copia e Cola para você pagar diretamente no seu internet banking.
                </p>
              </div>
            )}

            {/* Bloco Cartão de Crédito */}
            {paymentMethod === "CREDIT_CARD" && (
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3.5 text-xs animate-in fade-in">
                <div>
                  <label className={labelClass}>Número do Cartão:</label>
                  <input
                    type="text"
                    required
                    placeholder="0000 0000 0000 0000"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Nome impresso no Cartão:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: LUCAS H SILVA"
                    value={cardData.holderName}
                    onChange={(e) => setCardData({ ...cardData, holderName: e.target.value.toUpperCase() })}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Validade (MM/AA):</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>CVV:</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Parcelamento Asaas:</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className={inputClass}
                  >
                    {[1, 2, 3, 4, 5, 6, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n}x de R$ {(totalAmount / n).toFixed(2)} sem juros
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Botão de Finalização */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>Processando com Asaas...</>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Finalizar Pedido com Asaas — R$ {totalAmount.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Coluna Direita: Resumo do Pedido */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-4 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 dark:text-white">Resumo do Pedido</h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-xs py-2 border-b border-gray-100 dark:border-gray-700">
                  <div className="pr-2">
                    <span className="font-bold text-gray-900 dark:text-white block line-clamp-1">
                      {item.quantity}x {item.product.storefrontTitle}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                      SKU: {item.product.sku}
                    </span>
                  </div>
                  <span className="font-black text-gray-900 dark:text-white shrink-0">
                    R$ {(item.selectedPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span className="text-gray-900 dark:text-white font-bold">R$ {cartSubtotal.toFixed(2)}</span>
              </div>

              {pixDiscount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400 font-bold">
                  <span>Desconto PIX (5%):</span>
                  <span>- R$ {pixDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Frete:</span>
                <span className={freeShipping ? "text-green-600 dark:text-green-400 font-bold" : "text-gray-900 dark:text-white font-bold"}>
                  {freeShipping ? "GRÁTIS (Acima de R$ 250)" : `R$ ${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="font-black text-gray-900 dark:text-white">Total:</span>
                <span className="font-black text-xl text-blue-600 dark:text-blue-400">
                  R$ {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Selos de Confiança e Asaas */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-200">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Ambiente Homologado Asaas Pagamentos</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Envio rápido com rastreio no WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>Nota Fiscal Eletrônica e garantia oficial PlayTech</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
