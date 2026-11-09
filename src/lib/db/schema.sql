-- ============================================================================
-- PLAYTECH OMNICHANNEL HUB — ESQUEMA RELACIONAL POSTGRESQL UNIFICADO
-- Plataformas atendidas: PlayTech Store (Web), Mercado Livre, Shopee, Amazon
-- ============================================================================

-- Extensões recomendadas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. TABELA MESTRE DE CATEGORIAS
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    icon VARCHAR(80),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABELA CENTRAL DE PRODUTOS (SINGLE SOURCE OF TRUTH)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    storefront_title VARCHAR(200) NOT NULL,
    short_description TEXT,
    full_description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    
    -- Custos e Precificação Base
    cost_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    markup_percent NUMERIC(6, 2) NOT NULL DEFAULT 35.00,
    base_sale_price NUMERIC(12, 2) NOT NULL,
    compare_at_price NUMERIC(12, 2),
    black_friday_price NUMERIC(12, 2),
    
    -- Dimensões e Logística (Cruciais para cálculo de frete Correios/Melhor Envio)
    weight_kg NUMERIC(8, 3) DEFAULT 0.300,
    length_cm NUMERIC(8, 2) DEFAULT 15.00,
    width_cm NUMERIC(8, 2) DEFAULT 10.00,
    height_cm NUMERIC(8, 2) DEFAULT 5.00,
    
    -- Dados Fiscais (NFe via Certificado A1 / Sefaz)
    ncm VARCHAR(20),
    ean_barcode VARCHAR(30),
    origin_code INT DEFAULT 1, -- 1 = Estrangeira - Importação direta
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE ESTOQUE GLOBAL E RESERVAS
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    physical_stock INT NOT NULL DEFAULT 0,
    reserved_stock INT NOT NULL DEFAULT 0,
    available_stock INT GENERATED ALWAYS AS (physical_stock - reserved_stock) STORED,
    location VARCHAR(100) DEFAULT 'Guará II - Brasília DF',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. GALERIA DE IMAGENS E MÍDIAS (CLOUDFLARE R2)
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    r2_url VARCHAR(500) NOT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CONFIGURAÇÃO DE SINCRONIZAÇÃO OMNICHANNEL POR PRODUTO
-- Controla a publicação e regras individuais em cada canal
CREATE TYPE marketplace_channel AS ENUM ('PLAYTECH_WEB', 'MERCADO_LIVRE', 'SHOPEE', 'AMAZON');

CREATE TABLE IF NOT EXISTS product_marketplace_sync (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    channel marketplace_channel NOT NULL,
    
    -- IDs de vinculação externa
    external_item_id VARCHAR(120), -- ex: MLB382910423 no Mercado Livre, item_id na Shopee, ASIN na Amazon
    sync_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, SYNCED, OUT_OF_STOCK, ERROR
    
    -- Preço específico adaptado às taxas de comissão daquele canal
    channel_sale_price NUMERIC(12, 2) NOT NULL,
    channel_stock_allocated INT NOT NULL DEFAULT 0,
    
    last_synced_at TIMESTAMP WITH TIME ZONE,
    last_error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(product_id, channel)
);

-- 6. LOGS DE SINCRONIZAÇÃO EM TEMPO REAL (EVENT-DRIVEN)
CREATE TABLE IF NOT EXISTS marketplace_sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    channel marketplace_channel NOT NULL,
    event_type VARCHAR(60) NOT NULL, -- PRICE_UPDATE, STOCK_DECREMENT, LISTING_CREATED
    payload JSONB,
    response_status INT,
    response_body JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. ÍNDICES DE ALTA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_sync_channel_status ON product_marketplace_sync(channel, sync_status);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory(product_id);

-- Comentários descritivos
COMMENT ON TABLE products IS 'Base única de produtos que alimenta PlayTech Web, Shopee, Mercado Livre e Amazon';
COMMENT ON TABLE product_marketplace_sync IS 'Tabela de conexão com IDs externos de Mercado Livre (MLB), Shopee (Item ID) e Amazon (ASIN)';

