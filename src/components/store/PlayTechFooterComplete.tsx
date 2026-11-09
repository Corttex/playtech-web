"use client";

import React, { useState, useEffect } from "react";
import {
  Truck,
  ShieldCheck,
  Headset,
  SearchCheck,
  MessageCircle,
  Mail,
  Send,
  MapPin,
  Clock,
  Phone,
  Lock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Instagram,
  Facebook,
} from "lucide-react";
import layoutConfig from "@/data/playtech-layout-config.json";
import { useStore } from "@/store/useStore";
import ReturnsWarrantyModal from "./ReturnsWarrantyModal";
import ShippingRulesModal from "./ShippingRulesModal";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import FaqsModal from "./FaqsModal";

export default function PlayTechFooterComplete() {
  const { setSelectedCategory, setSelectedProductForDetail, setActiveView } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [cookieDismissed, setCookieDismissed] = useState(true);

  // Leitura do consentimento de cookies persistido em localStorage e document.cookie
  useEffect(() => {
    try {
      const hasLocal = typeof window !== "undefined" && localStorage.getItem("playtech_cookie_consent") === "true";
      const hasCookie = typeof document !== "undefined" && document.cookie.includes("playtech_cookie_consent=true");
      if (!hasLocal && !hasCookie) {
        setCookieDismissed(false);
      }
    } catch {
      // Caso storage esteja bloqueado, fallback seguro
      setCookieDismissed(false);
    }
  }, []);

  const handleDismissCookie = () => {
    setCookieDismissed(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("playtech_cookie_consent", "true");
      }
      if (typeof document !== "undefined") {
        document.cookie = "playtech_cookie_consent=true; path=/; max-age=31536000; SameSite=Lax";
      }
    } catch {
      // Ignora erro de storage privado
    }
  };

  // Modais individuais dedicados
  const [returnsModalOpen, setReturnsModalOpen] = useState(false);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [faqsModalOpen, setFaqsModalOpen] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
  };

  const goCategory = (name: string) => {
    const upper = name.toUpperCase();
    setSelectedProductForDetail(null);

    let targetCategory = "TODOS";
    if (upper.includes("PROJETOR") || upper.includes("CÂMERA") || upper.includes("CAMERA")) targetCategory = "Projetores & Câmeras";
    else if (upper.includes("SMARTWATCH")) targetCategory = "Smartwatches";
    else if (upper.includes("JOGO") || upper.includes("GAMING") || upper.includes("RETRÔ") || upper.includes("RETRO")) targetCategory = "Gaming & Retrô";
    else if (upper.includes("ÁUDIO") || upper.includes("AUDIO") || upper.includes("SOM")) targetCategory = "Áudio & Som";
    else if (upper.includes("ILUMINA")) targetCategory = "Iluminação";
    else if (upper.includes("INFORMÁTICA") || upper.includes("INFORMATICA")) targetCategory = "Informática";
    else if (upper.includes("CARREGADOR") || upper.includes("CABO")) targetCategory = "Carregadores e Cabos";
    else if (upper.includes("AUTOMOTIVO")) targetCategory = "Automotivo e Acessórios";
    else if (upper.includes("COZINHA") || upper.includes("ELETRO") || upper.includes("CASA") || upper.includes("UTILIDADE") || upper.includes("FERRAMENTA")) targetCategory = "Casa & Utensílios";

    setSelectedCategory(targetCategory);
    setActiveView(targetCategory === "TODOS" ? "STORE" : "DEPARTMENT");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="mt-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">

        {/* ── 1. FAIXA AZUL DE GARANTIAS ── */}
        <div className="bg-blue-700 dark:bg-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Frete Grátis", desc: "Compras acima de R$ 250,00 para todo o Brasil via Correios." },
              { icon: SearchCheck, title: "Pedido Monitorado", desc: "Rastreio via WhatsApp e SMS com seguro total de transporte." },
              { icon: Headset, title: "Atendimento Brasília", desc: "Suporte humanizado via WhatsApp (61) 99661-3292." },
              { icon: ShieldCheck, title: "Compra Segura", desc: "SSL 256 bits e Gateway Oficial Mercado Pago." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/15 border border-white/20 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{title}</h4>
                  <p className="text-xs text-blue-100 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. DIRETÓRIO DE CATEGORIAS ── */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Departamentos &amp; Catálogo
              </h3>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                330+ SKUs
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {layoutConfig.categoriesDirectoryBar.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => goCategory(cat.name)}
                  className="pill-category px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. QUATRO COLUNAS INSTITUCIONAIS ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Sobre */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900 dark:text-white">
                PLAY<span className="text-blue-600">TECH</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                STORE
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {layoutConfig.brand.institutionalDescription}
            </p>
            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Quadra QE 38 Conj. G, Guará II, Brasília - DF</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Seg–Sex 08h–18h · Sáb 08h–13h</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <a
                  href="https://wa.me/5561996613292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 font-semibold text-green-700 dark:text-green-500"
                >
                  (61) 99661-3292
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <a
                  href="mailto:comercial@playtech.com.br"
                  className="hover:underline font-semibold text-blue-600 dark:text-blue-400"
                >
                  comercial@playtech.com.br
                </a>
              </div>
            </div>

            {/* Redes Sociais Oficiais */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={layoutConfig.brand.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition"
                aria-label="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={layoutConfig.brand.contacts.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition"
                aria-label="Facebook Oficial"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5561996613292"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition"
                aria-label="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              Clube VIP
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Receba cupons antecipados de Black Friday e ofertas exclusivas.
            </p>
            {!newsletterSent ? (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-blue-500 transition"
                />
                <button
                  type="submit"
                  className="w-full btn-primary py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  CADASTRAR E GANHAR <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-xs font-semibold text-green-700 dark:text-green-400">
                ✅ Cadastrado! Use o cupom <strong>PLAYTECH10</strong>.
              </div>
            )}
          </div>

          {/* Para empresas B2B */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              Vendas Corporativas
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Condições especiais para CNPJ, atacado e revendas de tecnologia.
            </p>
            <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
              {["Emissão de DANFE / XML", "Preços de revendedor", "Atendimento B2B dedicado"].map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="mailto:empresas@playtechbr.com.br"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              empresas@playtechbr.com.br
            </a>
          </div>

          {/* Ajuda */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              Ajuda &amp; Institucional
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://rastreamento.correios.com.br/app/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span>Rastrear meu pedido (Correios Direto)</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setReturnsModalOpen(true)}
                  className="flex items-center justify-between w-full text-left hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                >
                  <span>Política de trocas e garantia</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShippingModalOpen(true)}
                  className="flex items-center justify-between w-full text-left hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                >
                  <span>Prazos e Regras de Entrega</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="flex items-center justify-between w-full text-left hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer font-bold text-gray-700 dark:text-gray-300"
                >
                  <span>Política de Privacidade (LGPD)</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setFaqsModalOpen(true)}
                  className="flex items-center justify-between w-full text-left hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                >
                  <span>Perguntas Frequentes (FAQs)</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              </li>
              <li>
                <a
                  href="/painel"
                  className="flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold hover:underline pt-1"
                >
                  <span>Painel Admin (/painel)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── 4. BARRA INFERIOR LEGAL & BANDEIRAS DE PAGAMENTO SEGURO ── */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
            
            {/* Bloco Pagamento Seguro + Bandeiras + PIX + Selos de Confiança */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-200/80 dark:border-gray-700/80">
              
              {/* Pagamento Seguro & Bandeiras */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 flex items-center gap-1.5 mr-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Pagamento Seguro:
                </span>

                {/* Símbolo PIX Oficial */}
                <div className="flex items-center gap-1.5 bg-[#32BCAD]/10 border border-[#32BCAD]/40 px-2.5 py-1 rounded-lg text-[#008f80] dark:text-[#32BCAD] font-black text-xs shadow-2xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
                    <path d="M404.7 131.5L343.9 70.7c-9.4-9.4-24.6-9.4-33.9 0L256 124.7l-54-54c-9.4-9.4-24.6-9.4-33.9 0l-60.8 60.8c-9.4 9.4-9.4 24.6 0 33.9l54 54-54 54c-9.4 9.4-9.4 24.6 0 33.9l60.8 60.8c9.4 9.4 24.6 9.4 33.9 0l54-54 54 54c9.4 9.4 24.6 9.4 33.9 0l60.8-60.8c9.4-9.4 9.4-24.6 0-33.9l-54-54 54-54c9.4-9.4 9.4-24.6 0-33.9zM256 220.1l-35.9-35.9 35.9-35.9 35.9 35.9L256 220.1zm0 71.8l-35.9-35.9 35.9-35.9 35.9 35.9-35.9 35.9z"/>
                  </svg>
                  <span>PIX</span>
                </div>

                {/* Visa */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-lg flex items-center justify-center font-black tracking-tighter text-[11px] text-[#1A1F71] dark:text-[#4B68FF] shadow-2xs">
                  VISA
                </div>

                {/* Mastercard */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-lg flex items-center justify-center gap-1 shadow-2xs">
                  <div className="flex -space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#EB001B] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#F79E1B] inline-block opacity-90" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 ml-0.5">Mastercard</span>
                </div>

                {/* Elo */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-lg flex items-center justify-center font-black text-[11px] text-gray-900 dark:text-white shadow-2xs">
                  elo
                </div>

                {/* American Express */}
                <div className="bg-[#002663] text-white px-2 py-1 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-2xs">
                  AMEX
                </div>

                {/* Hipercard */}
                <div className="bg-[#B3141A] text-white px-2 py-1 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-2xs">
                  Hipercard
                </div>

                {/* Boleto Bancário */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-lg flex items-center justify-center text-[10px] font-semibold text-gray-600 dark:text-gray-300 shadow-2xs">
                  Boleto
                </div>
              </div>

              {/* Selos de Segurança Técnicos (SSL, Google, Asaas/Mercado Pago) */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { icon: Lock, label: "SSL 256-BIT", color: "text-blue-500" },
                  { icon: ShieldCheck, label: "GOOGLE SITE SEGURO", color: "text-emerald-500" },
                  { icon: CheckCircle2, label: "MERCADO PAGO", color: "text-blue-600" },
                  { icon: CheckCircle2, label: "ASAAS PROTECTED", color: "text-purple-600" },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2.5 py-1 rounded-lg shadow-2xs"
                  >
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* CNPJ e Direitos Reservados */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] text-gray-500 dark:text-gray-400">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                © {new Date().getFullYear()} {layoutConfig.brand.legalName} · CNPJ {layoutConfig.brand.cnpj}
              </p>
              <p>Quadra QE 38 Conjunto G, Lote 19 · Guará II · Brasília - DF · CEP 71.070-072</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── BOTÃO WHATSAPP FLUTUANTE ── */}
      <a
        href="https://wa.me/5561996613292?text=Ol%C3%A1%20PlayTech!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#1db954] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          Fale Conosco
        </span>
      </a>

      {/* ── AVISO DE COOKIES ── */}
      {!cookieDismissed && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto rounded-t-xl">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Utilizamos cookies para melhorar sua experiência e proteger seus dados conforme a LGPD.{" "}
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="underline font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Política de Privacidade
            </button>
          </p>
          <button
            onClick={handleDismissCookie}
            className="px-5 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs shrink-0 hover:opacity-90 active:scale-95 transition cursor-pointer"
          >
            ENTENDI
          </button>
        </div>
      )}

      {/* Popups Individuais Especializados */}
      <ReturnsWarrantyModal
        isOpen={returnsModalOpen}
        onClose={() => setReturnsModalOpen(false)}
      />

      <ShippingRulesModal
        isOpen={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <FaqsModal
        isOpen={faqsModalOpen}
        onClose={() => setFaqsModalOpen(false)}
      />
    </>
  );
}
