import React from "react";

type Props = {
  title: string;
  subTitle: string;
};

const HomeTitleHeader = (props: Props) => {
  return (
    <div className="text-center mt-[6rem]">
      <h1 className="text-[2.3rem] font-medium text-black-4">{props.title}</h1>
      <h2 className="text-[1.2rem] tracking-wider mt-4 text-gray-1">
        {props.subTitle}
      </h2>
    </div>
  );
};

export default HomeTitleHeader;
