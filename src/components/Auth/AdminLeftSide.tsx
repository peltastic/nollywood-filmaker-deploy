import React from "react";
import ServiceNavbar from "../Navbar/ServiceNavbar";
import classes from "@/app/styles/Auth.module.css";

type Props = {};

const AdminLeftSide = (props: Props) => {
  return (
    <div className="hidden xl:block w-[50%] chatbp:w-[45%] xxl:w-[55%] px-[3rem] h-full text-white">
      <div className={`${classes.AdminBgImage } w-full rounded-2xl h-full relative`}>
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

export default AdminLeftSide;
