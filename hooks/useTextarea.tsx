"use client";

import { useRef, useState } from "react";

export const useTextarea = () => {
  const [text, setText] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  return { text, setText, formRef };
};
