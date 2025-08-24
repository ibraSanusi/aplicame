import { RefObject } from "react";

type TextAreaProps = {
  text: string;
  placeholder?: string;
  name: string;
  formRef?: RefObject<HTMLFormElement | null>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function TextArea({
  text,
  placeholder,
  name,
  onChange,
  onKeyDown,
}: TextAreaProps) {
  return (
    <textarea
      onKeyDown={onKeyDown}
      value={text}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className="border-border placeholder:text-placeholder z-20 flex field-sizing-content max-h-[175px] min-h-20 w-full flex-grow items-start rounded-md border bg-white p-3 backdrop-blur-lg outline-none placeholder:text-sm"
    />
  );
}
