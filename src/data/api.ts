import { env } from "@/env";

/**
 * Função utilitária para realizar chamadas à API com uma URL base configurada.
 * - Concatena o caminho fornecido com o prefixo da API (`/api`) e a URL base da API definida nas variáveis de ambiente.
 * - Utiliza o `fetch` para fazer a requisição e retorna a resposta.
 *
 * @param {string} path - Caminho da API a ser concatenado com o prefixo e a URL base.
 * @param {RequestInit} [init] - Objeto de configuração opcional para personalizar a requisição, como método, cabeçalhos e corpo.
 *
 * @returns {Promise<Response>} Resposta da requisição.
 */
export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL; // URL base da API, definida nas variáveis de ambiente
  const apiPrefix = "/api"; // Prefixo padrão para todas as rotas da API
  const url = new URL(apiPrefix.concat(path), baseUrl); // Concatena a URL final da API

  return fetch(url, init); // Realiza a requisição e retorna a resposta
}
