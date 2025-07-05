"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { type Application } from "@prisma/client";
import { useApplicationStore } from "@/store/store";
import { showSuccessToast } from "@/lib/toast";
import { ApplicationState, MessageType, Role } from "@/lib";
import { addMessages, queryBot } from "@/lib/bot";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  saveApplication,
} from "@/lib/chat/services";

export function useChat(initialMessages: MessageType[] = []) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const session = useSession();

  const store = useApplicationStore.getState();

  const persistApplication = async (app: Application) => {
    const response = await saveApplication(app);
    if (!response.ok) throw new Error("Error al guardar aplicación");
    store.addApplication(app);
    localStorage.setItem("applications", JSON.stringify(store.applications));
  };

  const processBotResponse = async (state: string, response: string) => {
    if (state !== ApplicationState.ENVIADO) return response;

    const application = JSON.parse(response) as Application;
    const accessToken = session.data?.accessToken;

    const calendar = await createCalendarEvent(application, accessToken);
    if (!calendar.ok)
      throw new Error("Error al crear el evento en el calendario");

    try {
      await persistApplication(application);
      showSuccessToast(application.company);
    } catch (err) {
      await deleteCalendarEvent(calendar.data.id, accessToken);
      throw err;
    }

    return "Se guardó la solicitud correctamente.";
  };

  const handleSend = async (text: string) => {
    const userMessage = { role: Role.User, text };
    const updatedMessages = [...messages, userMessage];

    setLoadingMessage(true);
    setMessages(updatedMessages);

    try {
      const botResponse = await queryBot(updatedMessages);
      if (!botResponse) return;

      const { response, state } = botResponse;
      const finalText = await processBotResponse(state, response);
      setMessages(addMessages(messages, text, finalText));
    } catch (err) {
      console.error(err);
      toast("Error al guardar la solicitud", {
        description: "Revisa la consola",
      });
    } finally {
      setLoadingMessage(false);
    }
  };

  const resetMessages = () => {
    console.log("initialMessages: ", initialMessages);
    setMessages(initialMessages);
  };

  useEffect(() => {
    console.log("messages cleared: ", messages);
  }, [messages]);

  return { messages, loadingMessage, handleSend, resetMessages };
}
