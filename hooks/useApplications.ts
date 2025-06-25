import { useApplicationStore } from "@/store/store";
import { type Application } from "@prisma/client";
import { useEffect, useState } from "react";

export function useApplication() {
  const { applications, addApplication } = useApplicationStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/application");
        if (!res.ok) throw new Error("Error al cargar las solicitudes");
        const data: Application[] = await res.json();

        data.forEach(addApplication); // Guardamos todo en el store
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [addApplication]);

  return { applications, loading, error };
}
