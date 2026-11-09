/**
 * Script de Migração PlayTech:
 * 1. Lê os 309 produtos de 'src/data/imported-products.json'
 * 2. Mapeia e faz download das imagens de 'playtechbr.com.br'
 * 3. Faz upload para o Cloudflare R2 ('playtech' bucket)
 * 4. Atualiza 'src/data/imported-products.json' com as URLs do R2
 * 5. Gera o arquivo SQL de inserção para PostgreSQL 'scripts/seed_playtech_postgresql.sql'
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

// 1. Configurações Cloudflare R2 a partir do .env.local
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "1cfab13e4d7d62d5ea0d99f5a6d75d17";
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || "playtech";
const R2_PUBLIC_URL = (process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-a45433b6775249c38e6449494f07ff4e.r2.dev").replace(/\/$/, "");
const R2_ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "1a7b7adfc6905d68473dc9881c9d1a56";
const R2_SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "a48bc27d1765a7d940ec3c6c3c908cb2708afc94425825aafc992911e5d07d22";

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
});

const PRODUCTS_JSON_PATH = path.join(__dirname, '../src/data/imported-products.json');
const SQL_OUTPUT_PATH = path.join(__dirname, 'seed_playtech_postgresql.sql');

// Função auxiliar para baixar buffer de URL
function downloadImageBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImageBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Falha HTTP ${res.statusCode} ao baixar ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers['content-type'] || 'image/webp'
      }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout ao baixar ${url}`));
    });
  });
}

// Verifica se objeto já existe no R2
async function objectExistsInR2(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch (err) {
    return false;
  }
}

// Upload para R2
async function uploadToR2(key, buffer, contentType) {
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return `${R2_PUBLIC_URL}/${key}`;
}

// Gera SQL seguro
function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

async function runMigration() {
  console.log('🚀 Iniciando processo de migração para Cloudflare R2 e PostgreSQL...');
  
  if (!fs.existsSync(PRODUCTS_JSON_PATH)) {
    throw new Error(`Arquivo ${PRODUCTS_JSON_PATH} não encontrado.`);
  }

  const rawData = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf8');
  const products = JSON.parse(rawData);
  console.log(`📦 Carregados ${products.length} produtos do catálogo.`);

  // 1. Extrair mapa de URLs
  const urlMap = new Map(); // originalUrl -> r2Url

  // Coleta todas as URLs do WordPress
  products.forEach(p => {
    if (p.imageUrl && p.imageUrl.includes('playtechbr.com.br')) {
      urlMap.set(p.imageUrl, null);
    }
    if (Array.isArray(p.gallery)) {
      p.gallery.forEach(g => {
        if (g && g.includes('playtechbr.com.br')) {
          urlMap.set(g, null);
        }
      });
    }
  });

  const uniqueUrls = Array.from(urlMap.keys());
  console.log(`🖼️ Total de ${uniqueUrls.length} imagens únicas encontradas para migrar para o R2.`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  // Processa em lotes de 10 concorrentes
  const CONCURRENCY = 10;
  for (let i = 0; i < uniqueUrls.length; i += CONCURRENCY) {
    const chunk = uniqueUrls.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(async (url) => {
      try {
        // Nome limpo da chave no R2: "products/nome-do-arquivo.ext"
        const parsed = new URL(url);
        const filename = path.basename(parsed.pathname);
        const r2Key = `products/${filename}`;
        const finalR2Url = `${R2_PUBLIC_URL}/${r2Key}`;

        // Checar se já existe no R2
        const exists = await objectExistsInR2(r2Key);
        if (exists) {
          urlMap.set(url, finalR2Url);
          skipCount++;
          return;
        }

        // Baixar imagem do WordPress
        const { buffer, contentType } = await downloadImageBuffer(url);

        // Subir para o R2
        await uploadToR2(r2Key, buffer, contentType);
        urlMap.set(url, finalR2Url);
        successCount++;
      } catch (err) {
        console.warn(`⚠️ Não foi possível migrar: ${url} -> ${err.message}`);
        failCount++;
        // Se falhar o download, mantém a URL de origem como fallback
        urlMap.set(url, url);
      }
    }));

    const progress = Math.min(i + CONCURRENCY, uniqueUrls.length);
    if (progress % 50 === 0 || progress === uniqueUrls.length) {
      console.log(`⏳ Progresso imagens: ${progress}/${uniqueUrls.length} (Uploads: ${successCount}, Já existentes: ${skipCount}, Falhas: ${failCount})`);
    }
  }

  console.log(`✅ Concluída migração das imagens!`);
  console.log(`   - Enviadas com sucesso: ${successCount}`);
  console.log(`   - Já estavam no R2: ${skipCount}`);
  console.log(`   - Falhas mantidas em fallback: ${failCount}`);

  // 2. Atualizar produtos com URLs do R2
  const updatedProducts = products.map(p => {
    const newImageUrl = urlMap.get(p.imageUrl) || p.imageUrl;
    const newGallery = Array.isArray(p.gallery)
      ? p.gallery.map(g => urlMap.get(g) || g)
      : [];

    return {
      ...p,
      imageUrl: newImageUrl,
      gallery: newGallery,
    };
  });

  // Salvar backup antes
  fs.writeFileSync(PRODUCTS_JSON_PATH.replace('.json', '.backup.json'), rawData, 'utf8');
  // Salvar catálogo atualizado
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(updatedProducts, null, 2), 'utf8');
  console.log(`💾 Catálogo ${PRODUCTS_JSON_PATH} atualizado com as URLs do R2!`);

  // 3. Gerar Script SQL para o PostgreSQL
  console.log(`📝 Gerando script SQL com os 309 produtos para o PostgreSQL...`);
  
  let sql = `-- ========================================================
-- PLAYTECH BRASIL - SEED DO CATÁLOGO DE PRODUTOS (POSTGRESQL)
-- Gerado automaticamente a partir do acervo oficial sincronizado com Cloudflare R2
-- Total de Produtos: ${updatedProducts.length}
-- ========================================================

-- 1. Garante que as tabelas essenciais existem
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(100) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  storefront_title TEXT NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  base_sale_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  bf_sale_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  compare_at_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  cost_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  bf_sold_percent INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  short_description TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Mapeamento para Marketplaces (Mercado Livre, Shopee, Amazon)
CREATE TABLE IF NOT EXISTS product_channel_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku VARCHAR(100) NOT NULL,
  channel VARCHAR(50) NOT NULL, -- 'mercadolivre', 'shopee', 'amazon', 'playtech_web'
  channel_product_id VARCHAR(100),
  channel_price NUMERIC(10, 2) NOT NULL,
  sync_status VARCHAR(50) DEFAULT 'ACTIVE',
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sku, channel)
);

-- 3. Inserção de Categorias Únicas
INSERT INTO categories (name, slug)
VALUES
  ('Áudio & Som', 'audio-e-som'),
  ('Casa & Utensílios', 'casa-e-utensilios'),
  ('Carregadores e Cabos', 'carregadores-e-cabos'),
  ('Iluminação', 'iluminacao'),
  ('Informática', 'informatica'),
  ('Automotivo e Acessórios', 'automotivo-e-acessorios'),
  ('Gaming & Retrô', 'gaming-e-retro'),
  ('Projetores & Câmeras', 'projetores-e-cameras'),
  ('Smartwatches', 'smartwatches')
ON CONFLICT (name) DO NOTHING;

-- 4. Inserção de Todos os 309 Produtos
`;

  updatedProducts.forEach((p) => {
    const sku = escapeSql(p.sku);
    const title = escapeSql(p.title);
    const storefrontTitle = escapeSql(p.storefrontTitle || p.title);
    const categoryName = escapeSql(p.category);
    const baseSalePrice = Number(p.baseSalePrice || 0).toFixed(2);
    const bfSalePrice = Number(p.bfSalePrice || 0).toFixed(2);
    const compareAtPrice = Number(p.compareAtPrice || 0).toFixed(2);
    const costPrice = Number(p.costPrice || 0).toFixed(2);
    const stockQuantity = parseInt(p.stockQuantity || 100, 10);
    const bfSoldPercent = parseInt(p.bfSoldPercent || 50, 10);
    const imageUrl = escapeSql(p.imageUrl);
    const galleryJson = escapeSql(JSON.stringify(p.gallery || []));
    const shortDesc = escapeSql(p.shortDescription || '');
    const desc = escapeSql(p.description || '');

    sql += `
INSERT INTO products (
  sku, title, storefront_title, category_name,
  base_sale_price, bf_sale_price, compare_at_price, cost_price,
  stock_quantity, bf_sold_percent, image_url, gallery_urls,
  short_description, description
) VALUES (
  ${sku}, ${title}, ${storefrontTitle}, ${categoryName},
  ${baseSalePrice}, ${bfSalePrice}, ${compareAtPrice}, ${costPrice},
  ${stockQuantity}, ${bfSoldPercent}, ${imageUrl}, ${galleryJson}::jsonb,
  ${shortDesc}, ${desc}
)
ON CONFLICT (sku) DO UPDATE SET
  title = EXCLUDED.title,
  storefront_title = EXCLUDED.storefront_title,
  category_name = EXCLUDED.category_name,
  base_sale_price = EXCLUDED.base_sale_price,
  bf_sale_price = EXCLUDED.bf_sale_price,
  compare_at_price = EXCLUDED.compare_at_price,
  cost_price = EXCLUDED.cost_price,
  stock_quantity = EXCLUDED.stock_quantity,
  image_url = EXCLUDED.image_url,
  gallery_urls = EXCLUDED.gallery_urls,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  updated_at = NOW();
`;
  });

  fs.writeFileSync(SQL_OUTPUT_PATH, sql, 'utf8');
  console.log(`📄 Script SQL gerado com sucesso em: ${SQL_OUTPUT_PATH}`);
  console.log(`🎉 Migração completa concluída com êxito!`);
}

runMigration().catch((err) => {
  console.error('❌ Erro fatal durante a migração:', err);
  process.exit(1);
});

