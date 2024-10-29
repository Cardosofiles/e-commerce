import Image from "next/image";

import { api } from "@/data/api";
import { Product } from "@/data/types/products";

interface ProductProps {
  params: { slug: string };
}

// export async function generateMetadata({
//   params,
// }: ProductProps): Promise<Metadata> {
//   const product = await getProduct(params.slug);

//   return {
//     title: product.title,
//   };
// }

// export async function generateStaticParams() {
//   const response = await api("/products/featured");
//   const products: Product[] = await response.json();

//   return products.map((product) => {
//     return { slug: product.slug };
//   });
// }

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

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug);

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src="/moletom-never-stop-learning.png"
          alt={product.image}
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

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

        <div className=" mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold-s">
              P
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold-s">
              M
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold-s">
              G
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold-s">
              GG
            </button>
          </div>
        </div>

        <button className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
