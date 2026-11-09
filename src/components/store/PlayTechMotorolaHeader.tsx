"use client";

import React, { useState, useMemo } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  Headset,
  Sun,
  Moon,
  ChevronDown,
  Gift,
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Check
} from "lucide-react";
import { useStore } from "@/store/useStore";
import layoutConfig from "@/data/playtech-layout-config.json";
import CustomerAccountModal from "./CustomerAccountModal";
import { motion } from "framer-motion";

export default function PlayTechMotorolaHeader() {
  const {
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    cart,
    toggleCart,
    setSelectedCategory,
    activeView,
    setActiveView,
    blackFridayMode,
    toggleBlackFridayMode,
    setSelectedProductForDetail,
    products,
  } = useStore();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [vipEmail, setVipEmail] = useState("");
  const [vipWhatsapp, setVipWhatsapp] = useState("");
  const [vipSuccess, setVipSuccess] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchPreviewResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((p) =>
        p.storefrontTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 4);
  }, [searchQuery, products]);

  const cartTotalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);

  // Mapeamento normalizado para garantir que qualquer clique em departamento encontre os produtos
  const normalizeDepartmentName = (name: string): string => {
    const upper = name.toUpperCase();
    if (upper.includes("PROJETOR") || upper.includes("CÂMERA") || upper.includes("CAMERA")) return "Projetores & Câmeras";
    if (upper.includes("SMARTWATCH")) return "Smartwatches";
    if (upper.includes("STICK") || upper.includes("CONSOLE") || upper.includes("VIDEO GAME") || upper.includes("VÍDEO GAME")) return "Stick & Video Games";
    if (upper.includes("JOGO") || upper.includes("GAMING") || upper.includes("RETRÔ") || upper.includes("RETRO") || upper.includes("GAME")) return "Gaming & Retrô";
    if (upper.includes("ÁUDIO") || upper.includes("AUDIO") || upper.includes("SOM")) return "Áudio & Som";
    if (upper.includes("ILUMINA")) return "Iluminação";
    if (upper.includes("INFORMÁTICA") || upper.includes("INFORMATICA")) return "Informática";
    if (upper.includes("CARREGADOR") || upper.includes("CABO")) return "Carregadores e Cabos";
    if (upper.includes("AUTOMOTIVO")) return "Automotivo e Acessórios";
    if (upper.includes("COZINHA") || upper.includes("ELETRO") || upper.includes("CASA") || upper.includes("UTILIDADE") || upper.includes("FERRAMENTA")) return "Casa & Utensílios";
    return name;
  };

  const goHome = () => {
    setSelectedProductForDetail(null);
    setSelectedCategory("TODOS");
    setActiveView("STORE");
    setActiveDropdown(null);
    setDrawerOpen(false);
    setSearchQuery("");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goDepartment = (rawName: string) => {
    setSelectedProductForDetail(null);
    setActiveDropdown(null);
    setDrawerOpen(false);

    if (rawName === "TODOS") {
      setSelectedCategory("TODOS");
      setActiveView("STORE");
    } else {
      const canonicalCategory = normalizeDepartmentName(rawName);
      setSelectedCategory(canonicalCategory);
      setActiveView("DEPARTMENT");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goCategory = goDepartment;

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipEmail && !vipWhatsapp) return;
    setVipSuccess(true);
    setTimeout(() => {
      setShowVipModal(false);
      setVipSuccess(false);
      setVipEmail("");
      setVipWhatsapp("");
    }, 2200);
  };

  // Itens enxutos do menu central (sem repetição pesada, dando respiro para o header)
  const cleanNavItems = [
    {
      label: "Catálogo",
      hasDropdown: false,
      isBoldHighlight: true,
      badge: "COMPLETO",
      badgeColor: "bg-blue-600",
      isCatalog: true
    },
    {
      label: "Lançamentos",
      hasDropdown: true,
      subItems: [
        { title: "Mini Projetor Smart HY320 4K", price: 499.90, tag: "Cinema 150\"" },
        { title: "Smartwatch Ultra Série 9", price: 199.90, tag: "Novo" },
        { title: "Kit Refletor Solar LED 200W", price: 149.90, tag: "Econômico" },
      ]
    },
    {
      label: "Ofertas",
      hasDropdown: false,
      isBoldHighlight: true,
      badge: "PROMO",
      badgeColor: "bg-red-600"
    },
    blackFridayMode
      ? {
          label: "Black Friday",
          hasDropdown: false,
          isBoldHighlight: true,
          isBlackFriday: true,
          badge: "ON",
          badgeColor: "bg-amber-500 text-gray-950 font-black",
          tooltip: "Modo Black Friday Ativo com Descontos Especiais"
        }
      : {
          label: "Para Empresas",
          hasDropdown: false,
          isBoldHighlight: false,
          tooltip: "Vendas Corporativas no Atacado e CNPJ"
        }
  ];

  return (
    <>
      {/* ── 1. STRIP SUPERIOR MOTOROLA (TOP BAR COM ENTRADA SUAVE) ── */}
      <div className="bg-blue-700 text-white text-xs font-semibold py-1.5 px-4 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap mx-auto md:mx-0">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              FRETE GRÁTIS nas compras acima de R$ 250,00
            </motion.span>

            <span className="opacity-60 hidden sm:inline">|</span>

            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:inline"
            >
              Até 12x sem juros no cartão ou 10% OFF no PIX
            </motion.span>

            <span className="opacity-60 hidden md:inline">|</span>

            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded text-[11px] hidden md:inline-block shadow-2xs"
            >
              CUPOM: PLAYTECH10
            </motion.span>
          </div>

          {/* Botão Promocional: Cadastre-se e Ganhe R$ 200 no Topo */}
          <motion.button
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setShowVipModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-[11px] font-bold transition hover:scale-105 active:scale-95 cursor-pointer ml-auto"
          >
            <Gift className="w-3.5 h-3.5 text-yellow-300" />
            <span>Cadastre-se e GANHE R$ 200*</span>
          </motion.button>
        </div>
      </div>

      {/* ── 2. HEADER PRINCIPAL ── */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

          {/* Esquerda: Hambúrguer + Logo Oficial com Ícone da Engrenagem/Lâmpada */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-xs font-semibold uppercase tracking-wide cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
              <span className="hidden md:inline">menu</span>
            </motion.button>

            {/* Logo Oficial - Vai para a Home */}
            <motion.button
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={goHome}
              className="flex items-center gap-2 select-none group cursor-pointer"
              title="Ir para a página inicial (Home)"
              aria-label="PlayTech Store - Página Inicial"
            >
              <img
                src="/logo-playtech-dark.png"
                alt="PlayTech Store"
                className="h-8 sm:h-9 w-auto object-contain dark:hidden group-hover:opacity-90 transition"
              />
              <img
                src="/logo-playtech-light.png"
                alt="PlayTech Store"
                className="h-8 sm:h-9 w-auto object-contain hidden dark:block group-hover:opacity-90 transition"
              />
            </motion.button>
          </div>

          {/* Centro: Navegação Otimizada com Fade-in Escalonado */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-gray-700 dark:text-gray-300">
            {cleanNavItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    if (item.label === "Catálogo") {
                      setSelectedProductForDetail(null);
                      setActiveView("CATALOG");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    else if (item.label === "Lançamentos") goDepartment("Projetores & Câmeras");
                    else if (item.label === "Ofertas") {
                      setSelectedProductForDetail(null);
                      setActiveView("CATALOG");
                    }
                    else if (item.label === "Black Friday") {
                      setSelectedProductForDetail(null);
                      setActiveView("CATALOG");
                    }
                    else if (item.label === "Para Empresas") window.location.href = "mailto:empresas@playtechbr.com.br";
                    else goDepartment("TODOS");
                  }}
                  className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition ${
                    (item as any).isBlackFriday
                      ? "bf-glow-border text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40 font-black shadow-sm"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600"
                  } ${
                    item.isBoldHighlight && !(item as any).isBlackFriday
                      ? "font-bold text-gray-900 dark:text-white"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[8px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded-full text-white -mt-0.5 ${
                        item.badgeColor || "bg-blue-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Dropdown Clean */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className={`absolute top-full left-0 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 py-2 animate-in fade-in slide-in-from-top-1 duration-100 ${
                    blackFridayMode ? "bf-glow-border" : "border border-gray-200 dark:border-gray-700"
                  }`}>
                    {item.subItems?.map((sub: any, sIdx: number) => (
                      <button
                        key={sIdx}
                        onClick={() => goCategory("TODOS")}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
                      >
                        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {sub.title}
                        </span>
                        {sub.tag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shrink-0 ml-2">
                            {sub.tag}
                          </span>
                        )}
                        {sub.price && (
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0 ml-2">
                            R$ {sub.price.toFixed(2)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Direita: Busca, VIP, WhatsApp, Dark/Light e Carrinho Bolinha com Entrada Escalonada */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Campo de Busca Inteligente com Auto-Complete Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden md:block w-48 lg:w-72"
            >
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Buscar produtos..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 text-xs rounded-full pl-3.5 pr-8 py-2 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition shadow-inner"
              />
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

              {/* Popover Visual de Auto-Complete */}
              {searchFocused && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSearchFocused(false)}
                  />
                  <div className="absolute top-full right-0 w-80 sm:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 p-3 mt-1.5 animate-in fade-in slide-in-from-top-1 space-y-3">
                    {searchPreviewResults.length > 0 ? (
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-2 block">
                          Produtos Encontrados ({searchPreviewResults.length})
                        </span>
                        {searchPreviewResults.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setSelectedProductForDetail(p);
                              setSearchFocused(false);
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left cursor-pointer group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                              <img
                                src={p.imageUrl}
                                alt={p.storefrontTitle}
                                className="max-h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase block truncate">
                                {p.category}
                              </span>
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                                {p.storefrontTitle}
                              </p>
                              <span className="text-[11px] font-black text-gray-900 dark:text-gray-100">
                                R$ {((blackFridayMode ? p.bfSalePrice : p.baseSalePrice) * 0.95).toFixed(2)}{" "}
                                <span className="text-[9px] text-emerald-600 font-bold">no PIX</span>
                              </span>
                            </div>
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setSelectedProductForDetail(null);
                            setActiveView("CATALOG");
                            setSearchFocused(false);
                          }}
                          className="w-full pt-2 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer border-t border-gray-100 dark:border-gray-800"
                        >
                          Ver todos os resultados no Catálogo →
                        </button>
                      </div>
                    ) : searchQuery.trim() ? (
                      <div className="p-3 text-center text-xs text-gray-500">
                        Nenhum produto encontrado para "{searchQuery}".
                      </div>
                    ) : (
                      <div className="space-y-2 p-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                          🔥 Buscas Populares Hoje
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "Projetor HY320",
                            "Smartwatch Ultra",
                            "Fita LED RGB",
                            "Game Stick 4K",
                            "Carregador Sem Fio",
                          ].map((term) => (
                            <button
                              key={term}
                              onClick={() => {
                                setSearchQuery(term);
                                setSearchFocused(false);
                              }}
                              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 text-gray-700 dark:text-gray-300 hover:text-blue-600 text-[11px] font-semibold transition cursor-pointer"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>

            {/* WhatsApp */}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              href="https://wa.me/5561996613292"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="WhatsApp: (61) 99661-3292"
            >
              <Headset className="w-5 h-5 text-green-600" />
            </motion.a>

            {/* Toggle Tema Dark / Light */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              title={theme === "dark" ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>

            {/* Conta do Usuário (Abre a Central Minha Conta Completa) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setShowAccountModal(true)}
              className="hidden sm:flex items-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              title="Minha Conta & Autoatendimento"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Carrinho em Formato de Bolinha na Direita com Badge */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => toggleCart(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 relative ml-1 cursor-pointer"
              title={`Sacola de Compras: ${cartTotalQty} itens`}
              aria-label="Abrir sacola de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalQty > 0 ? (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm animate-in zoom-in">
                  {cartTotalQty}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-400 text-white text-[9px] font-bold flex items-center justify-center">
                  0
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── 3. DRAWER LATERAL DE TODAS AS CATEGORIAS ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Header do drawer com Logo e Fechar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                onClick={goHome}
                className="flex items-center gap-2 select-none cursor-pointer group"
                title="Ir para a página inicial (Home)"
              >
                <img
                  src="/logo-playtech-dark.png"
                  alt="PlayTech Store"
                  className="h-7 w-auto object-contain dark:hidden group-hover:opacity-85 transition"
                />
                <img
                  src="/logo-playtech-light.png"
                  alt="PlayTech Store"
                  className="h-7 w-auto object-contain hidden dark:block group-hover:opacity-85 transition"
                />
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links de categorias / Departamentos */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <button
                onClick={() => {
                  setSelectedProductForDetail(null);
                  setActiveView("CATALOG");
                  setDrawerOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-black text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer shadow-md shadow-blue-500/20 mb-2"
              >
                <span>Catálogo Geral de Produtos</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">Ver Todos</span>
              </button>

              <button
                onClick={goHome}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                Página Inicial (Home / Vitrine)
              </button>

              <div className="pt-2 pb-1 px-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                Departamentos
              </div>
              {layoutConfig.categoriesDirectoryBar.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => goDepartment(cat.name)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer group"
                >
                  <span className="capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{cat.name.toLowerCase()}</span>
                  <span className="text-[10px] text-gray-400 font-normal">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Rodapé do drawer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-2 text-xs">
              <a
                href="https://wa.me/5561996613292"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 font-bold"
              >
                <Phone className="w-4 h-4" /> (61) 99661-3292
              </a>
              <p className="text-[11px] text-gray-400">
                Atendimento Segunda a Sexta: 09h às 18h
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. MODAL VIP CUPOM ── */}
      {showVipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowVipModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowVipModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {vipSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">
                  Cupom Ativado com Sucesso!
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Use o cupom <strong className="text-blue-600">PLAYTECH10</strong> no checkout para garantir seu desconto de boas-vindas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVipSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[11px] font-bold">
                    <Gift className="w-3.5 h-3.5" /> EXCLUSIVO PARA NOVOS CLIENTES
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">
                    Ganhe R$ 200* em Descontos VIP
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cadastre-se para receber promoções secretas, lançamentos antecipados e cupons com frete grátis.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="email"
                    required
                    value={vipEmail}
                    onChange={(e) => setVipEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    value={vipWhatsapp}
                    onChange={(e) => setVipWhatsapp(e.target.value)}
                    placeholder="WhatsApp (ex: 61 99999-9999)"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition active:scale-95"
                >
                  DESTRAVAR MEU CUPOM AGORA
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── 5. MODAL CENTRAL DO CLIENTE (MINHA CONTA & AUTOATENDIMENTO) ── */}
      <CustomerAccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </>
  );
}
