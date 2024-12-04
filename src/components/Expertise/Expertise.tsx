import React from "react";

type Props = {
  setExpertise: (value: string, type: "add" | "remove") => void;
  data: string[];
  small?: boolean
};

const expertise = [
  "Producer",
  "Director",
  "Composer",
  "Cinematographer",
  "Editor",
  "Writer",
];
const Expertise = ({ data, setExpertise, small }: Props) => {
  return (
    <div className="flex flex-wrap gap-y-6 gap-x-3">
      {expertise.map((el) => (
        <div
          onClick={() => {
            if (data.includes(el)) {
              return setExpertise(el, "remove");
            }
            if (data.length >= 3) {
              return;
            }
            setExpertise(el, "add");
          }}
          className={`hover:border-black-2 hover:border-2 ${
            data.includes(el) ? "border-black-2 border-2" : "border border-stroke-2"
          } ${small ? "text-sm px-[2rem] h-[3rem]" : "text-[0.9rem] sm:text-[1.13rem] px-[2.5rem] sm:px-[3rem] h-[3rem] sm:h-[3.62rem]"}  transition-all cursor-pointer  font-medium  flex items-center justify-center rounded-md  text-black-2 `}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default Expertise;
