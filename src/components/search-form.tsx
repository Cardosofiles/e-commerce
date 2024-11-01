"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

/**
 * Componente `SearchForm` que exibe um formulário de busca.
 * - Inclui um campo de entrada de pesquisa e um ícone de busca.
 * - Redireciona para uma página de resultados com base na consulta inserida.
 *
 * @returns {JSX.Element} Um formulário de busca estilizado com input e ícone.
 */
export function SearchForm() {
  const router = useRouter();
  const searchParms = useSearchParams();

  const query = searchParms.get("q");

  /**
   * Função de controle para o evento de submissão do formulário.
   * - Extrai os dados do formulário e redireciona para a página de resultados.
   *
   * @param {FormEvent<HTMLFormElement>} event - Evento de submissão do formulário.
   */
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const query = data.q;

    // Se não houver consulta, a função termina sem redirecionar.
    if (!query) {
      return null;
    }

    // Redireciona para a página de pesquisa com o parâmetro de consulta.
    router.push(`/search?q=${query}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 to-zinc-500" />

      <input
        name="q"
        defaultValue={query ?? ""}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        required
      />
    </form>
  );
}
