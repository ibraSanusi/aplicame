import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => (
  <button
    type={type}
    onClick={onClick}
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
      className,
    )}
  >
    {children}
  </button>
);
