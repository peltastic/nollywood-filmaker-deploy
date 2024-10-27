import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import TestImage from "/public/assets/dashboard/issues-img-1.png";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";

type Props = {
  placeholder?: string;
  data: {
    label: string;
    value: string;
    caption?: string;
    info?: string;
  }[];
};

const CustomSelect = (props: Props) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<{
    label: string;
    caption?: string;
    value: string;
  }>({
    label: "",
    caption: "",
    value: "",
  });

  return (
    <div>
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="cursor-pointer relative border border-stroke-2 rounded-md py-3 px-4 text-black-2 text-[0.88rem]"
      >
        {selected.value ? (
          <div className="flex items-center">
            <Image src={TestImage} alt="test-image" className="w-[2.3rem]" />
            <div className="mr-auto">
              <div className="flex flex-wrap items-center text-[0.88rem] px-3 cursor-pointer">
                <p className="text-[0.88rem] mr-2 font-medium w-full sm:w-auto">
                  {selected.label}
                </p>
                <p className="text-[0.6rem] py-1 text-black-2 rounded-md px-2 bg-yellow-1">
                  {selected.caption}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>{props.placeholder || "Select"}</p>
        )}
        <div className="absolute right-3 -translate-y-1/2 top-1/2">
          <IoIosArrowDown />
        </div>
      </div>
      {showDropdown && (
        <div className="relative mt-2">
          <div className="absolute rounded-md cursor-pointer bg-white left-0 top-0 border border-stroke-2 w-full">
            {props.data.map((el) => (
              <div
                onClick={() =>
                  setSelected({
                    label: el.label,
                    caption: el.caption,
                    value: el.value,
                  })
                }
                className="flex items-center my-6 px-3"
                key={el.value}
              >
                <Image
                  src={TestImage}
                  alt="test-image"
                  className="w-[2.3rem]"
                />
                <div className="mr-auto">
                  <div className="flex flex-wrap items-center text-[0.88rem] px-3 cursor-pointer">
                    <p className="text-[0.88rem] mr-2 font-medium w-full sm:w-auto">
                      {el.label}
                    </p>
                    <p className="text-[0.6rem] py-1 text-black-2 rounded-md px-2 bg-yellow-1">
                      {el.caption}
                    </p>
                  </div>
                  <p className="text-gray-8 px-3 mt-1 text-[0.75rem]">
                    {el.info}
                  </p>
                </div>
                {selected.value === el.value ? (
                  <div className="">
                    <IoCheckmarkOutline className="text-black-2 font-thin" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CustomSelect;
