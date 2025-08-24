"use client";

import { SkillType } from "@/lib";
import { getAllSkills } from "@/lib/user-information/services";
import { MouseEvent, useEffect, useState, useRef } from "react";

export const useSkillTextarea = () => {
  const [text, setText] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const [skills, setSkills] = useState<SkillType[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<SkillType[]>([]);
  const [allInputSkills, setAllInputSkills] = useState<SkillType[]>([]);

  const minimumSkills = 5; // Minimo de skills que tiene que rellenar el usuario
  const hasMinimumSkills = skills.length >= minimumSkills;

  const firstSuggestion = filteredSkills[0];

  const addNewSkill = () => {
    if (text.trim()) {
      setSkills((prev) => [...prev, firstSuggestion]);
      setText("");
    }
  };

  // Filtrado de skills
  useEffect(() => {
    if (!text) {
      setFilteredSkills([]);
      return;
    }

    const filtered = allInputSkills.filter(({ name }) =>
      name.toLowerCase().startsWith(text.toLowerCase()),
    );

    setFilteredSkills(filtered);
  }, [text, allInputSkills]);

  const handleRemoveSkill = (e: MouseEvent<HTMLButtonElement>) => {
    const skillToEliminate = e.currentTarget?.value;
    const remainingSkills = skills.filter(
      (skill) => skill.name !== skillToEliminate,
    );

    setSkills(remainingSkills);
  };

  // Carga todas las skills de la base de datos
  useEffect(() => {
    (async () => {
      const response = await getAllSkills();

      if (response.success && response.data) {
        setAllInputSkills(response.data);
      } else {
        console.error("Error cargando skills:", response.error);
        setAllInputSkills([]); // para evitar undefined
      }
    })();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (filteredSkills.length > 0) {
        setSkills((prev) => [...prev, firstSuggestion]);
        setText("");
        setFilteredSkills([]);
      }
    }
  };

  return {
    text,
    setText,
    skills,
    minimumSkills,
    addNewSkill,
    hasMinimumSkills,
    formRef,
    filteredSkills,
    setSkills,
    setAllInputSkills,
    handleRemoveSkill,
    handleKeyDown,
  };
};
