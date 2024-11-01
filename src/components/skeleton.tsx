import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Componente `Skeleton` para criar um espaço reservado animado com efeito de carregamento.
 * - Utiliza uma classe `animate-pulse` para criar uma animação de pulsação, simulando o carregamento de conteúdo.
 * - Permite a personalização de estilos adicionais através da propriedade `className`.
 *
 * @param {ComponentProps<"div">} props - Propriedades do componente `div`, incluindo `className` para estilos adicionais.
 * @returns {JSX.Element} Elemento `div` animado como um esqueleto de conteúdo carregando.
 */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("bg-zinc-50/10 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
