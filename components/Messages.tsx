import { type MessageType } from "@/lib";
import Message from "./Message";

export const Messages = ({ messages }: { messages: MessageType[] }) => {
  return (
    <div className="flex-1 space-y-2 py-4">
      {messages.map((msg, idx) => (
        <Message key={idx} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
};
