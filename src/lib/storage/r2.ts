import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "1cfab13e4d7d62d5ea0d99f5a6d75d17";
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "1a7b7adfc6905d68473dc9881c9d1a56";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "a48bc27d1765a7d940ec3c6c3c908cb2708afc94425825aafc992911e5d07d22";
export const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || "playtech";
export const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-a45433b6775249c38e6449494f07ff4e.r2.dev";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Upload de arquivo (Buffer) para o Cloudflare R2
 */
export async function uploadToR2(
  fileBuffer: Buffer | Uint8Array,
  fileName: string,
  contentType: string
): Promise<{ url: string; key: string }> {
  // Higieniza o nome do arquivo e adiciona timestamp para evitar colisão
  const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `products/${Date.now()}-${cleanName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  const publicUrl = `${R2_PUBLIC_URL}/${key}`;
  return {
    url: publicUrl,
    key,
  };
}

/**
 * Lista objetos no bucket
 */
export async function listR2Objects(prefix = "products/") {
  const command = new ListObjectsV2Command({
    Bucket: R2_BUCKET,
    Prefix: prefix,
    MaxKeys: 100,
  });

  const response = await r2Client.send(command);
  return (
    response.Contents?.map((item) => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      url: `${R2_PUBLIC_URL}/${item.Key}`,
    })) || []
  );
}

