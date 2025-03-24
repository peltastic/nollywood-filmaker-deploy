import React from "react";

type Props = {
  setExpertise: (value: string, type: "add" | "remove") => void;
  data: string[];
  small?: boolean;
  maximum?: boolean;
};

const expertise = [
  "Producer",
  "Director",
  "Cinematographer",
  "Editor",
  "Writer",
  "VFX/Animator",
  "Marketing/Distribution",
  "Music / Sound Designer",
  "Lawyer",
  "Studio Executive",
];
const Expertise = ({ data, setExpertise, small, maximum }: Props) => {
  const selectedSet = new Set(data);
  return (
    <div className="flex flex-wrap gap-y-6 gap-x-3">
      {expertise.map((el) => (
        <div
          onClick={() => {
            if (selectedSet.has(el)) {
              return setExpertise(el, "remove");
            }
            if (data.length >= 3 && !maximum) {
              return;
            }
            setExpertise(el, "add");
          }}
          className={`xl:hover:border-black-2 xl:hover:border-2 ${
            selectedSet.has(el)
              ? "border-black-2 border-2"
              : "border border-stroke-2"
          } ${
            small
              ? "text-sm px-[2rem] h-[3rem]"
              : "text-[0.9rem] sm:text-[1.13rem] px-[2.5rem] sm:px-[3rem] h-[3rem] sm:h-[3.62rem]"
          }  transition-all cursor-pointer  font-medium  flex items-center justify-center rounded-md  text-black-2 `}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default Expertise;
