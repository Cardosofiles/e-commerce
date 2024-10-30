// Importa os dados do arquivo JSON que contém informações dos produtos.
import data from "./data.json";

/**
 * Função assíncrona que trata a requisição GET para obter todos os produtos.
 * - Retorna uma resposta JSON contendo a lista de produtos disponíveis no arquivo `data.json`.
 *
 * @returns {Promise<Response>} Retorna uma resposta JSON com a lista de produtos.
 */
export async function GET() {
  return Response.json(data.products); // Retorna os dados dos produtos em formato JSON.
}
