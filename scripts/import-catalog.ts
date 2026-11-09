import fs from "fs";
import path from "path";
import { parseWooCommerceCsv } from "./src/lib/catalog/wooImporter";

const csvPath = path.resolve(process.cwd(), "wc-product-export-3-11-2026-1793759995231.csv");
const outputPath = path.resolve(process.cwd(), "src/data/imported-products.json");

try {
  console.log(`Lendo CSV: ${csvPath}...`);
  const content = fs.readFileSync(csvPath, "utf-8");
  const products = parseWooCommerceCsv(content);
  console.log(`Produtos processados com sucesso: ${products.length}`);
  
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`Arquivo salvo em: ${outputPath}`);
} catch (error) {
  console.error("Erro ao importar produtos:", error);
  process.exit(1);
}

