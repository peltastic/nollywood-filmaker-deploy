import React, { useState } from "react";
import MenuComponent from "../Menu/MenuComponent";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { Menu } from "@mantine/core";

type Props = {
  data: {
    value: string ;
    label: string;
    caption: string;
  }[];
  changed: (value: string) => void;
};

const CaptionSelect = (props: Props) => {
  const [valueData, setValueData] = useState({
    value: "",
    label: "",
    caption: "",
  });
  const [opened, setOpened] = useState(false);
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      width={"43rem"}
    >
      <Menu.Target>
        <div className="border border-stroke-2 cursor-pointer  px-2 outline-none text-start  py-3 rounded-md w-full">
          <div className="flex items-center">
            <div className="">
              {valueData.value ? (
                <div className="outline-none cursor-pointer py-[0.2rem] px-1 flex items-center !z-[100] relative">
                  <div className=" ">
                    <div className="flex text-[0.88rem] px-3 cursor-pointer">
                      <p className="text-[0.88rem] mr-2 font-medium">
                        {valueData.label}
                      </p>
                      <p className="text-black-2 rounded-md px-2 bg-yellow-1">
                        {valueData.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-1">
                  <p className="text-gray-4">Select</p>
                </div>
              )}
            </div>
            <div className="ml-auto">
              <IoIosArrowDown className="text-gray-4" />
            </div>
          </div>
        </div>
      </Menu.Target>
      <Menu.Dropdown className="!w-fit md:w-full">
        <div className="w-full text-black-2">
          {props.data.map((el) => (
            <div
              onClick={() => {
                setValueData({
                  caption: el.caption,
                  label: el.label,
                  value: el.value,
                });
                props.changed(el.value);
                setOpened(false);
              }}
              key={el.value}
              className="outline-none cursor-pointer py-4 px-1 flex items-center !z-[100] relative"
            >
              <div className=" ">
                <div className="flex text-[0.88rem] px-3 cursor-pointer">
                  <p className="text-[0.88rem] mr-2 font-medium">{el.label}</p>
                  <p className="text-black-2 rounded-md px-2 bg-yellow-1">
                    {el.caption}
                  </p>
                </div>
              </div>
              {el.value === valueData.value ? (
                <div className="ml-auto">
                  <FaCheck className="text-black-2" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CaptionSelect;
