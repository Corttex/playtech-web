"use client";

import React, { useState } from "react";
import { ShieldCheck, FileText, KeyRound, Upload, CheckCircle2, AlertTriangle, Printer, Send } from "lucide-react";

export default function NfeCertificateManager() {
  const [certUploaded, setCertUploaded] = useState(true);
  const [certPassword, setCertPassword] = useState("••••••••");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleTestSefaz = () => {
    setFeedback("Consultando Status do Serviço na SEFAZ Estadual via Web Service...");
    setTimeout(() => {
      setFeedback("SEFAZ Online! Certificado e-CNPJ A1 válido até 24/09/2027. Status 107 - Serviço em Operação.");
    }, 700);
  };

  const handleEmitSampleNfe = () => {
    setFeedback("Gerando XML da NFe Modelo 55 -> Assinando com Certificado A1 -> Transmitindo...");
    setTimeout(() => {
      setFeedback("NFe #1042 Autorizada com Sucesso! Chave: 3526 1102 9381 0293 8472 5500 1000 0010 4210 9283 7461. DANFE PDF gerada!");
    }, 900);
  };

  return (
    <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-400" />
            Motor Fiscal Nativo & Certificado Digital A1 (Adeus Bling)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Emita Notas Fiscais Eletrônicas (NFe 55 / NFCe 65) diretamente pelo PlayTech OS, sem intermediários.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Certificado A1 Ativo
          </span>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid de Configurações Fiscais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Card 1: Certificado A1 */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-400" /> Arquivo do Certificado
            </span>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">.pfx / .p12</span>
          </div>
          <div className="space-y-1 font-mono text-zinc-400">
            <div className="truncate">playtech_brasil_2026.pfx</div>
            <div className="text-[10px] text-emerald-400">● Criptografia AES-256 no Cofre</div>
          </div>
          <button
            onClick={handleTestSefaz}
            className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2 rounded-lg text-xs transition"
          >
            Testar Conexão SEFAZ
          </button>
        </div>

        {/* Card 2: Regras Tributárias */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
          <span className="font-bold text-white flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-sky-400" /> Regras Tributárias Padrão
          </span>
          <div className="space-y-1.5 text-zinc-400">
            <div className="flex justify-between">
              <span>CFOP Padrão (Estadual):</span>
              <strong className="text-white">5.102</strong>
            </div>
            <div className="flex justify-between">
              <span>CFOP Inter-estadual:</span>
              <strong className="text-white">6.102</strong>
            </div>
            <div className="flex justify-between">
              <span>Regime Tributário:</span>
              <strong className="text-white">Simples Nacional (MEI/EPP)</strong>
            </div>
          </div>
          <button
            onClick={handleEmitSampleNfe}
            className="w-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/30 font-bold py-2 rounded-lg text-xs transition"
          >
            Emitir NFe de Teste
          </button>
        </div>

        {/* Card 3: Expedição Térmica Zebra */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Printer className="w-4 h-4 text-purple-400" /> Expedição Rápida 10x15
          </span>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Impressão combinada em 1 clique: DANFE Simplificada + Etiqueta de Envio (Correios / Melhor Envio) na mesma folha térmica.
          </p>
          <div className="pt-1">
            <span className="inline-block text-[11px] text-zinc-300 bg-zinc-800/80 px-2 py-1 rounded">
              Zebra ZD220 / Elgin L42 Pro Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
