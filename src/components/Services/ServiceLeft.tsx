import { RootState } from "@/lib/store";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import RenderTextAreaInput from "../RenderTextAreaInput/RenderTextAreaInput";

type Props = {
  body: {
    title: string;
    content: string;
  }[];

  title: string;
  image: ReactNode;
  cost?: string;
};

const ServiceLeft = ({ body, title, image, cost }: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );
  return (
    <section className="bg-gray-bg-3 w-full lg:w-[45%] py-[5rem] lg:min-h-screen relative">
      {userData?.fname && userData.lname && (
        <div className="bg-black-3 h-[3.8rem] flex justify-center items-center mx-auto w-[3.8rem] rounded-full">
          <p className="text-[1.5rem] font-bold text-white">
            {userData.fname[0]}
            {userData.lname[0]}
          </p>
        </div>
      )}
      <div className="text-center text-black-3 mt-2">
        <h1 className="text-[1.13rem] font-bold">{userData?.fname} {userData?.lname}</h1>
        <h2 className="text-[0.88rem]">{userData?.email}</h2>
      </div>
      <div className="bg-white w-[90%] xl:w-[70%] mt-7 rounded-md px-3 sm:px-7 py-6 mx-auto">
        <div className="bg-black-3 mb-3 py-3 px-4 rounded-md flex items-center justify-between">
          <p className="text-white font-bold">{title}</p>
          <div className="">{image}</div>
        </div>
        <div className="w-full break-words">
          {body.map((el) => (
            <div
              className="text-[0.88rem] border-t border-t-stroke-4 py-4"
              key={el.title}
            >
              <h1 className="text-black-2 font-bold">{el.title}</h1>
              <RenderTextAreaInput text={el.content || "..."} />
            </div>
          ))}
        </div>
      </div>
      {cost && (
        <div className="w-[90%] mt-10 xl:w-[70%] mx-auto text-black-3">
          <div className="flex items-center">
            <p className="mr-auto">Cost</p>
            <p className="font-bold text-[1.25rem]">₦ {cost}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceLeft;
