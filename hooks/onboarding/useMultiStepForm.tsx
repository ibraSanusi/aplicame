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

  const minimumSkills = 5; // Minimo de skills que tiene que rellenar el usuario
  const hasMinimumSkills = skills.length >= minimumSkills;

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

  // Si esta en el ultimo paso querré enviar el formalario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSkillField) return;

    if (isSkillField && hasMinimumSkills) {
      console.log("Hola mmg");
      return submitUserInformation(e);
    }
    return addNewSkill();
  };

  const submitUserInformation = (e: FormEvent) => {
    return e;
  };

  const addNewSkill = () => {
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

    if (!isSkillField) {
      increase(e);
      setText("");
    }
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

  const handleRemoveSkill = (e: MouseEvent<HTMLButtonElement>) => {
    const skillToEliminate = e.currentTarget?.value;
    const remainingSkills = skills.filter(
      (skill) => skill !== skillToEliminate,
    );

    setSkills(remainingSkills);

    setFormData((prev) => ({
      ...prev,
      [currentKey]: remainingSkills,
    }));
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
    minimumSkills,
    handleRemoveSkill,
    handleForwardBotton,
    handlePreviousBotton,
    handleSubmit,
    setText,
    decrease,
    increase,
  };
};
