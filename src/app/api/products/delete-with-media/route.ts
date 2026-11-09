import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Configurações Cloudflare R2
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "1cfab13e4d7d62d5ea0d99f5a6d75d17";
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || "playtech";
const R2_ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "1a7b7adfc6905d68473dc9881c9d1a56";
const R2_SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "a48bc27d1765a7d940ec3c6c3c908cb2708afc94425825aafc992911e5d07d22";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
});

// PIN de Segurança Obrigatório
const MASTER_SECURITY_PIN = "220022";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin, productId, imageUrl, gallery } = body;

    // 1. Validação do PIN de Segurança
    if (!pin || pin !== MASTER_SECURITY_PIN) {
      return NextResponse.json(
        { error: "PIN de segurança incorreto. Operação de exclusão de mídia cancelada." },
        { status: 403 }
      );
    }

    // 2. Extrair chaves do bucket R2
    const keysToDelete: string[] = [];

    const extractKey = (url: string) => {
      if (!url) return null;
      if (url.includes("/products/")) {
        const parts = url.split("/products/");
        return `products/${parts[1]}`;
      }
      return null;
    };

    if (imageUrl) {
      const k = extractKey(imageUrl);
      if (k) keysToDelete.push(k);
    }

    if (Array.isArray(gallery)) {
      gallery.forEach((g) => {
        const k = extractKey(g);
        if (k && !keysToDelete.includes(k)) keysToDelete.push(k);
      });
    }

    // 3. Exclusão no bucket R2
    const deleteResults = await Promise.allSettled(
      keysToDelete.map((key) =>
        s3.send(
          new DeleteObjectCommand({
            Bucket: R2_BUCKET,
            Key: key,
          })
        )
      )
    );

    const deletedCount = deleteResults.filter((r) => r.status === "fulfilled").length;

    return NextResponse.json({
      success: true,
      message: `Produto ${productId || ""} removido. ${deletedCount} arquivo(s) de mídia expurgado(s) permanentemente do Cloudflare R2 com confirmação de PIN.`,
      purgedMedia: keysToDelete,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Falha ao processar exclusão de mídia do R2", details: error.message },
      { status: 500 }
    );
  }
}

