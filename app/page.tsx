import Chat from "@/components/Chat";

export default function HomePage() {
  return (
    <main className="grid min-h-dvh grid-cols-4 bg-gray-100">
      {/* Columna 1: Chat (1/4) */}
      <Chat />

      {/* Columnas 2-4: Dashboard (3/4) */}
      <section className="col-span-3 p-6">
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
        {/* Aquí puedes poner el contenido del dashboard */}
        <div className="rounded-md border border-dashed border-gray-400 p-8 text-center text-gray-500">
          Aquí irá tu panel de seguimiento de solicitudes 🚀
        </div>
      </section>
    </main>
  );
}
