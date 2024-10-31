import { z } from "zod";

// Define um esquema de validação para as variáveis de ambiente utilizando Zod.
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  APP_URL: z.string().url(),
});

// Tenta analisar as variáveis de ambiente de acordo com o esquema definido.
const parsedEnv = envSchema.safeParse(process.env);

// Se a validação falhar, imprime os erros no console e lança uma exceção.
if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables", // Mensagem de erro
    parsedEnv.error.flatten().fieldErrors // Exibe os erros de validação
  );

  throw new Error("Invalid environment variables"); // Lança uma exceção com mensagem de erro.
}

// Exporta as variáveis de ambiente validadas.
export const env = parsedEnv.data;
