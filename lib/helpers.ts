import { type Application } from "@prisma/client";

export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD") // Descompone letras y acentos
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
}

export function tryParseResponse(response: string | null) {
  try {
    const json: Application = JSON.parse(response ?? "");
    return json;
  } catch {
    return null;
  }
}
