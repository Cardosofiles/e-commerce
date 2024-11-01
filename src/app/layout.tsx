import localFont from "next/font/local";

import type { Metadata } from "next";

import "./globals.css";

// Carregamento das fontes locais com suporte para variação de peso
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadados da aplicação
export const metadata: Metadata = {
  // Título da página no navegador, usando um template
  title: {
    template: "%s | devstore",
    default: "devstore",
  },
  description: "",
};

/**
 * Layout raiz da aplicação (`RootLayout`).
 * - Envolve todos os componentes filhos e define a estrutura básica da página.
 * - Aplica estilos globais e fontes personalizadas.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - Propriedades que contêm os elementos filhos a serem renderizados.
 * @returns {JSX.Element} Estrutura HTML básica com as fontes e estilos aplicados.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
