// Importa a biblioteca Zod para validação de dados.
import { z } from "zod";

// Importa os dados do arquivo JSON que contém informações dos produtos.
import data from "../data.json";

/**
 * Função assíncrona que trata a requisição GET para obter um produto específico.
 * - Simula um atraso de 1 segundo antes de processar a requisição.
 * - Valida o parâmetro `slug` utilizando Zod, garantindo que seja uma string.
 * - Procura o produto correspondente ao `slug` fornecido no arquivo `data.json`.
 *
 * @param {Request} _ - O objeto de requisição.
 * @param {Object} params - Objeto contendo os parâmetros da requisição.
 * @param {string} params.slug - O identificador do produto a ser buscado.
 * @returns {Promise<Response>} Retorna uma resposta JSON contendo os dados do produto ou uma mensagem de erro.
 */
export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo.

  // Aguarda a resolução de params antes de usá-los
  const { slug } = await params; // Aguarda a resolução de params.

  // Valida o slug utilizando Zod, garantindo que seja uma string.
  const validatedSlug = z.string().parse(slug);
  // Procura o produto correspondente ao slug fornecido no arquivo `data.json`.
  const product = data.products.find(
    (product) => product.slug === validatedSlug
  );

  // Se o produto não for encontrado, retorna um erro 400 com mensagem apropriada.
  if (!product) {
    return Response.json({ message: "Product not found." }, { status: 400 });
  }

  // Retorna os dados do produto encontrado em formato JSON.
  return Response.json(product);
}
