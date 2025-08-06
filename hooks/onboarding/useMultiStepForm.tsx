"use client";

import {
  fieldKeys,
  userInformationFields,
} from "@/lib/constants/userInformationFields";
import { UserInformationType } from "@/lib";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useTextarea } from "@/hooks/useTextarea";

export const useMultiStepForm = () => {
  const { formRef, setText, text } = useTextarea();
  const [formData, setFormData] = useState<Partial<UserInformationType>>({});

  const [count, setCount] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>([]);

  const currentKey = fieldKeys[count];
  const currentField = userInformationFields[currentKey];

  const minimusSkills = 5; // Minimo de skills que tiene que rellenar el usuario

  const canFoward = count >= fieldKeys.length;
  const canPrevious = count <= 0;

  const isSkillField = currentKey === "skills";
  const isInputTextEmpty = text !== "";

  const progressValue = (100 / fieldKeys.length) * (count + 1);

  const increase = (e: MouseEvent) => {
    e.preventDefault();
    if (!canFoward) setCount((prev) => prev + 1);
  };

  const decrease = (e: MouseEvent) => {
    e.preventDefault();
    if (!canPrevious) setCount((prev) => prev - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSkillField) return;

    if (text.trim()) {
      setSkills((prev) => [...prev, text]);
      setText("");
    }
  };

  const handleForwardBotton = (e: MouseEvent) => {
    setFormData((prev) => ({
      ...prev,
      [currentKey]: isSkillField ? skills : text,
    }));

    increase(e);
    setText("");
  };

  // Se clickó el botón de back o next
  useEffect(() => {
    // Si ya se relleno ese campo se mantiene el valor, sino se escribe uno nuevo
    const inputText = isSkillField
      ? skills
      : text.trim() !== ""
        ? text
        : formData?.[currentKey];

    if (!isSkillField && inputText) {
      setText(inputText.toString());
    } else {
      setText("");
    }
  }, [currentKey, count]);

  const handlePreviousBotton = (e: MouseEvent) => {
    decrease(e);

    if (!isSkillField) {
      setText("");
    }
  };

  return {
    progressValue,
    count,
    currentKey,
    currentField,
    canPrevious,
    canFoward,
    isSkillField,
    skills,
    text,
    isInputTextEmpty,
    formRef,
    formData,
    minimusSkills,
    handleForwardBotton,
    handlePreviousBotton,
    handleSubmit,
    setText,
    decrease,
    increase,
  };
};
