// app/page.tsx
import Chat from "@/components/Chat";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Aplicame</h1>
      <p className="text-center mb-8 text-gray-600">
        Tu asistente para gestionar tus solicitudes de trabajo
      </p>
      <Chat />
    </main>
  );
}
