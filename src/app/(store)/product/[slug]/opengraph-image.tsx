import colors from "tailwindcss/colors";

import { ImageResponse } from "next/og";

import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { env } from "@/env";

export const runtime = "edge"; // Define o ambiente de execução como "edge".
export const alt = "About Acme"; // Texto alternativo para a imagem gerada.
export const size = { width: 1200, height: 630 }; // Dimensões da imagem de saída.

/**
 * Interface para os parâmetros do produto.
 * - `params`: Parâmetro contendo `slug` do produto.
 */
interface ProductProps {
  params: Promise<{ slug: string }>;
}

export const contentType = "image/png"; // Define o tipo de conteúdo da imagem.

/**
 * Função assíncrona para buscar um produto específico com base no `slug` fornecido.
 * - A API é chamada e revalida o cache a cada 1 hora.
 *
 * @param {string} slug - Identificador único do produto.
 * @returns {Promise<Product>} Dados do produto buscado.
 */
async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // Cache revalidado a cada 1 hora.
    },
  });
  const product = await response.json();
  return product;
}

/**
 * Função padrão assíncrona para renderizar uma imagem Open Graph para um produto.
 * - A imagem contém os detalhes do produto com um fundo customizado.
 * - O URL da imagem do produto é gerado e a imagem é exibida com estilo configurado.
 *
 * @param {ProductProps} params - Parâmetro contendo `slug` do produto.
 * @returns {Promise<ImageResponse>} Retorna uma resposta de imagem formatada.
 */
export default async function OgImage({ params }: ProductProps) {
  const { slug } = await Promise.resolve(params);
  const product = await getProduct(slug);

  // Gera a URL completa da imagem do produto usando a URL base do ambiente.
  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter",
        }}
      >
        {/* Exibe a imagem do produto em tamanho completo */}
        <img alt="" src={productImageURL} style={{ width: "100%" }} />
      </div>
    ),
    {
      ...size, // Define as dimensões da imagem de saída
    }
  );
}
