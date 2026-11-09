import { Product, OrderBumpItem, WordPressPluginEquivalent } from "../types";

export const PLAYTECH_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    sku: "HY320-BLK",
    ean: "7891020304011",
    invoiceTitle: "HY320 MINI PROJECTOR FULL HD 1080P 4K SUPPORT ANDROID TV WIFI 6",
    storefrontTitle: "Mini Projetor Smart HY320 Full HD 4K Android TV Wi-Fi 6",
    marketplaceTitleML: "Mini Projetor Smart Hy320 Android Tv Wifi 6 Full Hd 4k 150pol",
    slug: "mini-projetor-smart-hy320-4k",
    shortHeadline: "Cinema portátil de até 150 polegadas com Netflix e YouTube nativos.",
    descriptionHtml: "<p>O Projetor HY320 redefine a experiência audiovisual em casa. Conta com processador quad-core de alta eficiência, Wi-Fi 6 dual-band, lâmpada LED de 10.000 lúmens com suporte a 4K e rotação de 180 graus.</p>",
    category: "Projetores & Câmeras",
    costPrice: 280.00,
    compareAtPrice: 749.90,
    baseSalePrice: 600.00,
    bfSalePrice: 499.90,
    stock: 14,
    bfSoldPercent: 78,
    isHero: true,
    badge: "FRETE GRÁTIS",
    specs: {
      "Resolução": "1080p Nativo / Suporte a 4K",
      "Conectividade": "Wi-Fi 6 + Bluetooth 5.2",
      "Sistema Operacional": "Android TV 11.0",
      "Brilho": "390 ANSI Lumens (10.000 Lúmens)",
      "Projeção": "De 40 até 150 Polegadas"
    },
    weightKg: 1.55,
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.9,
    reviewsCount: 153,
    colors: [
      { name: "Preto Obsidian", hex: "#18181B" },
      { name: "Branco Glacial", hex: "#F4F4F5" }
    ]
  },
  {
    id: "prod-2",
    sku: "X3-PRO-8K",
    ean: "7891020304028",
    invoiceTitle: "CONSOLE GAME STICK X3 PRO ULTRA HD 8K 64GB 50000 JOGOS 2 CONTROLES",
    storefrontTitle: "Console Game Stick X3 Pro 8K — 50.000 Jogos + 2 Controles Sem Fio",
    marketplaceTitleML: "Video Game Stick X3 Pro 8k 50mil Jogos 2 Controles Sem Fio 64gb",
    slug: "console-game-stick-x3-pro-8k",
    shortHeadline: "Plugue no HDMI da TV e reviva os maiores clássicos sem precisar de internet.",
    descriptionHtml: "<p>Mais de 50.000 jogos retrô clássicos (PS1, Super Nintendo, Mega Drive, Arcade, Game Boy). Inclui 2 controles sem fio 2.4GHz com resposta instantânea e saída HDMI 4K/8K.</p>",
    category: "Gaming & Retrô",
    costPrice: 95.00,
    compareAtPrice: 329.90,
    baseSalePrice: 249.99,
    bfSalePrice: 199.90,
    stock: 9,
    bfSoldPercent: 85,
    isHero: true,
    badge: "ALTA PROCURA",
    specs: {
      "Armazenamento": "64GB MicroSD Classe 10",
      "Controles": "2x Wireless 2.4GHz (sem lag)",
      "Emuladores": "Mais de 25 consoles embutidos",
      "Conexão": "HDMI Plug & Play"
    },
    weightKg: 0.30,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80"
    ],
    rating: 4.8,
    reviewsCount: 97,
    colors: [
      { name: "Preto Carbono", hex: "#1F2937" }
    ]
  },
  {
    id: "prod-3",
    sku: "CS-4404",
    ean: "7891020304035",
    invoiceTitle: "ALTO-FALANTE BLUETOOTH RGB ILUMINACAO DINAMICA MICROFONE CS-4404",
    storefrontTitle: "Caixa de Som Bluetooth RGB Dinâmica com Microfone & Rádio FM",
    marketplaceTitleML: "Caixa Som Bluetooth Potente Rgb Karaokê Microfone Radio Fm Usb",
    slug: "caixa-de-som-bluetooth-rgb-com-microfone",
    shortHeadline: "Graves potentes, show de luzes RGB e entrada para microfone karaokê.",
    descriptionHtml: "<p>Som cristalino e envolvente para festas e confraternizações. Acompanha microfone, display LED e equalizador dinâmico de graves.</p>",
    category: "Áudio & Som",
    costPrice: 82.00,
    compareAtPrice: 219.99,
    baseSalePrice: 179.99,
    bfSalePrice: 149.90,
    stock: 22,
    bfSoldPercent: 60,
    isHero: false,
    badge: "-18% OFF",
    specs: {
      "Potência": "30W RMS Reais",
      "Bateria": "Até 6 horas contínuas",
      "Recursos": "RGB Dinâmico + Microfone Incluso",
      "Entradas": "Bluetooth 5.0, USB, TF Card e AUX"
    },
    weightKg: 1.50,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 64
  },
  {
    id: "prod-4",
    sku: "DR-051",
    ean: "7891020304042",
    invoiceTitle: "ALTO-FALANTE PORTATIL SABALA COM BLUETOOTH DR-051",
    storefrontTitle: "Caixa de Som Portátil Sabala DR-051 Bluetooth — Som Alta Definição",
    marketplaceTitleML: "Caixa De Som Sabala Dr-051 Bluetooth Portatil Original Bateria",
    slug: "caixa-de-som-sabala-dr-051-bluetooth",
    shortHeadline: "Acabamento premium metálico e bateria de longa duração para qualquer ambiente.",
    descriptionHtml: "<p>Original Sabala. Graves reforçados e proteção contra respingos. Perfeita para quem busca som limpo com acabamento requintado.</p>",
    category: "Áudio & Som",
    costPrice: 98.00,
    compareAtPrice: 239.99,
    baseSalePrice: 199.99,
    bfSalePrice: 169.90,
    stock: 7,
    bfSoldPercent: 88,
    isHero: false,
    badge: "SOM PREMIUM",
    specs: {
      "Marca": "Sabala Original",
      "Autonomia": "Até 10 Horas",
      "Conexão": "Bluetooth 5.1 TWS"
    },
    weightKg: 1.20,
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: "prod-5",
    sku: "RL-12TRIPE",
    ean: "7891020304059",
    invoiceTitle: "RING LIGHT LED DE 12 POLEGADAS COM TRIPE RL-12TRIPE",
    storefrontTitle: "Ring Light Profissional 12 Polegadas LED com Tripé Completo 2.10m",
    marketplaceTitleML: "Ring Light 12 Polegadas 30cm Led Tripe 2m Suporte Celular Live",
    slug: "ring-light-profissional-12-polegadas-tripe",
    shortHeadline: "Iluminação de estúdio perfeita para lives, vídeos, reels e maquiagem.",
    descriptionHtml: "<p>Com 3 tons de luz (quente, fria e neutra) com 10 níveis de intensidade dimerizáveis. Tripé extensível resistente em alumínio.</p>",
    category: "Iluminação",
    costPrice: 35.00,
    compareAtPrice: 129.90,
    baseSalePrice: 89.99,
    bfSalePrice: 69.90,
    stock: 31,
    bfSoldPercent: 45,
    isHero: false,
    badge: "CRIADORES",
    specs: {
      "Diâmetro": "30cm (12 Polegadas)",
      "Tripé": "Altura regulável até 2,10m",
      "Alimentação": "USB 5V com controle no cabo"
    },
    weightKg: 1.00,
    imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviewsCount: 38
  },
  {
    id: "prod-6",
    sku: "PTHC2431",
    ean: "7891020304066",
    invoiceTitle: "ASPIRADOR DE PO PORTATIL RECARREGAVEL 2 EM 1 SKU PTHC2431",
    storefrontTitle: "Aspirador Portátil Sem Fio 2 em 1 Recarregável USB — Alta Sucção",
    marketplaceTitleML: "Mini Aspirador De Po Sem Fio Portatil Carro Casa Soprador 2 Em 1",
    slug: "aspirador-portatil-sem-fio-2-em-1",
    shortHeadline: "Limpeza rápida para carros, sofás e teclados sem depender de tomadas.",
    descriptionHtml: "<p>Sucção ciclônica potente de 9000Pa e modo soprador reverso. Bateria de lítio recarregável com filtro lavável HEPA de longa duração.</p>",
    category: "Casa & Utensílios",
    costPrice: 18.00,
    compareAtPrice: 69.99,
    baseSalePrice: 39.99,
    bfSalePrice: 29.99,
    stock: 19,
    bfSoldPercent: 92,
    isHero: false,
    badge: "-43% OFF",
    specs: {
      "Sucção": "9.000 Pa Ciclônico",
      "Função": "Aspirador + Soprador de Ar",
      "Filtro": "HEPA Lavável e Reutilizável"
    },
    weightKg: 0.40,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 81
  }
];

