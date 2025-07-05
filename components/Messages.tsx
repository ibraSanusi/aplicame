"use client";

import { type MessageType } from "@/lib";
import Message from "./Message";

interface MessagesProps {
  messages: MessageType[];
  loadingMessage: boolean;
}

export const Messages = ({ messages, loadingMessage }: MessagesProps) => {
  return (
    <div className="flex-1 space-y-2 py-4">
      {messages.map((msg, idx) => (
        <Message
          loadingMessage={loadingMessage}
          key={idx}
          role={msg.role}
          text={msg.text}
        />
      ))}
    </div>
  );
};
