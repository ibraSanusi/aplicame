import { toast } from "sonner";

// lib/toast.ts
export function showSuccessToast(company: string) {
  toast(company, {
    description: new Date().toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    action: {
      label: "Deshacer",
      onClick: () => console.log("Deshacer"),
    },
  });
}
