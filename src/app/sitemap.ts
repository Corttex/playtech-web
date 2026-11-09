import { MetadataRoute } from "next";
import importedProducts from "@/data/imported-products.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://playtechbr.com.br";

  // Rotas Estáticas Principais
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#loja`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#atendimento`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/#troca-devolucao`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Rotas de Categorias para Sitelinks
  const categories = [
    "Audio",
    "Projetores",
    "Smartwatch",
    "Games",
    "Iluminacao",
    "Carregadores",
    "Automotivo",
    "Cozinha",
    "Ferramentas",
    "Informatica"
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/?categoria=${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Rotas dos 309 Produtos do Catálogo
  const productRoutes: MetadataRoute.Sitemap = importedProducts.slice(0, 100).map((prod: any) => ({
    url: `${baseUrl}/?produto=${prod.sku || prod.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

