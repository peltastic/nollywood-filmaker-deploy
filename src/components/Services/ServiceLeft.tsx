import { RootState } from "@/lib/store";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import RenderTextAreaInput from "../RenderTextAreaInput/RenderTextAreaInput";
import FileImg from "/public/assets/dashboard/file.svg";
import Image from "next/image";

type Props = {
  body: {
    title: string;
    content: string;
  }[];

  title: string;
  image: ReactNode;
  cost?: string;
  series?: boolean;
  episodes?: string;
  files?: File[];
  seriesPageCount?: number[];
};

const ServiceLeft = ({
  body,
  title,
  image,
  cost,
  series,
  episodes,
  files,
  seriesPageCount,
}: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );
  return (
    <section className="bg-gray-bg-3 w-full lg:w-[45%] py-[5rem] lg:min-h-screen relative ">
      {userData?.fname && userData.lname && (
        <div className="bg-black-3 h-[3.8rem] flex justify-center items-center mx-auto w-[3.8rem] rounded-full">
          <p className="text-[1.5rem] font-bold text-white">
            {userData.fname[0]}
            {userData.lname[0]}
          </p>
        </div>
      )}
      <div className="text-center text-black-3 mt-2">
        <h1 className="text-[1.13rem] font-bold">
          {userData?.fname} {userData?.lname}
        </h1>
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
          {series && (
            <div className="text-[0.88rem] border-t border-t-stroke-4 py-4">
              <h1 className="text-black-2 font-bold">Episodes</h1>
              <RenderTextAreaInput text={episodes || "..."} />
            </div>
          )}
        </div>
        {series ? (
          <div className="border-t mt-2">
            <p className="text-black-2 font-bold mb-2 mt-6">Series episodes' scripts</p>
            {files && files.length > 0 ? (
              <div className="max-h-[25rem] overflow-y-scroll mt-10 nolly-film-hide-scrollbar">
                {files.map((el, index) => (
                  <div className=" flex items-center mb-4  py-4 rounded-md" key={el.name}>
                    <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
                      <Image src={FileImg} alt="file-img" />
                    </div>
                    <div className="text-sm mr-auto max-w-[23rem]">
                      <p className="font-medium mb-2">{el.name}</p>
                      <p className="mb-2">{(el.size / 1000000).toFixed(3)}MB</p>
                      {seriesPageCount && (
                        <div className="text-sm font-medium">
                          <p>
                            {seriesPageCount[index]
                              ? seriesPageCount[index] + " " + "page(s)"
                              : null}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
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
