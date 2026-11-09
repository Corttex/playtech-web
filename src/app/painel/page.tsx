"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  KeyRound,
  User,
  ShieldCheck,
  ArrowRight,
  LogOut,
  ArrowLeft,
  Sparkles,
  AlertCircle
} from "lucide-react";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export default function PainelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Check if session token exists
    const session = localStorage.getItem("playtech_admin_session");
    if (session === "master_authenticated_ok") {
      setIsAuthenticated(true);
    }
    setIsCheckingSession(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === "master" && cleanPass === "220022@") {
      setIsAuthenticated(true);
      localStorage.setItem("playtech_admin_session", "master_authenticated_ok");
    } else {
      setErrorMsg("Credenciais inválidas. Usuário ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("playtech_admin_session");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#0A0A0E] flex items-center justify-center text-zinc-500 text-xs">
        Carregando painel...
      </div>
    );
  }

  // TELA DE LOGIN SEGURO DO PAINEL (/painel)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0E] text-zinc-100 font-sans flex flex-col justify-between p-4 selection:bg-amber-500 selection:text-black">
        {/* Barra Superior Minimalista */}
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para a Loja
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>PlayTech OS Security Gateway</span>
          </div>
        </div>

        {/* Card Central de Login */}
        <div className="liquid-glass max-w-md w-full mx-auto my-auto p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

          <div className="text-center space-y-2 relative z-10 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Lock className="w-7 h-7" />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white">
              PLAY<span className="text-amber-400">TECH</span> OS
            </h1>
            <p className="text-xs text-zinc-400">
              Painel de Gestão &bull; Acesso Restrito aos Administradores
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10 text-xs">
            <div>
              <label className="block text-zinc-300 font-bold mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Usuário / Identificação:
              </label>
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: master"
                className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-3 text-white font-medium outline-none focus:border-amber-400 focus:bg-black/60 transition"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                Senha de Acesso:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-3 text-white font-medium outline-none focus:border-amber-400 focus:bg-black/60 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-xl text-sm transition-all duration-200 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
            >
              ENTRAR NO PAINEL
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-white/5 text-center text-[11px] text-zinc-500">
            PlayTech Brasil OS &bull; Sessão Protegida
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center text-[11px] text-zinc-600 py-4">
          PlayTech Brasil &copy; {new Date().getFullYear()} &bull; Todos os direitos reservados.
        </div>
      </div>
    );
  }

  // TELA DO PAINEL ADMIN DESBLOQUEADO
  return (
    <div className="min-h-screen bg-[#0A0A0E] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Barra de Topo do Painel */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 px-3 py-1.5 rounded-xl border border-white/10 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ver Vitrine da Loja
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              PlayTech OS &bull; /painel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Conectado como: <strong className="text-white">master</strong>
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-black border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95"
            title="Encerrar Sessão"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Completo do Admin Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboardView />
      </main>
    </div>
  );
}

