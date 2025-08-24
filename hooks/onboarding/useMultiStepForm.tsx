"use client";

import {
  fieldKeys,
  userInformationFields,
} from "@/lib/constants/userInformationFields";
import { UserInformationType } from "@/lib";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useSkillTextarea } from "@/hooks/onboarding/useSkillTextarea";
import { saveUserInformation } from "@/lib/user-information/services";

export const useMultiStepForm = () => {
  const {
    formRef,
    setText,
    hasMinimumSkills,
    minimumSkills,
    addNewSkill,
    text,
    filteredSkills,
    handleKeyDown,
    handleRemoveSkill,
    skills,
  } = useSkillTextarea();
  const [formData, setFormData] = useState<Partial<UserInformationType>>({});

  const [count, setCount] = useState<number>(0);

  const [inputText, setInputText] = useState<string>("");

  const currentKey = fieldKeys[count];
  const currentField = userInformationFields[currentKey];

  const canFoward = count >= fieldKeys.length;
  const canPrevious = count <= 0;

  const isSkillField = currentKey === "skills";
  const isInputTextEmpty = inputText !== "";

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
      saveUserInformation(formData);
      return;
    }
    return addNewSkill();
  };

  const handleForwardBotton = (e: MouseEvent) => {
    setFormData((prev) => ({
      ...prev,
      [currentKey]: isSkillField ? skills : inputText,
    }));

    if (!isSkillField) {
      increase(e);
      setInputText("");
    }
  };

  // Cuando se borre una skill por ejemplo o se añade una
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [currentKey]: skills,
    }));
  }, [skills]);

  // Se clickó el botón de back o next
  useEffect(() => {
    // Si ya se relleno ese campo se mantiene el valor, sino se escribe uno nuevo
    const previousInputText = isSkillField
      ? skills
      : text.trim() !== ""
        ? text
        : formData?.[currentKey];

    if (!isSkillField && previousInputText) {
      setInputText(previousInputText.toString());
    } else {
      setInputText("");
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
    minimumSkills,
    filteredSkills,
    inputText,
    handleKeyDown,
    handleRemoveSkill,
    handleForwardBotton,
    handlePreviousBotton,
    handleSubmit,
    setText,
    setInputText,
    decrease,
    increase,
  };
};
