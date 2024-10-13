import React from "react";
import classes from "@/app/styles/Auth.module.css";
type Props = {};

const ConsultantLeftSide = (props: Props) => {
  return (
    <div className="hidden xl:block w-[50%] chatbp:w-[45%] xxl:w-[50%] px-[3rem] h-full text-white">
      <div className={`${classes.BgImage} w-full rounded-2xl h-full relative`}>
        <div className=" z-20 absolute bottom-10 px-[2rem]">
          <h1 className="font-bold text-[1.5rem]">Nollywood Filmaker</h1>
          <h2 className="text-[1.13rem]">
            The one-stop spot for all the film-making help you need
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ConsultantLeftSide;