export const ORDER_BUMP_PRODUCTS: OrderBumpItem[] = [
  {
    id: "bump-1",
    sku: "AL-9006",
    storefrontTitle: "Carregador Rápido Smart 2 Portas USB + Cabo V8 3.1A Turbo",
    baseSalePrice: 14.99,
    bfSalePrice: 12.90,
    pitchText: "Leve por R$ 14,99 e destrave FRETE GRÁTIS!",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "bump-2",
    sku: "ABT-CAR001",
    storefrontTitle: "Adaptador Receptor Bluetooth Automotivo Som & Rádio P2",
    baseSalePrice: 19.99,
    bfSalePrice: 15.90,
    pitchText: "Transforme o rádio do carro em Bluetooth por R$ 19,99!",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "bump-3",
    sku: "CB-USBC-T",
    storefrontTitle: "Cabo Reforçado Type-C Mallha de Nylon 1.5m 60W Turbo",
    baseSalePrice: 16.90,
    bfSalePrice: 13.90,
    pitchText: "Indispensável: cabo com pontas blindadas anti-rompimento.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80"
  }
];

export const WORDPRESS_PLUGINS_MAP: WordPressPluginEquivalent[] = [
  {
    id: "wp-1",
    wpPluginName: "WooCommerce Mercado Pago / Pagar.me / Asaas",
    wpSlug: "woocommerce-mercadopago",
    category: "PAGAMENTO",
    playtechSolution: "Checkout Transparente Nativo com PIX Dinâmico (QR Code + Copia e Cola) e Cartão em até 12x",
    nativeStatus: "IMPLEMENTADO",
    details: "Sem redirecionamento lento. Confirmação instantânea de pagamento via webhook e reserva de estoque automática."
  },
  {
    id: "wp-2",
    wpPluginName: "Melhor Envio / Frenet / Correios Oficial WooCommerce",
    wpSlug: "woocommerce-melhor-envio",
    category: "FRETE",
    playtechSolution: "Módulo Logístico Integrado com Régua Gamificada de Frete Grátis (R$ 250) + Geração de Etiquetas",
    nativeStatus: "IMPLEMENTADO",
    details: "Cálculo em lote no Edge Cache (<10ms). Gatilho de Order Bump inteligente sugerindo itens para atingir R$ 250."
  },
  {
    id: "wp-3",
    wpPluginName: "WPNotif: WordPress SMS & WhatsApp Notifications",
    wpSlug: "wpnotif",
    category: "ATENDIMENTO",
    playtechSolution: "Disparo Automático de Mensagens WhatsApp ao Aprovar Pedido, Emitir NFe e Despachar Pacote",
    nativeStatus: "IMPLEMENTADO",
    details: "Garante taxa de abertura de 98% e reduz suporte repetitivo no pós-venda."
  },
  {
    id: "wp-4",
    wpPluginName: "WooCommerce Products Image Watermark",
    wpSlug: "product-image-watermark",
    category: "MARKETING",
    playtechSolution: "Marca D'água Dinâmica Anti-Cópia com Logo PlayTech Brasil no Pipeline de Imagens",
    nativeStatus: "IMPLEMENTADO",
    details: "Protege o catálogo de concorrentes que copiam fotos para vender no Mercado Livre e Shopee."
  }
];
