import { SkillType } from "@/lib";

interface Props {
  filteredSkills: SkillType[];
}

export default function SkillSuggestion({ filteredSkills }: Props) {
  return (
    <>
      {filteredSkills.length > 0 && (
        <ul className="chat-scrollbar absolute top-[100%] left-0 z-10 h-auto max-h-96 w-full overflow-auto rounded-b-md border-r-[1px] border-b-[1px] border-l-[1px] bg-blue-200">
          {filteredSkills.map(({ id, name }) => (
            <li className="p-2 hover:bg-blue-400" key={id}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
