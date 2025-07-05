// components/Message.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clipboard, Check } from "lucide-react"; // Iconos
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MessageProps {
  role: "user" | "bot";
  text: string;
  loadingMessage: boolean;
}

export default function Message({ role, text, loadingMessage }: MessageProps) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extraer solo el contenido entre los delimitadores ---
    const match = text.match(/---\s*([\s\S]*?)\s*---/);

    const textToCopy = match ? match[1].trim() : text.trim(); // Fallback al texto completo si no hay coincidencia

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      className={`mb-3 flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={cn(
          "group relative max-w-[80%] rounded-xl px-4 py-3 break-words whitespace-pre-wrap",
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-black",
          loadingMessage ? "animate-pulse" : "animate-none",
        )}
      >
        <ReactMarkdown
          className="prose prose-sm max-w-none"
          remarkPlugins={[remarkGfm]}
        >
          {text}
        </ReactMarkdown>

        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
            title="Copiar"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Clipboard size={16} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
