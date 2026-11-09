import { NextResponse } from "next/server";
import { uploadToR2, listR2Objects } from "@/lib/storage/r2";

export async function GET() {
  try {
    const files = await listR2Objects();
    return NextResponse.json({ success: true, count: files.length, files });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro ao listar arquivos do Cloudflare R2" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado no formData (campo 'file')." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await uploadToR2(buffer, file.name, file.type || "application/octet-stream");

    return NextResponse.json({
      success: true,
      file: {
        name: file.name,
        size: file.size,
        type: file.type,
        key: uploaded.key,
        url: uploaded.url,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro no upload para o Cloudflare R2" },
      { status: 500 }
    );
  }
}

