"use client";

import { ReactNode, createContext, useContext, useState } from "react";

/**
 * Interface que representa um item no carrinho de compras.
 * - Contém o ID do produto e a quantidade selecionada.
 */
interface CartItem {
  productId: number; // ID único do produto
  quantity: number; // Quantidade do produto no carrinho
}

/**
 * Interface para o contexto do carrinho, fornecendo a lista de itens e a função `addToCart`.
 * - `items`: Lista de itens no carrinho.
 * - `addToCart`: Função para adicionar um produto ao carrinho com base no `productId`.
 */
interface CartContextType {
  items: CartItem[]; // Lista dos itens no carrinho
  addToCart: (productId: number) => void; // Função para adicionar item ao carrinho
}

/**
 * Cria o contexto do carrinho com o valor inicial vazio.
 */
const CartContext = createContext({} as CartContextType);

/**
 * Provedor do Carrinho que engloba os componentes filhos e gerencia o estado do carrinho.
 * - `addToCart` permite adicionar produtos ao carrinho, incrementando a quantidade caso o item já exista.
 * - Caso o item não esteja presente no carrinho, ele será adicionado com quantidade inicial de 1.
 *
 * @param {ReactNode} children - Elementos filhos que terão acesso ao contexto do carrinho.
 * @returns {JSX.Element} Provedor de contexto do carrinho com os componentes filhos.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /**
   * Função para adicionar um produto ao carrinho com base no `productId`.
   * - Incrementa a quantidade caso o produto já exista.
   * - Caso contrário, adiciona o produto ao carrinho com quantidade inicial de 1.
   *
   * @param {string} productId - ID do produto a ser adicionado ao carrinho.
   */
  function addToCart(productId: number) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.productId === productId);
      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...state, { productId, quantity: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook customizado `useCart` para acessar o contexto do carrinho de forma fácil.
 * - Retorna o valor do contexto, incluindo os itens no carrinho e a função `addToCart`.
 *
 * @returns {CartContextType} O contexto do carrinho contendo `items` e `addToCart`.
 */
export const useCart = () => useContext(CartContext);
