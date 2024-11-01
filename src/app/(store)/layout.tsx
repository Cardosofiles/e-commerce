import { ReactNode } from "react";

import { Header } from "@/components/header";
import { CartProvider } from "@/contexts/cart-context";

/**
 * Componente de layout para a loja (`LayoutStore`).
 * - Fornece o contexto do carrinho (`CartProvider`) para os componentes filhos.
 * - Inclui o cabeçalho da página (`Header`) e uma área para renderizar o conteúdo principal.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {ReactNode} props.children - Componentes filhos que serão renderizados no layout da loja.
 * @returns {JSX.Element} Layout da loja com o contexto do carrinho e cabeçalho.
 */
export default function LayoutStore({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}
