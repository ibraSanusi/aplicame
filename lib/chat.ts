// 🔁 Utilidad para convertir "21/6/2025" a objeto Date
export function parseDateToReminder(createdAt: string | Date): {
  start: string;
  end: string;
} {
  const baseDate =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const startDate = new Date(baseDate.getTime() + 14 * 24 * 60 * 60 * 1000); // +14 días
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hora
  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}
