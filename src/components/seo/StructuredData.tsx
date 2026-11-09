import React from "react";
import importedProducts from "@/data/imported-products.json";

export default function StructuredData() {
  // 1. Organização / Empresa (Para ativar o Painel de Conhecimento do Google à direita)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PlayTech Brasil",
    "legalName": "PlayTech Brasil Tecnologia & Eletrônicos",
    "url": "https://playtechbr.com.br",
    "logo": "https://playtechbr.com.br/logo-playtech-dark.png",
    "image": "https://playtechbr.com.br/logo-playtech-dark.png",
    "description": "Loja oficial PlayTech Brasil: Mini Projetores Smart 4K, Game Sticks Retrô, Linha de Áudio Sabala e Acessórios com Nota Fiscal e Garantia.",
    "email": "atendimento@playtechbr.com.br",
    "telephone": "+55-61-99661-3292",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brasília",
      "addressRegion": "DF",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.instagram.com/playtech.brasil/",
      "https://www.facebook.com/people/Play-Tech-Technology/61567487230253/"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+55-61-99661-3292",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": ["Portuguese"]
      }
    ]
  };

  // 2. WebSite com Busca Integrada e Sitelinks Searchbox
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PlayTech Brasil",
    "url": "https://playtechbr.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://playtechbr.com.br/?busca={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 3. ItemList com os Principais Produtos do Catálogo (Rich Snippets nos Resultados)
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": importedProducts.slice(0, 15).map((prod: any, idx: number) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": prod.storefrontTitle || prod.title,
        "image": prod.imageUrl,
        "description": prod.shortDescription || prod.title,
        "sku": prod.sku,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BRL",
          "price": prod.bfSalePrice || prod.baseSalePrice,
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "PlayTech Brasil"
          }
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
    </>
  );
}

