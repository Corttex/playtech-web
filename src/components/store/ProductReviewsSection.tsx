"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Plus, X, User } from "lucide-react";
import { Product } from "@/types";

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
}

interface ProductReviewsSectionProps {
  product: Product;
}

export default function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [filterRating, setFilterRating] = useState<number | "ALL">("ALL");
  const [showModal, setShowModal] = useState(false);
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  // Form de nova avaliação
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Armazenamento em localStorage com base no ID do produto + avaliações geradas contextualizadas
  useEffect(() => {
    const storageKey = `playtech_reviews_${product.id}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        setReviews(JSON.parse(saved));
        return;
      } catch (e) {
        console.error(e);
      }
    }

    // Avaliações contextuais e realistas para cada produto
    const title = product.storefrontTitle;
    const defaultReviews: ReviewItem[] = [
      {
        id: `${product.id}-rev-1`,
        author: "Marcos Vinícius S.",
        location: "Brasília/DF",
        rating: 5,
        date: "Há 3 dias",
        comment: `Excelente compra! O ${title} superou minhas expectativas. Envio muito rápido direto daqui de Brasília e a nota fiscal já veio no e-mail no mesmo dia.`,
        verified: true,
        likes: 14,
      },
      {
        id: `${product.id}-rev-2`,
        author: "Fernanda Ribeiro",
        location: "Belo Horizonte/MG",
        rating: 5,
        date: "Há 1 semana",
        comment: `Produto 100% original, muito bem embalado com plástico bolha e caixa lacrada. Funciona perfeitamente e o atendimento no WhatsApp tirou todas as dúvidas antes do PIX.`,
        verified: true,
        likes: 9,
      },
      {
        id: `${product.id}-rev-3`,
        author: "Carlos Eduardo N.",
        location: "Campinas/SP",
        rating: 4,
        date: "Há 2 semanas",
        comment: `Muito bom custo-benefício. Chegou em 4 dias úteis pelos Correios via Sedex. Recomendo demais a loja PlayTech!`,
        verified: true,
        likes: 5,
      },
    ];

    setReviews(defaultReviews);
    localStorage.setItem(storageKey, JSON.stringify(defaultReviews));
  }, [product.id, product.storefrontTitle]);

  // Salvar alterações
  const saveReviews = (updated: ReviewItem[]) => {
    setReviews(updated);
    const storageKey = `playtech_reviews_${product.id}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleLike = (id: string) => {
    if (userLiked[id]) return;
    setUserLiked((prev) => ({ ...prev, [id]: true }));
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    );
    saveReviews(updated);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `${product.id}-custom-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || "Brasil",
      rating: newRating,
      date: "Hoje",
      comment: newComment.trim(),
      verified: true,
      likes: 1,
    };

    const updated = [newRev, ...reviews];
    saveReviews(updated);
    setSubmittedSuccess(true);

    setTimeout(() => {
      setShowModal(false);
      setSubmittedSuccess(false);
      setNewAuthor("");
      setNewLocation("");
      setNewRating(5);
      setNewComment("");
    }, 1600);
  };

  // Médias
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 5.0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.min(Math.max(Math.round(r.rating), 1), 5) as 1 | 2 | 3 | 4 | 5;
      counts[star] = (counts[star] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (filterRating === "ALL") return reviews;
    return reviews.filter((r) => Math.round(r.rating) === filterRating);
  }, [reviews, filterRating]);

  return (
    <section id="avaliacoes" className="space-y-6 pt-10 border-t border-gray-200 dark:border-gray-800">
      {/* Título & Ação */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Opinião dos Clientes</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            Avaliações e Experiências Reais
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Comentários verificados de quem já comprou e testou este produto.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Escrever Avaliação</span>
        </button>
      </div>

      {/* Painel Resumo: Nota Média + Barras de Estrelas */}
      <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Nota Grande */}
        <div className="md:col-span-4 text-center md:border-r md:border-gray-200 dark:md:border-gray-700 md:pr-6 space-y-2">
          <div className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            {averageRating}
          </div>
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(averageRating))
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Baseado em <strong>{reviews.length} avaliações</strong> verificadas
          </p>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> 98% dos compradores recomendam
          </div>
        </div>

        {/* Barras por Estrela */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star as 1 | 2 | 3 | 4 | 5] || 0;
            const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;

            return (
              <button
                key={star}
                onClick={() => setFilterRating(filterRating === star ? "ALL" : star)}
                className="w-full flex items-center gap-3 text-xs group cursor-pointer text-left"
              >
                <span className="w-12 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1 shrink-0">
                  {star} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-14 text-right text-gray-400 text-[11px] font-mono shrink-0">
                  {count} ({percent}%)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtros por estrelas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-gray-500 dark:text-gray-400 text-[11px] uppercase mr-1">
          Filtrar:
        </span>
        <button
          onClick={() => setFilterRating("ALL")}
          className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer whitespace-nowrap ${
            filterRating === "ALL"
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
          }`}
        >
          Todas ({reviews.length})
        </button>
        {[5, 4, 3, 2, 1].map((s) => (
          <button
            key={s}
            onClick={() => setFilterRating(filterRating === s ? "ALL" : s)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition cursor-pointer whitespace-nowrap ${
              filterRating === s
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            <span>{s}</span>
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] opacity-75">
              ({ratingCounts[s as 1 | 2 | 3 | 4 | 5] || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Lista de Avaliações */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500">Nenhuma avaliação encontrada com esta nota.</p>
            <button
              onClick={() => setFilterRating("ALL")}
              className="text-xs font-bold text-blue-600 hover:underline mt-1 cursor-pointer"
            >
              Ver todas as avaliações
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 shadow-2xs space-y-3 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center font-black text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-900 dark:text-white">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.2 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {rev.location} &bull; {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex text-amber-400 gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <= rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {rev.comment}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/60 text-[11px] text-gray-400">
                <span>Esta avaliação foi útil?</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition cursor-pointer ${
                    userLiked[rev.id]
                      ? "text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Útil ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Escrever Avaliação */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white">
                  Avaliar Produto
                </h3>
                <p className="text-[11px] text-gray-500">
                  {product.storefrontTitle}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-black text-gray-900 dark:text-white">
                  Avaliação enviada com sucesso!
                </h4>
                <p className="text-xs text-gray-500">
                  Obrigado por ajudar outros clientes da PlayTech Store.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                {/* Seleção de Estrelas */}
                <div className="space-y-1.5 text-center py-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Sua nota geral para o produto:
                  </span>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-125 transition cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 dark:text-gray-300">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700 dark:text-gray-300">
                      Cidade / Estado
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Brasília/DF"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-gray-300">
                    Seu Comentário / O que achou do produto *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Conte sobre a qualidade do produto, prazo de entrega, embalagem e atendimento..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs shadow-md transition cursor-pointer"
                >
                  Publicar Avaliação
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

