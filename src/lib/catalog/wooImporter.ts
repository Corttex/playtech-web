import fs from "fs";
import path from "path";

// Script para processar o CSV do WooCommerce exportado pelo usuário e gerar o catálogo completo da PlayTech
export function parseWooCommerceCsv(csvContent: string) {
  const lines = csvContent.split(/\r?\n/);
  if (lines.length < 2) return [];

  // Parseador de linhas CSV com suporte a quebras e aspas duplas
  const products: any[] = [];
  
  // Vamos usar uma Regex para fazer split de linhas respeitando aspas
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField);
      currentField = "";
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField);
      if (currentRow.length > 5) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }
  if (currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const idIdx = headers.findIndex(h => h === "ID");
  const skuIdx = headers.findIndex(h => h === "SKU");
  const nomeIdx = headers.findIndex(h => h === "Nome");
  const descCurtaIdx = headers.findIndex(h => h === "Descrição curta");
  const descIdx = headers.findIndex(h => h === "Descrição");
  const precoPromoIdx = headers.findIndex(h => h === "Preço promocional");
  const precoIdx = headers.findIndex(h => h === "Preço");
  const catIdx = headers.findIndex(h => h === "Categorias");
  const imgIdx = headers.findIndex(h => h === "Imagens");
  const estoqueIdx = headers.findIndex(h => h === "Estoque");

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[nomeIdx]) continue;

    const sku = r[skuIdx]?.trim() || `SKU-${r[idIdx] || i}`;
    const name = r[nomeIdx]?.trim() || "Produto PlayTech";
    
    // Tratamento de Preços (ex: "39,99" -> 39.99)
    const rawSale = r[precoPromoIdx]?.replace(/\./g, '')?.replace(',', '.')?.trim();
    const rawRegular = r[precoIdx]?.replace(/\./g, '')?.replace(',', '.')?.trim();

    let salePrice = parseFloat(rawSale) || 0;
    let regularPrice = parseFloat(rawRegular) || 0;

    if (regularPrice === 0 && salePrice > 0) {
      regularPrice = salePrice * 1.3;
    } else if (salePrice === 0 && regularPrice > 0) {
      salePrice = regularPrice * 0.85;
    } else if (regularPrice === 0 && salePrice === 0) {
      regularPrice = 99.90;
      salePrice = 79.90;
    }

    // Imagens: pegar a primeira válida
    const rawImgs = r[imgIdx] ? r[imgIdx].split(',').map(s => s.trim()) : [];
    const mainImg = rawImgs[0] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600";

    // Categoria Normalizada
    const rawCat = r[catIdx] || "Acessórios e Diversos";
    let normalizedCategory = "Casa & Utensílios";

    if (rawCat.includes("Áudio") || rawCat.includes("Som") || rawCat.includes("Fone") || rawCat.includes("Caixa de som")) {
      normalizedCategory = "Áudio & Som";
    } else if (rawCat.includes("Smartwatch") || rawCat.includes("Relógio")) {
      normalizedCategory = "Smartwatches";
    } else if (rawCat.includes("Projetor") || rawCat.includes("Câmera") || rawCat.includes("Vídeo")) {
      normalizedCategory = "Projetores & Câmeras";
    } else if (rawCat.includes("Gamer") || rawCat.includes("Jogos") || rawCat.includes("Game")) {
      normalizedCategory = "Gaming & Retrô";
    } else if (rawCat.includes("Iluminação") || rawCat.includes("Lanterna") || rawCat.includes("LED") || rawCat.includes("Refletor")) {
      normalizedCategory = "Iluminação";
    } else if (rawCat.includes("Carregador") || rawCat.includes("Cabos") || rawCat.includes("Power Bank")) {
      normalizedCategory = "Carregadores e Cabos";
    } else if (rawCat.includes("Automotivo")) {
      normalizedCategory = "Automotivo e Acessórios";
    } else if (rawCat.includes("Cozinha") || rawCat.includes("Limpeza") || rawCat.includes("Eletrodomésticos")) {
      normalizedCategory = "Casa & Utensílios";
    } else if (rawCat.includes("Informática") || rawCat.includes("Teclado") || rawCat.includes("Mouse")) {
      normalizedCategory = "Informática";
    }

    products.push({
      id: r[idIdx]?.trim() || `prod-${i}`,
      sku,
      title: name,
      storefrontTitle: name.split('|')[0].trim(),
      category: normalizedCategory,
      baseSalePrice: Math.round(regularPrice * 100) / 100,
      bfSalePrice: Math.round(salePrice * 100) / 100,
      compareAtPrice: Math.round(Math.max(regularPrice, salePrice * 1.25) * 100) / 100,
      costPrice: Math.round((salePrice * 0.45) * 100) / 100,
      stockQuantity: parseInt(r[estoqueIdx]) || 50,
      bfSoldPercent: Math.floor(Math.random() * 40) + 55,
      imageUrl: mainImg,
      gallery: rawImgs.slice(0, 5),
      shortDescription: r[descCurtaIdx]?.replace(/<[^>]*>?/gm, '').trim() || "",
      description: r[descIdx]?.trim() || ""
    });
  }

  return products;
}

