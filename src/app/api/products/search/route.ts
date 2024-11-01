import { NextRequest } from "next/server";
import { z } from "zod";

import data from "../data.json";

/**
 * Função de requisição `GET` para buscar produtos com base em uma query de pesquisa.
 * - Aguarda um atraso de 1 segundo para simular tempo de resposta da API.
 * - Extrai o parâmetro de busca (`q`) dos parâmetros de URL e o valida como string.
 * - Filtra a lista de produtos do `data.json` com base no título do produto,
 *   realizando uma comparação que não diferencia maiúsculas de minúsculas.
 *
 * @param {NextRequest} request - Objeto de requisição contendo a URL com o parâmetro de busca.
 * @returns {Promise<Response>} Retorna uma resposta JSON contendo os produtos filtrados.
 */
export async function GET(request: NextRequest) {
  // Introduz um atraso de 1 segundo na resposta da requisição para simular tempo de processamento ou latência.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Extrai os parâmetros de busca da URL da requisição.
  const { searchParams } = request.nextUrl;
  // Extrai e valida o parâmetro de busca (`q`) como uma string.
  const query = z.string().parse(searchParams.get("q"));

  // Filtra a lista de produtos, retornando apenas os produtos cujo título contém a string de busca,
  // ignorando diferenças entre maiúsculas e minúsculas.
  const products = data.products.filter((product) => {
    /*
    O método toLocaleLowerCase() em JavaScript é usado para converter uma string 
    para letras minúsculas, levando em conta as regras de localização (locale) para
    idiomas específicos. Ele é semelhante ao método toLowerCase(), mas adapta a 
    conversão para casos onde certos caracteres precisam de tratamento especial 
    em alguns idiomas.

    Por exemplo, em turco, o caractere "I" maiúsculo é convertido para "ı" minúsculo
    (um "i" sem ponto) ao usar toLocaleLowerCase("tr"). Essa conversão específica
    não ocorre com toLowerCase().
    */

    return product.title
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());
  });

  // Retorna a lista de produtos filtrados como uma resposta JSON.
  return Response.json(products);
}
