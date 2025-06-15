"use client";

import { useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { toast } from "sonner";
import { ApplicationData, MessageType, Role } from "@/lib";
import { addMessages, queryBot } from "@/lib/bot";

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: Role.Bot,
      text: "¡Hola! ¿A qué empresa quieres postularte y por qué canal?",
    },
  ]);

  const handleSend = async (text: string) => {
    const newMessage = [...messages, { role: Role.User, text }];
    const queryResponse = await queryBot(newMessage);

    if (!queryResponse) return;

    const { response, saved } = queryResponse;

    // Destructurar el objeto a guardar si es posible
    if (saved) {
      const objToSave: ApplicationData = JSON.parse(response);
      console.log("Se guardara esta solicitud: ", objToSave);

      toast(objToSave.company, {
        description: new Date().toLocaleString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        action: {
          label: "Deshacer",
          onClick: () => console.log("Deshacer"),
        },
      });
    }

    const newMessages = addMessages(
      messages,
      text,
      saved ? "Se guardo..." : response
    );
    setMessages(newMessages);
  };

  return (
    <div className="flex flex-col h-full p-4 max-w-xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} text={msg.text} />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
