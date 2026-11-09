"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Check,
  Copy,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  ShoppingBag,
  Zap,
  Award,
  Heart,
  ChevronUp,
  ChevronDown,
  Gift,
  X
} from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import ProtectedProductImage from "./ProtectedProductImage";
import ProductReviewsSection from "./ProductReviewsSection";
import StickyAddToCartBar from "./StickyAddToCartBar";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailView({ product, onBack }: ProductDetailProps) {
  const { blackFridayMode, addToCart, freeShippingThreshold } = useStore();

  const [activeImage, setActiveImage] = useState<string>(
    product.galleryImages?.[0] || product.imageUrl || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || "Preto Obsidian"
  );
  const [selectedVersion, setSelectedVersion] = useState<string>("Versão Padrão Homologada");
  const [copiedCoupon, setCopiedCoupon] = useState<boolean>(false);
  const [cepInput, setCepInput] = useState<string>("");
  const [shippingResult, setShippingResult] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  // Garante que ao abrir a página do produto o scroll esteja cravado no topo absoluto
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [product.id]);

  const activePrice = blackFridayMode ? product.bfSalePrice : product.baseSalePrice;
  const pixPrice = (activePrice * 0.9).toFixed(2);
  const discountPercent = Math.round(
    ((product.compareAtPrice - activePrice) / product.compareAtPrice) * 100
  );
  const installment12x = (activePrice / 12).toFixed(2);

  const images = product.galleryImages || [product.imageUrl || ""];

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("PLAYTECH10");
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleCalcShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cepInput.trim()) return;

    if (activePrice >= freeShippingThreshold) {
      setShippingResult("🎉 FRETE GRÁTIS via Correios Sedex (Entrega expressa em 2 a 4 dias úteis)");
    } else {
      setShippingResult("🚚 Correios PAC: R$ 24,90 (4 a 6 dias) | Sedex: R$ 38,50 (2 dias úteis)");
    }
  };

  return (
    <div className="space-y-8 py-4 pb-20 relative">
      {/* ========================================================
          1. BREADCRUMB & CONTROLES SUPERIORES
      ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <span>/</span>
          <span>home</span>
          <span>/</span>
          <span>{product.category.toLowerCase()}</span>
          <span>/</span>
          <span className="font-semibold text-gray-900 dark:text-white truncate max-w-xs">
            {product.slug || product.storefrontTitle.toLowerCase()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition text-xs font-bold ${
              isFavorite
                ? "bg-red-50 border-red-300 text-red-600 dark:bg-red-900/20 dark:border-red-700"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            <span>{isFavorite ? "Salvo" : "Favoritar"}</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          2. GRID PRINCIPAL — GALERIA + BUY BOX
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-10 shadow-sm relative">

        {/* ========================================================
            COLUNA ESQUERDA: GALERIA COM MINIATURAS VERTICAIS
        ======================================================== */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
            
            {/* Tira de Miniaturas */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[460px] scrollbar-none shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition p-1 bg-gray-50 dark:bg-gray-700 shrink-0 ${
                    activeImage === img
                      ? "border-blue-500 shadow-md scale-105"
                      : "border-gray-200 dark:border-gray-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </button>
              ))}
            </div>

            {/* Imagem Principal com Protetor Anti-Pirataria */}
            <div className="flex-1 w-full aspect-square max-h-[500px] rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center relative p-8">
              <ProtectedProductImage
                src={activeImage}
                alt={product.storefrontTitle}
                aspectClass="w-full h-full"
                className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105 drop-shadow-xl"
              />

              {/* Badge Desconto */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-30">
                -{discountPercent}% OFF
              </div>

              {/* Badge Promoção */}
              <div className="absolute top-4 right-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-30">
                Oferta PlayTech
              </div>
            </div>
          </div>

          {/* ========================================================
              FAIXA DE PROPOSIÇÕES DE VALOR
          ======================================================== */}
          <div className="w-full mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Garantia de 1 ano</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-green-600" />
              <span>Frete grátis* acima de R$ 250</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Até 10% OFF pagando com PIX</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUNA DIREITA: BUY BOX ESTILO MOTOROLA
        ======================================================== */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Header da Marca & Avaliações */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black tracking-widest uppercase text-blue-600 dark:text-blue-400">
                PLAYTECH · IMPORTADOS
              </span>
              <a
                href="#avaliacoes"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("avaliacoes")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1 text-amber-500 text-xs font-bold hover:opacity-80 transition cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span className="text-gray-900 dark:text-white">{product.rating || 4.9}</span>
                <span className="text-gray-400 dark:text-gray-500 underline">
                  ({product.reviewsCount || 153} Avaliações)
                </span>
              </a>
            </div>

            {/* Título */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
              {product.storefrontTitle}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {product.shortHeadline}
            </p>
          </div>

          {/* ========================================================
              BLOCO DE PREÇO
          ======================================================== */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 dark:text-gray-500 line-through">
                R$ {product.compareAtPrice.toFixed(2)}
              </span>
              <span className="text-xs font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                -{discountPercent}%
              </span>
            </div>

            {/* Preço em Destaque */}
            <div>
              <span className="text-xs text-gray-600 dark:text-gray-300 mr-1 font-bold">Por</span>
              <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                R$ {pixPrice}
              </span>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-2">
                à vista via PIX (-10%) ou 1x no cartão
              </span>
            </div>

            {/* Parcelamento */}
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              ou até <strong className="text-gray-900 dark:text-white">12x de R$ {installment12x}</strong> sem juros
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              Total a prazo: R$ {activePrice.toFixed(2)}
            </p>
          </div>

          {/* ========================================================
              PONTOS DE FIDELIDADE
          ======================================================== */}
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3.5 py-2 rounded-2xl text-xs font-bold">
            <Award className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Ganhe até {Math.round(activePrice)} pontos PlayTech Fidelidade</span>
          </div>

          {/* ========================================================
              CUPOM INTERATIVO
          ======================================================== */}
          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                  CUPOM:
                </span>
                <span className="font-mono font-black text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-600 tracking-wider">
                  PLAYTECH10
                </span>
              </div>
              <button
                onClick={handleCopyCoupon}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition flex items-center gap-1 shadow-sm"
              >
                {copiedCoupon ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCoupon ? "Copiado!" : "Copiar cupom"}</span>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              O cupom deverá ser adicionado na próxima página no checkout.
            </p>
          </div>

          {/* Link Formas de Pagamento */}
          <div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Ver todas as formas de pagamento</span>
            </button>
          </div>

          {/* ========================================================
              SELETORES: VERSÃO & COR
          ======================================================== */}
          <div className="space-y-4 pt-1">
            {/* Seletor de Versão */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                Selecione a versão:
              </label>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-xs font-bold text-gray-900 dark:text-white outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Versão Padrão Homologada">Versão Padrão Homologada (Pronta Entrega)</option>
                <option value="Kit Turbo Acessórios VIP">Kit Turbo + Cabos Reforçados e Brinde</option>
                <option value="Combo Garantia Estendida 2 Anos">Combo com Garantia Estendida de 2 Anos</option>
              </select>
            </div>

            {/* Seletor de Cores */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                Cor: <strong className="text-gray-900 dark:text-white">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-2.5">
                {(product.colors && product.colors.length > 0
                  ? product.colors
                  : [
                      { name: "Preto Obsidian", hex: "#18181B" },
                      { name: "Verde Oliva Tech", hex: "#4B5320" },
                      { name: "Branco Glacial", hex: "#E4E4E7" }
                    ]
                ).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`h-8 w-8 rounded-full border-2 transition-all p-0.5 flex items-center justify-center ${
                      selectedColor === c.name
                        ? "border-blue-500 scale-110 shadow-md"
                        : "border-gray-300 dark:border-gray-600 opacity-80 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              BOTÃO DE COMPRA PRINCIPAL
          ======================================================== */}
          <div className="pt-2">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-4 text-sm sm:text-base bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-black rounded-full flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>COMPRAR</span>
            </button>
          </div>

          {/* ========================================================
              CÁLCULO DE FRETE E PRAZO
          ======================================================== */}
          <form
            onSubmit={handleCalcShipping}
            className="space-y-2 text-xs pt-3 border-t border-gray-200 dark:border-gray-600"
          >
            <label className="text-gray-700 dark:text-gray-300 font-bold block">
              Calcular frete e prazo:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Informe seu CEP"
                maxLength={9}
                value={cepInput}
                onChange={(e) => setCepInput(e.target.value)}
                className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 font-mono text-xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full font-black bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white transition uppercase text-[11px] tracking-wider"
              >
                CALCULAR
              </button>
            </div>
            {shippingResult && (
              <p className="text-xs font-bold text-green-600 dark:text-green-400 pt-1 animate-in fade-in">
                {shippingResult}
              </p>
            )}
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 dark:text-gray-500 underline block"
            >
              Não sei meu CEP
            </a>
          </form>
        </div>
      </div>

      {/* ========================================================
          SEÇÃO COMPLETA E FUNCIONAL DE AVALIAÇÕES DE CLIENTES
      ======================================================== */}
      <ProductReviewsSection product={product} />

      {/* ========================================================
          STICKY SIDE BADGE "GANHE ATÉ R$ 200"
      ======================================================== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <a
          href="#newsletter"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-3 py-4 rounded-l-2xl shadow-xl flex flex-col items-center gap-1 hover:translate-x-[-4px] transition-transform cursor-pointer text-center"
        >
          <Gift className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400">GANHE</span>
          <span className="text-[11px] font-black text-amber-500 leading-tight">&lt; ATÉ R$ 200</span>
        </a>
      </div>

      {/* ========================================================
          MODAL: FORMAS DE PAGAMENTO
      ======================================================== */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowPaymentModal(false)}
            className="fixed inset-0 bg-black/60 animate-in fade-in"
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 className="text-base font-black text-gray-900 dark:text-white">
                Formas de Pagamento Homologadas
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <span className="font-black text-green-700 dark:text-green-400 block mb-1">
                  ⚡ PIX Instantâneo (10% de Desconto Adicional):
                </span>
                <p className="text-gray-700 dark:text-gray-300 font-bold">
                  R$ {pixPrice} à vista com aprovação imediata em até 10 segundos.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  💳 Cartão de Crédito (Até 12x Sem Juros):
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  Aceitamos Visa, Mastercard, Elo, Hipercard e American Express. 12 parcelas de R$ {installment12x} sem juros.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  🏢 Boleto Bancário ou Faturamento CNPJ:
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  Vencimento em 1 dia útil para boleto à vista. Para faturamento PJ no boleto 28 dias, consulte nosso setor comercial.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-2.5 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold text-xs cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Floating Sticky "Comprar Rápido" ao Rolar */}
      <StickyAddToCartBar product={product} />
    </div>
  );
}
