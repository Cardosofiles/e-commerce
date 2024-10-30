import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Componente de cabeçalho para a aplicação, incluindo link para a home, barra de busca, ícone do carrinho e conta do usuário.
 * - O cabeçalho é dividido em duas seções principais: logotipo com barra de busca e informações do usuário com link para conta.
 *
 * @returns {JSX.Element} Elemento JSX que representa o cabeçalho da página.
 */
export function Header() {
  return (
    <div className="flex items-center justify-between">
      {/* Seção da logo e barra de busca */}
      <div className="flex items-center gap-5">
        {/* Link para a página inicial */}
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>

        {/* Formulário de busca */}
        <form className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
          {/* Ícone de busca */}
          <Search className="w-4 h-4 text-zinc-500" />

          {/* Campo de entrada de texto para pesquisa de produto */}
          <input
            type="text"
            placeholder="Buscar produto..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </form>
      </div>

      {/* Seção de informações do usuário e carrinho */}
      <div className="flex items-center gap-4">
        {/* Carrinho de compras com ícone e quantidade de itens */}
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          <span className="text-sm">Cart (0)</span>
        </div>

        {/* Divisor visual entre carrinho e link de conta */}
        <div className="w-px h-4 bg-zinc-700" />

        {/* Link para a conta do usuário com imagem de perfil */}
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            className="w-8 h-8 rounded-full"
            width={480}
            height={480}
            quality={100}
            alt="logo profile"
            src="https://github.com/cardosofiles.png"
          />
        </Link>
      </div>
    </div>
  );
}
