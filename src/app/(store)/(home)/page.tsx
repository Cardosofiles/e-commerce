import Image from "next/image";
import Link from "next/link";

import { api } from "@/data/api";
import { Product } from "@/data/types/products";

async function getFeatureProducts(): Promise<Product[]> {
  const response = await api("/products/featured");
  const products = await response.json();

  return products;
}

export default async function Home() {
  const [highLightedProduct, ...otherProducts] = await getFeatureProducts();

  return (
    <div className="grid max-h-[800px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/products/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
      >
        <Image
          src={highLightedProduct.image}
          alt=""
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
