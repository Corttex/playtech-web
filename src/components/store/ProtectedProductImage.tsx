"use client";

import React from "react";

interface ProtectedProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  badgeContent?: React.ReactNode;
  aspectClass?: string;
}

/**
 * ProtectedProductImage
 * 1. Exibe a imagem do produto.
 * 2. Posiciona marca d'água oficial do Favicon no rodapé direito com opacidade elegante.
 * 3. Cria uma camada invisível transparente (overlay anti-pirataria):
 *    - Bloqueia arrastar a imagem (drag & drop).
 *    - Se o usuário clicar com botão direito e for em "Salvar imagem como...",
 *      o navegador salva a camada transparente com a logo oficial da PlayTech no lugar!
 *    - Impede a cópia direta do arquivo original por concorrentes.
 */
export default function ProtectedProductImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  badgeContent,
  aspectClass = "aspect-square"
}: ProtectedProductImageProps) {
  return (
    <div className={`relative select-none overflow-hidden flex items-center justify-center w-full ${aspectClass}`}>
      {/* 1. Imagem Real do Produto no Fundo */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${className} pointer-events-none`}
          loading="lazy"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      ) : (
        <div className="text-gray-400 text-xs">Sem foto</div>
      )}

      {/* 2. Marca d'Água Oficial do Favicon no Rodapé Direito */}
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none z-10 flex items-center gap-1 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-gray-200/60 dark:border-gray-700/60 shadow-xs">
        <img
          src="/favicon.png"
          alt="PlayTech Official Verified"
          className="w-3.5 h-3.5 object-contain"
        />
        <span className="text-[9px] font-black tracking-wider uppercase text-blue-600 dark:text-blue-400">
          PlayTech
        </span>
      </div>

      {/* 3. Escudo Protetor Superior (Camada Invisível Anti-Download) */}
      <img
        src="/favicon.png"
        alt="PlayTech Security Protected"
        className="absolute inset-0 w-full h-full object-cover opacity-0 z-20 cursor-pointer"
        title={alt}
        onDragStart={(e) => e.preventDefault()}
      />

      {/* Badges Opcionais (ex: Desconto, Black Friday) */}
      {badgeContent && (
        <div className="relative z-30 pointer-events-none w-full h-full absolute inset-0">
          {badgeContent}
        </div>
      )}
    </div>
  );
}

