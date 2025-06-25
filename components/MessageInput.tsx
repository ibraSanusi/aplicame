"use client";

// components/MessageInput.tsx
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

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
    <div className="sticky right-5 bottom-5 left-5 z-50 mt-4 flex w-[425px] gap-2">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          name="message"
          // onKeyDown={(event) => {
          //   if (event.key === "Enter" && !event.shiftKey) {
          //     formRef.current?.requestSubmit();
          //   }
          // }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="border-border placeholder:text-placeholder flex field-sizing-content max-h-[175px] min-h-20 w-[425px] flex-grow items-start rounded-md border bg-white/70 p-3 backdrop-blur-lg outline-none placeholder:text-sm"
        />

        <button
          type="submit"
          className="bg-dark absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1B98E0] p-2 transition-colors hover:bg-[#157ab7]"
          // disabled={isLoading}
        >
          <AiOutlineSend color="#ffffff" width={12} height={14} />
        </button>
      </form>
    </div>
  );
}
