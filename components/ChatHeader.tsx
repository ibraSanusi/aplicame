import OpenAI from "@/components/icons/open-ai";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { GoSidebarCollapse } from "react-icons/go";
import { Button } from "./ui/my-button";

export const ChatHeader = () => (
  <header className="sticky top-5 right-5 left-5 z-50 mt-4 flex flex-row items-center justify-between rounded-md border bg-white/70 px-4 py-2 backdrop-blur-lg">
    <OpenAI className="size-6" />
    <div className="flex gap-4">
      <Button className="bg-[#1B98E0] text-white transition-colors hover:bg-[#157ab7]">
        <HiOutlineDocumentAdd />
        New Chat
      </Button>
      <button className="cursor-pointer bg-transparent text-black hover:text-blue-600">
        <GoSidebarCollapse className="size-5" />
      </button>
    </div>
  </header>
);
