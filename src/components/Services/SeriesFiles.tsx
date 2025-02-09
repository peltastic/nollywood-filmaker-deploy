import Image from "next/image";
import React, { useEffect, useRef } from "react";

import CancelImg from "/public/assets/cancel.svg";

import FileImg from "/public/assets/dashboard/file.svg";

type Props = {
  name: string;
  size: number;
  pageCount: number[];
  removeFileData: (index: number) => void;
  index: number;
  id: string
};

const SeriesFiles = ({
  index,
  name,
  pageCount,
  removeFileData,
  size,
  id
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return () => {};
    if (id === `${name}${size}${index}`) {
        
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  }, [name]);
  return (
    <div
    ref={ref}
      className={`${
        pageCount[index] < 20
          ? "border border-red-300 bg-gray-bg-1 pb-4 mb-4 rounded-md"
          : ""
      }`}
    >
      <div
        className={`flex items-center mb-4 bg-gray-bg-1 py-4 px-6 rounded-md`}
        key={name}
      >
        <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
          <Image src={FileImg} alt="file-img" />
        </div>
        <div className="text-sm mr-auto max-w-[17rem]">
          <p className="font-medium">{name}</p>
          <p>{(size / 1000000).toFixed(3)}MB</p>
        </div>
        <div className="text-sm">
          <p>{pageCount[index] ? pageCount[index] + " " + "page(s)" : null}</p>
        </div>
        <div
          onClick={() => {
            console.log(index);
            removeFileData(index);
          }}
          className="cursor-pointer ml-6 bg-gray-bg-3 h-[1.88rem] w-[1.88rem] rounded-full flex items-center justify-center "
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      {pageCount && pageCount[index] < 20 ? (
        <p className="text-red-400 text-sm font-semibold -mt-6 px-6">
          Document page count must be at least 20
        </p>
      ) : null}
    </div>
  );
};

export default SeriesFiles;
