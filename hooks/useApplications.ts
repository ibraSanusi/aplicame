import { useApplicationStore } from "@/store/store";
import { type Application } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useApplication() {
  const { applications, addApplication, clearApplications } =
    useApplicationStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const session = useSession();

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError(null);
      try {
        const applicationResponse = await fetch("/api/application");
        if (!applicationResponse.ok)
          throw new Error("Error al cargar las solicitudes");
        const data: Application[] = await applicationResponse.json();

        clearApplications();
        data.forEach(addApplication);
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
  }, [session.status, addApplication, clearApplications]);

  return { applications, loading, error };
}
