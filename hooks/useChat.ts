"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ApplicationState, MessageType, Role } from "@/lib";
import { type Application } from "@prisma/client";
import { addMessages, queryBot } from "@/lib/bot";
import { showSuccessToast } from "@/lib/toast";
import { useApplicationStore } from "@/store/store";

// 🔁 Utilidad para convertir "21/6/2025" a objeto Date
function parseDateToReminder(createdAt: string | Date): {
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

// 🔁 Función para guardar aplicación y crear evento
async function handleApplicationSave(
  objToSave: Application,
  accessToken?: string,
) {
  // Guardar en la base de datos
  const res = await fetch("/api/application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objToSave),
  });
  if (!res.ok) throw new Error("Error al guardar aplicación");

  // Guardar en Zustand
  useApplicationStore.getState().addApplication(objToSave);

  // Guardar en localStorage
  const applications = useApplicationStore.getState().applications;
  localStorage.setItem("applications", JSON.stringify(applications));

  // Preparar y enviar evento a Google Calendar
  const { start, end } = parseDateToReminder(objToSave.createdAt);
  const calendarEvent = {
    summary: `Solicitud de ${objToSave.company}`,
    description: `Solicitud enviada por ${objToSave.platform} para la empresa ${objToSave.company}.`,
    start,
    end,
  };

  if (!accessToken) throw new Error("AccessToken no disponible en sesión");

  const calendarRes = await fetch("/api/create-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...calendarEvent, accessToken }),
  });

  if (!calendarRes.ok)
    throw new Error("Error al crear el evento en el calendario");

  const calendarData = await calendarRes.json();
  console.log("✅ Evento creado:", calendarData);

  showSuccessToast(objToSave.company);
}

export function useChat(initialMessages: MessageType[] = []) {
  const session = useSession();
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);

  const handleSend = async (text: string) => {
    const updatedMessages = [...messages, { role: Role.User, text }];
    const queryResponse = await queryBot(updatedMessages);

    if (!queryResponse) return;

    const { response, state } = queryResponse;

    if (state === ApplicationState.ENVIADO) {
      try {
        const objToSave: Application = JSON.parse(response);
        await handleApplicationSave(objToSave, session.data?.accessToken);
      } catch (err) {
        console.error(err);
        toast("Error al guardar la solicitud", {
          description: "Revisa la consola",
        });
      }
    }

    const finalMessages = addMessages(
      messages,
      text,
      state === ApplicationState.ENVIADO ? "Se guardó..." : response,
    );
    setMessages(finalMessages);
  };

  return { messages, handleSend };
}
