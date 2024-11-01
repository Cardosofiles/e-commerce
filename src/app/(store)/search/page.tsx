import Image from "next/image";
import Link from "next/link";

export default async function Seach() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">moleton</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Link
          href={`/product/moletom-never-stop-learning`}
          className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
        >
          <Image
            src="/moletom-never-stop-learning.png"
            alt="Image"
            width={480}
            height={480}
            quality={100}
            className="group-hover:scale-105 transition transform duration-500"
          />

          <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] border-2 border-zinc-500 rounded-full bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">
              moletom-never-stop-learning
            </span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {Number(129).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
