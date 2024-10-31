"use client";

// Contexto para gerenciamento de estados e propriedades
import { useCart } from "@/contexts/card-context";

export interface AddToCartButtonProps {
  productId: number;
  // Outros parâmetros opcionais podem ser adicionados conforme necessário
  // como quantidade, estado de loading, estilo do botão e etc.
}

/**
 * Componente de botão "Adicionar ao Carrinho".
 * - Este botão permite que o usuário adicione um produto específico ao carrinho.
 * - Utiliza o contexto `useCart` para acessar a função `addToCart`.
 *
 * @param {AddToCartButtonProps} props - Propriedades do botão, incluindo `productId` do produto.
 * @returns {JSX.Element} Botão que adiciona o produto ao carrinho ao ser clicado.
 */
export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  /**
   * Função para adicionar o produto ao carrinho.
   * - Invoca `addToCart` com o `productId` específico.
   */
  function handleAddProductToCart() {
    addToCart(productId);
  }

  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  );
}
