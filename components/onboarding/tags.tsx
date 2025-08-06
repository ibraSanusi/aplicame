import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Tag({
  children,
  tagColor,
  onRemove,
}: {
  children: ReactNode;
  tagColor: string;
  onRemove?: () => void;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-white",
        tagColor,
      )}
    >
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove}>
          ✕
        </button>
      )}
    </span>
  );
}
