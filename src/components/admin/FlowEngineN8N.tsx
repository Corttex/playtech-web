"use client";

import React, { useState } from "react";
import {
  GitFork,
  Play,
  RotateCw,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Bot,
  MessageCircle,
  FileCheck2,
  Truck,
  AlertTriangle,
  ArrowRight,
  Database,
  Share2,
  Trash2,
  Layers,
  Activity,
  Terminal,
  Settings
} from "lucide-react";

interface FlowNode {
  id: string;
  type: "TRIGGER" | "ACTION" | "AI" | "INTEGRATION";
  title: string;
  subtitle: string;
  iconName: string;
  x: number;
  y: number;
  status: "IDLE" | "RUNNING" | "SUCCESS" | "ERROR";
  executionTimeMs?: number;
  config: Record<string, any>;
}

interface FlowConnection {
  from: string;
  to: string;
}

export default function FlowEngineN8N() {
  const [activePreset, setActivePreset] = useState<string>("PIX_NFE_FLOW");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    "Flow Engine PlayTech v2.4 pronto.",
    "Aguardando gatilhos de eventos ou execução de teste...",
  ]);

  // Preset 1: Fluxo Automatizado de Pedido PIX
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: "node-1",
      type: "TRIGGER",
      title: "PIX Aprovado",
      subtitle: "Webhook Gateway (1.2s)",
      iconName: "Zap",
      x: 60,
      y: 120,
      status: "IDLE",
      config: { gateway: "Mercado Pago / Asaas", event: "payment.approved" },
    },
    {
      id: "node-2",
      type: "ACTION",
      title: "Emitir NFe SEFAZ",
      subtitle: "Certificado A1 .pfx",
      iconName: "FileCheck2",
      x: 320,
      y: 80,
      status: "IDLE",
      config: { cfop: "5102", ambiente: "Produção SEFAZ" },
    },
    {
      id: "node-3",
      type: "INTEGRATION",
      title: "Sincronizar Estoque",
      subtitle: "Mercado Livre & Shopee",
      iconName: "Share2",
      x: 320,
      y: 220,
      status: "IDLE",
      config: { channels: ["MLB", "SHOPEE"], delta: -1 },
    },
    {
      id: "node-4",
      type: "ACTION",
      title: "Disparar WhatsApp",
      subtitle: "Template Pedido Aprovado",
      iconName: "MessageCircle",
      x: 580,
      y: 80,
      status: "IDLE",
      config: { template: "wp_order_paid", provider: "WPNotif Nativo" },
    },
    {
      id: "node-5",
      type: "ACTION",
      title: "Gerar Etiqueta Térmica",
      subtitle: "Correios 10x15 Zebra",
      iconName: "Truck",
      x: 820,
      y: 80,
      status: "IDLE",
      config: { carrier: "Correios Sedex", autoPrint: true },
    },
  ]);

  const [connections] = useState<FlowConnection[]>([
    { from: "node-1", to: "node-2" },
    { from: "node-1", to: "node-3" },
    { from: "node-2", to: "node-4" },
    { from: "node-4", to: "node-5" },
  ]);

  // Executar simulação visual do n8n passo a passo
  const handleRunFlow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setExecutionLogs(["[START] Iniciando execução do fluxo...", `Payload: { pedidoId: "#1044", valor: 499.90, metodo: "PIX" }`]);

    // Reset status
    setNodes((prev) => prev.map((n) => ({ ...n, status: "IDLE", executionTimeMs: undefined })));

    // Step 1: Trigger
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => (n.id === "node-1" ? { ...n, status: "SUCCESS", executionTimeMs: 42 } : n))
      );
      setExecutionLogs((prev) => [
        ...prev,
        `✓ [Trigger] Webhook PIX recebido e autenticado em 42ms. Pedido #1044 validado.`,
      ]);

      // Step 2: NFe + Estoque
      setTimeout(() => {
        setNodes((prev) =>
          prev.map((n) =>
            n.id === "node-2"
              ? { ...n, status: "SUCCESS", executionTimeMs: 185 }
              : n.id === "node-3"
              ? { ...n, status: "SUCCESS", executionTimeMs: 95 }
              : n
          )
        );
        setExecutionLogs((prev) => [
          ...prev,
          `✓ [SEFAZ] NFe Modelo 55 autorizada em 185ms. Chave: 3526 1102 9381 0293 8472.`,
          `✓ [Omnichannel] Estoque baixado no Mercado Livre (MLB) e Shopee em 95ms.`,
        ]);

        // Step 3: WhatsApp
        setTimeout(() => {
          setNodes((prev) =>
            prev.map((n) => (n.id === "node-4" ? { ...n, status: "SUCCESS", executionTimeMs: 68 } : n))
          );
          setExecutionLogs((prev) => [
            ...prev,
            `✓ [WhatsApp] Mensagem de confirmação + chave NFe enviada para o cliente com sucesso (68ms).`,
          ]);

          // Step 4: Etiqueta
          setTimeout(() => {
            setNodes((prev) =>
              prev.map((n) => (n.id === "node-5" ? { ...n, status: "SUCCESS", executionTimeMs: 54 } : n))
            );
            setExecutionLogs((prev) => [
              ...prev,
              `✓ [Expedição] Etiqueta Correios Sedex gerada e enviada para a fila de impressão térmica (54ms).`,
              `🎉 [FLOW COMPLETED] Ciclo completo executado com sucesso em 444ms!`,
            ]);
            setIsRunning(false);
          }, 600);
        }, 600);
      }, 700);
    }, 400);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-400" />;
      case "FileCheck2":
        return <FileCheck2 className="w-4 h-4 text-sky-400" />;
      case "Share2":
        return <Share2 className="w-4 h-4 text-purple-400" />;
      case "MessageCircle":
        return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      case "Truck":
        return <Truck className="w-4 h-4 text-orange-400" />;
      case "Bot":
        return <Bot className="w-4 h-4 text-pink-400" />;
      default:
        return <Activity className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header do n8n PlayTech Flow Engine */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <GitFork className="w-5 h-5 text-amber-400 rotate-90" />
              PlayTech Flow Engine (n8n Nativo &bull; Automações)
            </h2>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
              Sub-Segundo
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Motor visual proprietário de orquestração: crie e execute fluxos entre Pedidos, SEFAZ A1, WhatsApp e Marketplaces sem pagar mensalidade de n8n ou Zapier.
          </p>
        </div>

        {/* Botão de Rodar Simulação */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunFlow}
            disabled={isRunning}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 text-black font-black px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 fill-black ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Executando Nós..." : "Executar Fluxo de Teste"}</span>
          </button>
        </div>
      </div>

      {/* Seletor de Presets de Automação */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold scrollbar-none">
        <span className="text-zinc-500 mr-1">Fluxos Prontos:</span>
        {[
          { id: "PIX_NFE_FLOW", label: "⚡ Venda PIX ➔ NFe A1 ➔ WhatsApp ➔ Correios" },
          { id: "SAC_AI_FLOW", label: "🤖 SAC IA Mercado Livre (Perguntas ➔ Gemini ➔ Resposta 15s)" },
          { id: "CART_RECOVERY", label: "🛒 Recuperação de Carrinho Abandonado (15m ➔ Cupom)" },
          { id: "OMNICHANNEL_SYNC", label: "📦 Sincronização Estoque Shopee/ML em Tempo Real" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePreset(p.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
              activePreset === p.id
                ? "bg-amber-500 text-black font-black"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* CANVAS VISUAL DO N8N COM GRID & CURVAS BEZIER */}
      <div className="relative rounded-3xl bg-[#0C0D14] border border-white/10 p-6 min-h-[420px] overflow-x-auto shadow-2xl relative select-none">
        {/* Grid de Pontos de Fundo (Padrão n8n) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Linhas SVG Conectoras */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((c, i) => {
            const source = nodes.find((n) => n.id === c.from);
            const target = nodes.find((n) => n.id === c.to);
            if (!source || !target) return null;

            const startX = source.x + 200;
            const startY = source.y + 40;
            const endX = target.x;
            const endY = target.y + 40;
            const midX = (startX + endX) / 2;

            const isFlowActive = source.status === "SUCCESS";

            return (
              <g key={i}>
                <path
                  d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke={isFlowActive ? "#10B981" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="2.5"
                  className={isFlowActive ? "flow-connector" : ""}
                />
              </g>
            );
          })}
        </svg>

        {/* NÓS INTERATIVOS */}
        <div className="relative z-10 min-w-[900px] h-[360px]">
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                className={`absolute w-52 rounded-2xl p-4 cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? "border-amber-400 bg-[#161724] shadow-[0_0_25px_rgba(245,158,11,0.3)] scale-105"
                    : node.status === "SUCCESS"
                    ? "border-emerald-500/60 bg-[#111918] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    : "border-white/10 bg-[#12131A] hover:border-white/30 hover:bg-[#161722]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {getNodeIcon(node.iconName)}
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                      node.status === "SUCCESS"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : node.status === "RUNNING"
                        ? "bg-amber-500/20 text-amber-400 animate-pulse"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {node.status === "SUCCESS"
                      ? `${node.executionTimeMs}ms`
                      : node.status}
                  </span>
                </div>

                <h4 className="text-xs font-black text-white truncate">
                  {node.title}
                </h4>
                <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                  {node.subtitle}
                </p>

                {/* Portas de Conexão Laterais */}
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-400 border-2 border-black" />
                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 border-2 border-black" />
              </div>
            );
          })}
        </div>
      </div>

      {/* CONSOLE DE LOGS EM TEMPO REAL (TERMINAL N8N) */}
      <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Console de Execução do Motor de Automações</span>
          </div>
          <span className="text-[10px] text-zinc-500">Live WebSockets: Conectado</span>
        </div>

        <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
          {executionLogs.map((log, index) => (
            <div
              key={index}
              className={`text-[11px] leading-relaxed ${
                log.includes("✓")
                  ? "text-emerald-400 font-semibold"
                  : log.includes("🎉")
                  ? "text-amber-400 font-bold"
                  : "text-zinc-400"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* DETALHES DO NÓ SELECIONADO (INSPECTOR) */}
      {selectedNode && (
        <div className="p-5 rounded-2xl bg-[#12131A] border border-amber-500/30 text-xs space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white">
                Configurações do Nó: {selectedNode.title}
              </h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Tipo:</span>
              <span className="font-mono text-white">{selectedNode.type}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Parâmetros Ativos:</span>
              <pre className="p-2 rounded bg-black/50 text-[11px] font-mono text-emerald-400 overflow-x-auto mt-1">
                {JSON.stringify(selectedNode.config, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

