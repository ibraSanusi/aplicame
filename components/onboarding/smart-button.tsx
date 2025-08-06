"use client";

import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtomProps = {
  isDisabled: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SmartButton = ({
  isDisabled,
  children,
  ...props
}: ButtomProps) => {
  return (
    <button
      type="button"
      className={cn(
        "w-24 rounded-lg px-8 py-2 text-white outline-white",
        isDisabled
          ? "cursor-not-allowed bg-gray-400/50"
          : "cursor-pointer bg-blue-600",
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};
