import Image from "next/image";
import Link from "next/link";

import { CartWidget } from "./cart-widget";
import { SearchForm } from "./search-form";

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

        {/* use client para carregamento do input, com a função de buscar dos produtos */}
        <SearchForm />
      </div>

      {/* Seção de informações do usuário e carrinho */}
      <div className="flex items-center gap-4">
        {/* Carrinho de compras com ícone e quantidade de itens em um componente separado, para não retornar todo o HTML do header como use client */}
        <CartWidget />

        {/* Divisor visual entre carrinho e link de conta */}
        <div className="w-px h-4 bg-zinc-700" />

        {/* Link para a conta do usuário com imagem de perfil */}
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            className="w-8 h-8 rounded-full"
            width={480}
            height={480}
            // Qualidade renderizada na página
            quality={100}
            alt="logo profile"
            // Acessa a imagem do perfil do Github
            src="https://github.com/cardosofiles.png"
          />
        </Link>
      </div>
    </div>
  );
}
