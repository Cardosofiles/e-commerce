import Image from "next/image";

import { Metadata } from "next";

import { api } from "@/data/api";
import { Product } from "@/data/types/products";

// interface ProductProps {
//   params: { slug: string };
// }

interface ProductProps {
  params: Promise<{ slug: string }>;
}

/**
 * Função assíncrona para gerar metadados de um produto específico com base no `slug` fornecido.
 * - O título do produto é utilizado como título da página.
 *
 * @param {ProductProps} params - Objeto contendo o parâmetro `slug`.
 * @returns {Promise<Metadata>} Objeto de metadados com o título do produto.
 */
export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const product = await getProduct(slug);

  return {
    title: product.title,
  };
}

/**
 * Função assíncrona que gera parâmetros estáticos para os produtos em destaque.
 * - Mapeia os produtos em destaque para gerar uma lista de `slug`, usada para renderização estática.
 *
 * @returns {Promise<{ slug: string }[]>} Lista de objetos contendo `slug` dos produtos.
 */
export async function generateStaticParams() {
  const response = await api("/products/featured");
  const products: Product[] = await response.json();

  return products.map((product) => {
    return { slug: product.slug };
  });
}

/**
 * Função assíncrona que obtém um produto específico a partir do `slug`.
 * - A configuração de cache para revalidação é definida para 1 hora (3600 segundos).
 * - Retorna o produto correspondente ao `slug` informado.
 *
 * @param {string} slug - Identificador único do produto.
 * @returns {Promise<Product>} O objeto `Product` referente ao `slug` informado.
 */
async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      // Revalida o cache a cada 1 hora (60s * 60s).
      revalidate: 60 * 60,
    },
  });
  const product = await response.json();

  return product;
}

/**
 * Componente da página de produto individual, que exibe as informações detalhadas do produto.
 * - Exibe imagem, título, descrição, preço e opções de tamanho do produto.
 * - Inclui um botão para adicionar o produto ao carrinho.
 *
 * @param {ProductProps} params - Objeto contendo o parâmetro `slug` para identificar o produto.
 * @returns {JSX.Element} Estrutura de layout para exibição de um produto específico.
 */
export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await Promise.resolve(params);
  const product = await getProduct(slug);

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      {/* Exibe a imagem do produto */}
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      {/* Informações detalhadas do produto */}
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        {/* Exibe o preço e o valor parcelado */}
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
          <span className="text-lg text-zinc-400">
            {(product.price / 12).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        {/* Seleção de tamanhos do produto */}
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            {["P", "M", "G", "GG"].map((size) => (
              <button
                key={size}
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold-s"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Botão de adicionar ao carrinho */}
        <button className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
