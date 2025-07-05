"use client";

import MessageInput from "./MessageInput";

import { ChatHeader } from "./ChatHeader";
import { Messages } from "./Messages";
import { useChat } from "@/hooks/useChat";
import { Role } from "@/lib";

export default function Chat() {
  const { messages, handleSend, loadingMessage } = useChat([
    {
      role: Role.Bot,
      text: "¡Hola! ¿A qué empresa quieres postularte y por qué canal?",
    },
  ]);

  return (
    <aside className="chat-scrollbar relative col-span-1 mx-auto flex h-dvh w-full max-w-xl flex-col overflow-y-scroll border-r border-gray-200 bg-[#E8F1F2] px-6">
      <ChatHeader />
      <Messages loadingMessage={loadingMessage} messages={messages} />
      <MessageInput onSend={handleSend} />
    </aside>
  );
}
