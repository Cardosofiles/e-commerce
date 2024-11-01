import { LoaderCircle } from "lucide-react";

/**
 * Componente de carregamento (`SearchLoading`).
 * - Exibe um ícone de carregamento com animação de rotação enquanto uma busca está em andamento.
 *
 * @returns {JSX.Element} Elemento de carregamento animado.
 */
export default function SearchLoading() {
  return (
    <div>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
