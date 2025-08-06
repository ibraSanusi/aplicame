import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
