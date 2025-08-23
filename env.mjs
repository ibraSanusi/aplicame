// env.mjs
import "dotenv/config";
import { z } from "zod";

// Define el esquema
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  TURSO_DATABASE_URL: z.string().optional(),
  TURSO_AUTH_TOKEN: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

// Parseamos las variables del entorno
const parsedEnv = envSchema.safeParse(process.env);

// Si no pasa la validación, muestra errores y detiene la ejecución
if (!parsedEnv.success) {
  console.error("❌ Variables de entorno inválidas:", parsedEnv.error.format());
  process.exit(1);
}

// Exportamos las variables ya validadas y tipadas
export const env = parsedEnv.data;
