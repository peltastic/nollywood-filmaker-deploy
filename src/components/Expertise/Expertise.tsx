import React from "react";

type Props = {
  setExpertise: (value: string, type: "add" | "remove") => void;
  data: string[];
};

const expertise = [
  "Producer",
  "Director",
  "Composer",
  "Cinematographer",
  "Editor",
  "Writer",
];
const Expertise = ({ data, setExpertise }: Props) => {
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
          className={`${
            data.includes(el) ? "border-black-2 border-2" : "border border-stroke-2"
          } transition-all cursor-pointer text-[1.13rem] font-medium  flex items-center justify-center rounded-md  text-black-2 px-[3rem] h-[3.62rem]`}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default Expertise;
