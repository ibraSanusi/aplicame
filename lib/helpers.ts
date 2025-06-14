export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD") // Descompone letras y acentos
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
}
