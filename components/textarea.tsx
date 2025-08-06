import { RefObject } from "react";

type TextAreaProps = {
  text: string;
  placeholder?: string;
  name: string;
  formRef: RefObject<HTMLFormElement | null>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextArea({
  text,
  placeholder,
  formRef,
  name,
  onChange,
}: TextAreaProps) {
  return (
    <textarea
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          formRef.current?.requestSubmit();
        }
      }}
      value={text}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className="border-border placeholder:text-placeholder flex field-sizing-content max-h-[175px] min-h-20 w-full flex-grow items-start rounded-md border bg-white/70 p-3 backdrop-blur-lg outline-none placeholder:text-sm"
    />
  );
}
