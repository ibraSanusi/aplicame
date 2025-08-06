"use client";

// components/MessageInput.tsx
import { FormEvent } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { TextArea } from "./textarea";
import { useTextarea } from "@/hooks/useTextarea";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const { formRef, setText, text } = useTextarea();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="sticky right-5 bottom-5 left-5 z-50 mt-4 flex max-w-[425px] gap-2">
      <form ref={formRef} onSubmit={handleSubmit} className="relative w-full">
        <TextArea
          name="message"
          placeholder="Escribe tu mensaje..."
          onChange={(e) => setText(e.target.value)}
          text={text}
          formRef={formRef}
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
