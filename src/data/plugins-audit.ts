import { WordPressPluginEquivalent } from "../types";

export interface AnalyzedPlugin {
  name: string;
  wpCategory: "PERFORMANCE_BLOAT" | "SECURITY_FIX" | "CHECKOUT_BRAZIL" | "PAYMENT" | "SHIPPING" | "MARKETING_SEO" | "COMMUNICATION" | "BUILDER_CUSTOM";
  action: "ELIMINADO_NATIVO" | "APRIMORADO_NATIVO" | "INTEGRADO_API";
  reason: string;
  nativeModule: string;
}

export const REAL_WP_PLUGINS_AUDIT: AnalyzedPlugin[] = [
  // 1. TAPA-BURACOS DE PERFORMANCE (AGORA COM WEBP EXPRESS)
  {
    name: "WebP Express",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "Desnecessário. O Next.js 15 converte dinamicamente JPEG/PNG para WebP e AVIF no Edge CDN sem precisar de scripts no servidor.",
    nativeModule: "Image Pipeline Nativo Next.js"
  },
  {
    name: "LiteSpeed Cache",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "Desnecessário. O Next.js 15 roda com Server-Side Rendering no Cloudflare Edge Proxy, entregando páginas em <40ms sem precisar de cache de disco PHP.",
    nativeModule: "Next.js ISR + Cloudflare Edge CDN"
  },
  {
    name: "Smush Pro",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "Substituído pela compressão automática em tempo real do Next.js / Sharp para imagens WebP e AVIF.",
    nativeModule: "Otimizador de Mídia Nativo"
  },
  {
    name: "Modern Image Formats (Performance Lab)",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "Next.js converte uploads automaticamente para AVIF e WebP modernos.",
    nativeModule: "Image Pipeline Nativo"
  },
  {
    name: "Enhanced Responsive Images",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "O componente de imagem do Next.js gera srcset dinâmico para mobile, tablet e desktop automaticamente.",
    nativeModule: "Responsive SrcSet Nativo"
  },
  {
    name: "Image Prioritizer & Placeholders",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "Atributos fetchpriority='high' e blur placeholder já embutidos no Bento Grid do storefront.",
    nativeModule: "Storefront Bento Engine"
  },
  {
    name: "Speculative Loading & View Transitions & Web Worker",
    wpCategory: "PERFORMANCE_BLOAT",
    action: "ELIMINADO_NATIVO",
    reason: "O React 19 + Next.js App Router já faz prefetch especulativo nas rotas visíveis no viewport e roda off-thread.",
    nativeModule: "Core React 19 / App Router"
  },

  // 2. TAPA-BURACOS DE SEGURANÇA E MANUTENÇÃO (AGORA COM WP HIDE)
  {
    name: "WP Hide & Security Enhancer",
    wpCategory: "SECURITY_FIX",
    action: "ELIMINADO_NATIVO",
    reason: "Tentava esconder pastas wp-content/plugins. No PlayTech OS a aplicação é compilada em JavaScript/Rust sem nenhuma estrutura PHP vulnerável.",
    nativeModule: "Arquitetura Imutável Jamstack"
  },
  {
    name: "Hide My WP Ghost & Really Simple Security Pro",
    wpCategory: "SECURITY_FIX",
    action: "ELIMINADO_NATIVO",
    reason: "No Next.js estático/serverless não existe pasta wp-admin vulnerável a ataques de força bruta ou injeção SQL.",
    nativeModule: "Arquitetura Segura sem WordPress"
  },
  {
    name: "Disable All WordPress Updates & Disable Admin Notices",
    wpCategory: "SECURITY_FIX",
    action: "ELIMINADO_NATIVO",
    reason: "No PlayTech OS não há notificações chatas de plugins nem risco de quebrar o site por updates automáticos do WordPress.",
    nativeModule: "Painel Limpo sem Notificações"
  },
  {
    name: "Safe SVG & Real Media Library",
    wpCategory: "SECURITY_FIX",
    action: "ELIMINADO_NATIVO",
    reason: "Upload sanitizado direto para Cloudflare R2 / S3 com pastas categorizadas no banco de dados.",
    nativeModule: "Gerenciador de Mídia PlayTech"
  },

  // 3. TEMA PESADO SUBSTITUÍDO (WOODMART)
  {
    name: "Woodmart Core (Tema Woodmart)",
    wpCategory: "BUILDER_CUSTOM",
    action: "ELIMINADO_NATIVO",
    reason: "O tema Woodmart adicionava mais de 45 requisições de CSS/JS por página. Substituímos pelo Design System Tech Dark/Gold nativo e ultraleve.",
    nativeModule: "Design System PlayTech Dark/Gold"
  },

  // 4. CHECKOUT, BRASIL & PAGAMENTOS (CRÍTICOS)
  {
    name: "Mercado Pago para WooCommerce",
    wpCategory: "PAYMENT",
    action: "APRIMORADO_NATIVO",
    reason: "Eliminamos a tela lenta de checkout do Woo. No PlayTech OS o checkout é transparente, com PIX dinâmico (QR Code + Copia e Cola) e confirmação em 1.2s.",
    nativeModule: "Checkout Transparente PIX & Cartão"
  },
  {
    name: "Brazilian Market on WooCommerce (Claudio Sanches)",
    wpCategory: "CHECKOUT_BRAZIL",
    action: "APRIMORADO_NATIVO",
    reason: "Validação nativa de CPF/CNPJ, máscara de telefone/WhatsApp, CEP automático via ViaCEP e campos separados para Nota Fiscal.",
    nativeModule: "Módulo Fiscal & Validador BR"
  },
  {
    name: "Claudio Sanches - Correios para WooCommerce",
    wpCategory: "SHIPPING",
    action: "APRIMORADO_NATIVO",
    reason: "Cálculo instantâneo de frete integrado à régua gamificada de Frete Grátis acima de R$ 250 e geração de etiquetas térmicas Zebra 10x15.",
    nativeModule: "Módulo Logístico & Frete Grátis R$ 250"
  },

  // 5. PROTEÇÃO DE CATÁLOGO & FOTOS (WATERMARK)
  {
    name: "WooCommerce Products Image Watermark",
    wpCategory: "BUILDER_CUSTOM",
    action: "APRIMORADO_NATIVO",
    reason: "Proteção contra roubo de fotos por concorrentes do Mercado Livre/Shopee: módulo nativo com switch para carimbar marca d'água PlayTech nas fotos.",
    nativeModule: "Módulo Marca D'água PlayTech"
  },

  // 6. MARKETING, SEO & TRACKING
  {
    name: "Rank Math SEO & Rank Math SEO PRO",
    wpCategory: "MARKETING_SEO",
    action: "APRIMORADO_NATIVO",
    reason: "SEO Técnico automatizado: JSON-LD Schema de Produto (preço no PIX, estoque, avaliações) e OpenGraph dinâmico com <5ms de resposta.",
    nativeModule: "Central SEO & Rich Snippets"
  },
  {
    name: "Google for WooCommerce & Site Kit by Google",
    wpCategory: "MARKETING_SEO",
    action: "INTEGRADO_API",
    reason: "Feed XML dinâmico para Google Merchant Center / Google Shopping atualizado em tempo real com o estoque unificado.",
    nativeModule: "Feed Google Shopping XML"
  },
  {
    name: "Code Snippets",
    wpCategory: "MARKETING_SEO",
    action: "APRIMORADO_NATIVO",
    reason: "Gerenciador no painel admin para o Lucas colar Meta Pixel, TikTok Ads, Google Tag e scripts personalizados sem tocar no código.",
    nativeModule: "Gerenciador de Pixels & Tags"
  },
  {
    name: "MC4WP: Mailchimp para WordPress",
    wpCategory: "MARKETING_SEO",
    action: "APRIMORADO_NATIVO",
    reason: "Captura de leads com cupom de desconto de saída (Exit-Intent: BFPLAY5) e sincronização via Webhook com WhatsApp/CRM.",
    nativeModule: "Motor de Cupons & Exit Intent"
  },

  // 7. ATENDIMENTO E NOTIFICAÇÕES AUTOMÁTICAS NO WHATSAPP (WPNOTIF)
  {
    name: "WPNotif: WordPress SMS & WhatsApp Notifications",
    wpCategory: "COMMUNICATION",
    action: "APRIMORADO_NATIVO",
    reason: "Automação nativa de WhatsApp: dispara mensagens personalizadas para o cliente quando o PIX é aprovado, quando a NFe é emitida e com o rastreio dos Correios.",
    nativeModule: "Central Notificações WhatsApp PlayTech"
  },
  {
    name: "Whatsapp Chat by NinjaTeam",
    wpCategory: "COMMUNICATION",
    action: "APRIMORADO_NATIVO",
    reason: "Botão WhatsApp inteligente com link pré-preenchido do produto em visualização + bot com IA para responder dúvidas técnicas.",
    nativeModule: "Floating Smart WhatsApp & SAC IA"
  },
  {
    name: "WP Mail SMTP & Post SMTP & Check & Log Email",
    wpCategory: "COMMUNICATION",
    action: "APRIMORADO_NATIVO",
    reason: "Substituído por envio de alta entregabilidade (Resend / AWS SES) com log de envio de DANFE e comprovante de pedido.",
    nativeModule: "Central de Mensageria & NFe"
  },

  // 8. CONSTRUTOR DE PÁGINAS (ELEMENTOR)
  {
    name: "Elementor & Elementor Pro",
    wpCategory: "BUILDER_CUSTOM",
    action: "APRIMORADO_NATIVO",
    reason: "O Elementor injeta mais de 20MB de CSS e JS desnecessários. Substituímos pelo nosso Gerador de Landing Pages (/lp/[slug]) estático e ultrarrápido.",
    nativeModule: "Gerador de LPs de Alta Conversão"
  }
];
