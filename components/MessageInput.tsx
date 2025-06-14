// components/MessageInput.tsx
import { useState } from "react";

export default function MessageInput({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="flex-1 p-2 rounded-lg border border-gray-300"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Enviar
      </button>
    </form>
  );
}
