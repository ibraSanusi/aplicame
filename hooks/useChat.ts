"use client";

// hooks/useChat.ts
import { toast } from "sonner";
import { ApplicationState, MessageType, Role } from "@/lib";
import { type Application } from "@prisma/client";
import { addMessages, queryBot } from "@/lib/bot";
import { useState } from "react";
import { showSuccessToast } from "@/lib/toast";
import { useApplicationStore } from "@/store/store";
import { useSession } from "next-auth/react";

export function useChat(initialMessages: MessageType[] = []) {
  const session = useSession();

  const [messages, setMessages] = useState<MessageType[]>(initialMessages);

  const handleSend = async (text: string) => {
    const newMessage = [...messages, { role: Role.User, text }];
    const queryResponse = await queryBot(newMessage);

    if (!queryResponse) return;

    const { response, state } = queryResponse;

    if (state === ApplicationState.ENVIADO) {
      const objToSave: Application = JSON.parse(response);

      console.log("objToSave: ", objToSave);
      try {
        const res = await fetch("/api/application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objToSave),
        });
        if (!res.ok) throw new Error("Error al guardar");

        // ✅ GUARDAR EN ZUSTAND
        useApplicationStore.getState().addApplication(objToSave);

        // ✅ GUARDAR EN LOCALSTORAGE
        const applications = useApplicationStore.getState().applications;
        localStorage.setItem("applications", JSON.stringify(applications));

        // TODO: Refactorizar esta parte para que no se repita
        // Almacenar la fechar en la base de datos con formato ISO

        // Convierte "21/6/2025" a "2025-06-21"
        const [day, month, year] = objToSave.date.split("/");
        const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

        // Fecha base
        const baseDate = new Date(isoDate);

        // Sumar 14 días (2 semanas)
        const startDate = new Date(
          baseDate.getTime() + 14 * 24 * 60 * 60 * 1000,
        );

        // Fin del evento (1 hora después)
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        // Generar evento en google calendar
        const calendarEvent = {
          summary: `Solicitud de ${objToSave.company}`,
          description: `Solicitud enviada por ${objToSave.platform} para la empresa ${objToSave.company}.`,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        };

        console.log("Access Token: ", session.data?.accessToken);
        console.log("session: ", session);

        const calendarRes = await fetch("/api/create-event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...calendarEvent,
            accessToken: session.data?.accessToken, // Asegúrate de que el token esté disponible
          }),
        });

        if (!calendarRes.ok) {
          throw new Error("Error al crear el evento en el calendario");
        }

        const calendarData = await calendarRes.json();
        console.log("Evento creado en el calendario:", calendarData);

        showSuccessToast(objToSave.company);
      } catch (err) {
        toast("Error al guardar la solicitud", {
          description: "Revisa la consola",
        });
        console.error(err);
      }
    }

    const newMessages = addMessages(
      messages,
      text,
      state === ApplicationState.ENVIADO ? "Se guardó..." : response,
    );
    setMessages(newMessages);
  };

  return { messages, handleSend };
}
