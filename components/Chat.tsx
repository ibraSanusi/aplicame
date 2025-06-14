"use client";

import { useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
// import { toast } from "sonner";
import { MessageType, Role } from "@/lib";
import { addMessages, queryBot } from "@/lib/bot";

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: Role.Bot,
      text: "¡Hola! ¿A qué empresa quieres postularte y por qué canal?",
    },
  ]);
  const [canSave, setCanSave] = useState<boolean>(false);

  console.log(canSave);

  const handleSend = async (text: string) => {
    // setMessages([...messages, { role: Role.User, text }]);

    const newMessage = [...messages, { role: Role.User, text }];
    const { response, shouldSave } = await queryBot(newMessage);
    setCanSave(shouldSave);

    const newMessages = addMessages(messages, text, response);
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
