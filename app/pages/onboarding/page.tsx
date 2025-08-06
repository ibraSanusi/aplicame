"use client";

import { SmartButton } from "@/components/onboarding/smart-button";
import { Tag } from "@/components/onboarding/tags";
import { TextArea } from "@/components/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useMultiStepForm } from "@/hooks/onboarding/useMultiStepForm";

// Color del tag de los skills
const badgesColors = [
  "bg-amber-400",
  "bg-blue-400",
  "bg-pink-400",
  "bg-red-400",
  "bg-purple-400",
  "bg-green-400",
  "bg-gray-400",
  "bg-cyan-400",
];

export default function Page() {
  const {
    canPrevious,
    canFoward,
    count,
    currentField,
    currentKey,
    progressValue,
    isInputTextEmpty,
    formRef,
    text,
    isSkillField,
    skills,
    minimusSkills,
    handleRemoveSkill,
    handleForwardBotton,
    handlePreviousBotton,
    handleSubmit,
    setText,
  } = useMultiStepForm();

  return (
    <main className="flex h-dvh w-screen items-center justify-center bg-blue-300 p-8">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex h-full max-h-[600px] w-full max-w-xl flex-col justify-between gap-4 rounded-lg bg-white p-8"
      >
        <div className="flex flex-col gap-16">
          <Progress value={progressValue} />

          <div className="flex flex-col gap-4">
            <span className="font-semibold text-zinc-400">
              Question {count + 1}
            </span>
            <label className="text-3xl" htmlFor={currentKey}>
              {currentField.title}
            </label>

            {isSkillField ? (
              <>
                <TextArea
                  name="skills"
                  placeholder="Escribe tus skills..."
                  onChange={(e) => setText(e.target.value)}
                  text={text}
                  formRef={formRef}
                />
                <div className="flex max-h-[220px] flex-wrap gap-4 overflow-scroll">
                  {skills.map((skill, index) => (
                    <Tag
                      tagColor={badgesColors[index % badgesColors.length]}
                      key={skill + index}
                      onRemove={handleRemoveSkill}
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </>
            ) : (
              <Input
                value={text}
                className="h-16"
                id={currentKey}
                name={currentKey}
                onChange={(e) => setText(e.target.value)}
                placeholder={currentField.placeholder}
              />
            )}
          </div>
        </div>

        <div className="flex w-full justify-end gap-4">
          <SmartButton isDisabled={canPrevious} onClick={handlePreviousBotton}>
            Back
          </SmartButton>
          <SmartButton
            isDisabled={
              canFoward ||
              (!isSkillField && !isInputTextEmpty) ||
              (isSkillField && skills.length < minimusSkills)
            }
            onClick={handleForwardBotton}
          >
            Next
          </SmartButton>
        </div>
      </form>
    </main>
  );
}
