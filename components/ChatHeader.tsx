"use client";

import OpenAI from "@/components/icons/open-ai";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Button } from "./ui/my-button";

interface ChatHeaderProps {
  resetMessages: () => void;
}

export function ChatHeader({ resetMessages }: ChatHeaderProps) {
  return (
    <header className="sticky top-5 right-5 left-5 z-50 mt-4 flex flex-row items-center justify-between rounded-md border bg-white/70 px-4 py-2 backdrop-blur-lg">
      <OpenAI className="size-6" />
      <div className="flex gap-4">
        <Button
          onClick={resetMessages}
          className="bg-[#1B98E0] text-white transition-colors hover:bg-[#157ab7]"
        >
          <HiOutlineDocumentAdd />
          New Chat
        </Button>
      </div>
    </header>
  );
}
