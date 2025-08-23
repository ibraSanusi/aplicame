import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createDB() {
  if (env.NODE_ENV === "development") {
    // DB local de desarrollo
    return new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
      log: ["query", "error", "warn"],
    });
  } else {
    const libsql = createClient({
      url: env.TURSO_DATABASE_URL ?? "",
      authToken: env.TURSO_AUTH_TOKEN ?? "",
    });

    const adapter = new PrismaLibSQL(libsql);
    // DB remota de producción
    return new PrismaClient({
      adapter,
      log: ["error"],
    });
  }
}

// Exportar instancia global para evitar múltiples conexiones
export const db = globalForPrisma.prisma ?? createDB();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
