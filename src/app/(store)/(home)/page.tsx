import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

import { api } from "@/data/api";
import { Product } from "@/data/types/products";

/**
 * Função assíncrona que obtém os produtos em destaque da API.
 * - A configuração de cache para revalidação da página é definida para 1 hora (3600 segundos).
 * - Ao retornar os produtos, a função faz a conversão do JSON em um array de `Product`.
 *
 * @returns {Promise<Product[]>} Lista de produtos em destaque.
 */
async function getFeatureProducts(): Promise<Product[]> {
  const response = await api("/products/featured", {
    next: {
      // Revalida o cache a cada 1 hora (60s * 60s).
      revalidate: 60 * 60,
    },
  });
  const products = await response.json();

  return products;
}

export const metadata: Metadata = {
  title: "Home",
  description: "Gerado por create next app",
};

/**
 * Componente da página inicial que exibe produtos destacados e outros produtos em uma grade.
 * - `highLightedProduct` é exibido em uma área maior, enquanto `otherProducts` ocupam espaços menores na grade.
 * - Cada produto é exibido com imagem, título e preço, e tem uma animação de aumento ao passar o cursor.
 *
 * @returns {JSX.Element} A estrutura de layout da página principal com produtos destacados.
 */
export default async function Home() {
  // Simula um atraso de 1 segundo para fins de demonstração.
  // await new Promise((resolve) => setTimeout(resolve, 1000));a
  const [highLightedProduct, ...otherProducts] = await getFeatureProducts();

  return (
    <div className="grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6">
      {/* Produto em destaque: ocupa a maior parte da grade */}
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
      >
        <Image
          src={highLightedProduct.image}
          alt="Image"
          width={920}
          height={920}
          quality={100}
          className="group-hover:scale-105 transition transform duration-500"
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] border-2 border-zinc-500 rounded-full bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLightedProduct.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {/* Outros produtos em destaque: cada um ocupa uma área menor na grade */}
      {otherProducts.map((otherProduct) => {
        return (
          <Link
            key={otherProduct.id}
            href={`/product/${otherProduct.slug}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
          >
            <Image
              src={otherProduct.image}
              alt=""
              width={920}
              height={920}
              quality={100}
              className="group-hover:scale-105 transition transform duration-500"
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] border-2 border-zinc-500 rounded-full bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{otherProduct.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {otherProduct.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
