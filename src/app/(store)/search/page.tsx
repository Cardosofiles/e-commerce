import { redirect } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { api } from "@/data/api";
import { Product } from "@/data/types/products";

interface SearchProps {
  searchParams: {
    q?: string;
  };
}

/**
 * Função assíncrona para buscar produtos com base na consulta de pesquisa.
 * - Realiza uma requisição à API para obter produtos correspondentes à consulta.
 * - Revalida o cache a cada 1 hora (60s * 60s).
 *
 * @param {string} query - A consulta de pesquisa para buscar produtos.
 * @returns {Promise<Product[]>} Uma promessa que resolve para uma lista de produtos correspondentes.
 */
async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const products = await response.json();

  return products;
}

/**
 * Componente de busca de produtos (`Search`).
 * - Renderiza os resultados da busca com base nos parâmetros de pesquisa.
 * - Redireciona para a página inicial se a consulta de pesquisa estiver vazia.
 *
 * @param {SearchProps} searchParams - Parâmetros de busca contendo a consulta.
 * @returns {JSX.Element} A lista de produtos correspondentes à consulta de pesquisa.
 */
export default async function Search({ searchParams }: SearchProps) {
  const { q } = await searchParams;

  // Redireciona para a página inicial se a consulta estiver vazia.
  if (!q) {
    redirect("/");
  }

  const products = await searchProducts(q);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{q}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id} // A chave única para identificar cada item da lista, usando o ID do produto.
              href={`/product/${product.slug}`} // A URL para a qual o link leva, utilizando o slug do produto para gerar um caminho dinâmico.
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start" // Classes do Tailwind CSS para estilização do link:
              // - 'group': permite aplicar estilos em elementos filhos quando o link é focado ou hover.
              // - 'relative': define o posicionamento relativo para elementos filhos que usam 'absolute'.
              // - 'rounded-lg': aplica bordas arredondadas ao link.
              // - 'bg-zinc-900': define a cor de fundo como um tom escuro de zinco.
              // - 'overflow-hidden': oculta partes do conteúdo que excedem o contêiner.
              // - 'flex justify-center items-start': utiliza flexbox para centralizar o conteúdo horizontalmente e alinhar no topo.
            >
              <Image
                src={product.image} // O caminho da imagem do produto que será exibida.
                alt="Image" // Texto alternativo para a imagem, importante para acessibilidade.
                width={480} // A largura da imagem em pixels.
                height={480} // A altura da imagem em pixels.
                quality={100} // A qualidade da imagem, onde 100 é a melhor qualidade.
                className="group-hover:scale-105 transition transform duration-500" // Classes do Tailwind CSS para animação da imagem:
                // - 'group-hover:scale-105': aumenta a escala da imagem em 5% quando o grupo (o link) é focado ou hover.
                // - 'transition transform duration-500': aplica uma transição suave que dura 500 milissegundos.
              />

              <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] border-2 border-zinc-500 rounded-full bg-black/60 p-1 pl-5">
                {/* Contêiner para o título e preço do produto, posicionado absolutamente dentro do link */}
                <span className="text-sm truncate">{product.title}</span>
                {/* Exibe o título do produto em um tamanho de texto pequeno, com 'truncate' para cortar o texto se for muito longo */}
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {/* Exibe o preço do produto em uma bolha estilizada */}
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency", // Formata o número como uma moeda.
                    currency: "BRL", // Define a moeda como Real Brasileiro.
                    maximumFractionDigits: 0, // Limita a quantidade máxima de dígitos fracionários a 0.
                    minimumFractionDigits: 0, // Garante que não haja dígitos fracionários exibidos.
                  })}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
