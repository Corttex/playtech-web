import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "PlayTech Brasil | Tecnologia & Inovação — Loja Oficial",
  description: "Mini Projetor HY320 4K, Game Stick X3 Pro, Linha de Áudio Sabala e Acessórios. Envio Imediato com Nota Fiscal e Frete Grátis acima de R$ 250.",
  keywords: ["Projetor HY320", "Game Stick X3 Pro", "Sabala Áudio", "PlayTech Brasil", "Eletrônicos"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("playtech_theme")?.value || "light";
  const isDark = savedTheme === "dark";

  return (
    <html lang="pt-BR" className={isDark ? "dark" : "light"} style={{ colorScheme: savedTheme }}>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased selection:bg-blue-600 selection:text-white">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
