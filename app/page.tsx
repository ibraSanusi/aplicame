"use client";

import Chat from "@/components/Chat";
// import { ApplicationsTable } from "@/components/ApplicationsTable";

import { columns } from "@/components/applications/columns";
import { DataTable } from "@/components/applications/data-table";
import LogoutButton from "@/components/LogoutButton";
import { useSession } from "next-auth/react";
import { useApplication } from "@/hooks/useApplications";

export default function HomePage() {
  const { data: session } = useSession();
  console.log("Session data: ", session);

  const { loading, error, applications } = useApplication();

  // useEffect(() => {}, [session]);
  // if (status === "loading") {
  //   return <p>Cargando sesión...</p>;
  // }
  // if (status === "unauthenticated") {
  //   return <p>Debes iniciar sesión para acceder a esta página.</p>;
  // }
  // if (status === "authenticated") {
  //   console.log("Usuario autenticado: ", session.user);
  // }
  // if (!session?.user) {
  //   return <p>No se encontró información del usuario.</p>;
  // }
  // console.log("Usuario autenticado: ", session.user);
  // console.log("Access Token: ", session.accessToken);
  // console.log("Session: ", session);
  // console.log("Session user: ", session.user);
  // console.log("Session user email: ", session.user.email);
  // console.log("Session user name: ", session.user.name);
  // console.log("Session user image: ", session.user.image);

  return (
    <main className="grid min-h-dvh grid-cols-4 bg-gray-100">
      {/* Columna 1: Chat */}
      <Chat />

      {/* Columna 2-4: Applications Table */}
      <section className="col-span-3 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold">Applications Table</h2>
          <LogoutButton />
        </header>

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
