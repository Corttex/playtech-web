"use client";

import React, { useState } from "react";
import {
  Bot,
  Zap,
  CheckCircle2,
  Play,
  RotateCw,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  FileCheck2,
  Cpu,
  Layers,
  Terminal,
  Activity
} from "lucide-react";

interface AgentStatus {
  id: string;
  name: string;
  role: string;
  model: string;
  status: "ACTIVE" | "IDLE" | "RUNNING";
  lastRun: string;
  tasksCompleted: number;
  accuracy: number;
  description: string;
}

export default function AutonomousAgentsCenter() {
  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      id: "agent-catalog",
      name: "CatalogHigienizerAgent",
      role: "Higienização & Copywriting de Catálogo",
      model: "Google Gemini 1.5 Pro / Flash",
      status: "ACTIVE",
      lastRun: "Há 4 minutos",
      tasksCompleted: 342,
      accuracy: 99.4,
      description: "Varre títulos feios de notas fiscais do fornecedor e transforma em títulos de alta conversão para o site e 60 chars exatos para o Mercado Livre.",
    },
    {
      id: "agent-pricing",
      name: "OmnichannelMarginGuardAgent",
      role: "Guardião de Margem & Markup Reverso",
      model: "Algoritmo Quântico de Precificação",
      status: "ACTIVE",
      lastRun: "Tempo Real (0.38s)",
      tasksCompleted: 1205,
      accuracy: 100.0,
      description: "Recalcula automaticamente os preços no Mercado Livre (+16%) e Shopee (+14%) toda vez que o custo do produto ou as taxas mudam.",
    },
    {
      id: "agent-fiscal",
      name: "FiscalAutoPilotAgent",
      role: "Emissor Fiscal A1 & Expedição Autônoma",
      model: "SEFAZ Mensageria A1 Pipeline",
      status: "ACTIVE",
      lastRun: "Há 12 minutos",
      tasksCompleted: 184,
      accuracy: 99.8,
      description: "Assina o XML com o Certificado Digital A1 do Lucas, autoriza na SEFAZ e dispara DANFE + código de rastreio no WhatsApp do cliente.",
    },
    {
      id: "agent-support",
      name: "CustomerSupportAiAgent",
      role: "SAC Autônomo 24/7 (ML & WhatsApp)",
      model: "Gemini Contextual Hardware Expert",
      status: "ACTIVE",
      lastRun: "Há 1 minuto",
      tasksCompleted: 678,
      accuracy: 98.7,
      description: "Responde dúvidas de clientes no Mercado Livre e WhatsApp em 15 segundos, consultando a ficha técnica real do produto no banco.",
    },
  ]);

  const [activeRunningAgent, setActiveRunningAgent] = useState<string | null>(null);
  const [agentConsoleLogs, setAgentConsoleLogs] = useState<string[]>([
    "Sistema de Agentes Autônomos PlayTech iniciado com sucesso.",
    "Monitorando canais: Storefront, Mercado Livre, Shopee e Webhooks SEFAZ.",
  ]);

  const handleRunAgent = (agentId: string) => {
    setActiveRunningAgent(agentId);
    setAgentConsoleLogs((prev) => [
      ...prev,
      `[TRIGGER] Disparo manual solicitado para ${agentId}...`,
    ]);

    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId
            ? { ...a, status: "RUNNING", tasksCompleted: a.tasksCompleted + 1, lastRun: "Agora" }
            : a
        )
      );

      setTimeout(() => {
        setAgents((prev) =>
          prev.map((a) => (a.id === agentId ? { ...a, status: "ACTIVE" } : a))
        );
        setActiveRunningAgent(null);
        setAgentConsoleLogs((prev) => [
          ...prev,
          `✓ [SUCCESS] Agente ${agentId} concluiu a varredura com 100% de sucesso. Nenhuma anomalia detectada.`,
        ]);
      }, 1200);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              Central de Agentes Autônomos da PlayTech
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
              4 Agentes Ativos &bull; Auto-Suficientes
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Conjunto de agentes orquestrados para operar o e-commerce de forma autônoma (catálogo, preços, fiscal e atendimento).
          </p>
        </div>
      </div>

      {/* Grid dos 4 Agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="p-5 rounded-2xl bg-[#12131A] border border-white/10 hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-amber-400 font-mono">
                  {agent.name}
                </span>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {agent.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mt-1">
                {agent.role}
              </h4>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {agent.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Última Ação:</span>
                  <span className="font-bold text-white text-[11px]">{agent.lastRun}</span>
                </div>
                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Execuções:</span>
                  <span className="font-bold text-amber-400 text-[11px] font-mono">{agent.tasksCompleted}</span>
                </div>
                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-zinc-500 block">Precisão:</span>
                  <span className="font-bold text-emerald-400 text-[11px]">{agent.accuracy}%</span>
                </div>
              </div>

              <button
                onClick={() => handleRunAgent(agent.id)}
                disabled={activeRunningAgent === agent.id}
                className="w-full bg-white/10 hover:bg-amber-500 hover:text-black text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{activeRunningAgent === agent.id ? "Executando..." : "Disparar Varredura Autônoma Agora"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal de Atividade dos Agentes */}
      <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Log Unificado de Telemetria dos Agentes Autônomos</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">● Todos os Workers Online</span>
        </div>

        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
          {agentConsoleLogs.map((log, index) => (
            <div
              key={index}
              className={`text-[11px] leading-relaxed ${
                log.includes("✓")
                  ? "text-emerald-400 font-semibold"
                  : log.includes("[TRIGGER]")
                  ? "text-amber-400 font-bold"
                  : "text-zinc-400"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

