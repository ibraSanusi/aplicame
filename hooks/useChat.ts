// hooks/useChat.ts
import { toast } from "sonner";
import { ApplicationData, MessageType, Role } from "@/lib";
import { addMessages, queryBot } from "@/lib/bot";
import { useState } from "react";
import { showSuccessToast } from "@/lib/toast";
import { useApplicationStore } from "@/store/store";

export function useChat(initialMessages: MessageType[] = []) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);

  const handleSend = async (text: string) => {
    const newMessage = [...messages, { role: Role.User, text }];
    const queryResponse = await queryBot(newMessage);

    if (!queryResponse) return;

    const { response, saved } = queryResponse;

    if (saved) {
      const objToSave: ApplicationData = JSON.parse(response);
      try {
        const res = await fetch("/api/application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objToSave),
        });
        if (!res.ok) throw new Error("Error al guardar");

        // ✅ GUARDAR EN ZUSTAND
        useApplicationStore.getState().addApplication(objToSave);
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
      saved ? "Se guardó..." : response,
    );
    setMessages(newMessages);
  };

  return { messages, handleSend };
}
