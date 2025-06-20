"use client";

import React, { useEffect, useState } from "react";
import Chat from "@/components/Chat";
// import { ApplicationsTable } from "@/components/ApplicationsTable";
import { useApplicationStore } from "@/store/store";
import { type Application } from "@prisma/client";
import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/data-table";

// function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ];
// }

export default function HomePage() {
  const { applications, addApplication } = useApplicationStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const data = getData();

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

  return (
    <main className="grid min-h-dvh grid-cols-4 bg-gray-100">
      {/* Columna 1: Chat */}
      <Chat />

      {/* Columna 2-4: Dashboard */}
      <section className="col-span-3 p-6">
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>

        {loading && <p>Cargando solicitudes...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <DataTable columns={columns} data={applications} />
          // <ApplicationsTable applications={applications} />
        )}
      </section>
    </main>
  );
}
