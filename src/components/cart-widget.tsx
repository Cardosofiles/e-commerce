"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/contexts/cart-context";

/**
 * Componente `CartWidget` que exibe o ícone de um carrinho de compras com a quantidade de itens.
 * - Utiliza o contexto `useCart` para acessar os itens adicionados ao carrinho.
 * - Exibe um ícone de sacola e a quantidade de itens entre parênteses ao lado.
 *
 * @returns {JSX.Element} Elemento JSX representando o widget do carrinho com o ícone e o contador de itens.
 */
export function CartWidget() {
  const { items } = useCart();

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="w-4 h-4" />
      <span className="text-sm">Cart ({items.length})</span>
    </div>
  );
}
