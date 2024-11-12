import React from "react";
import * as Select from "@radix-ui/react-select";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";


type Props = {
  data: {
    value: string;
    label: string;
    caption?: string;
  }[];
  changed: (value: string) => void
};

const RadixSelect = ({ data, changed }: Props) => {
  return (
    <Select.Root onValueChange={(value) => changed(value) }>
      <Select.Trigger
        className="border border-stroke-2  px-2 outline-none text-start  py-3 rounded-md w-full"
        aria-label=""
      >
        <div className="flex items-center justify-between">
          <Select.Value placeholder="Select" className="text-[0.88rem]" />
          <Select.Icon>
            <IoIosArrowDown className="text-gray-4" />
          </Select.Icon>
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content 

        // position="popper"
        sticky="always"
        // align="center"
         className="bg-white  rounded-md border border-stroke-3 mt-14  ">
          <Select.Viewport>
            {data.map((el) => (
              <Select.Item
                value={el.value}
                key={el.value}
                className="outline-none py-4 px-6 sm:px-2 flex flex-wrap items-center hover:bg-gray-2 !z-[100] relative"
              >
                <Select.ItemText className=" ">
                  <div className="flex flex-wrap items-center text-[0.88rem] px-3 cursor-pointer">
                    <p className="text-[0.88rem] mr-2 font-medium w-full sm:w-auto">
                      {el.label}
                    </p>
                    <p className="text-black-2 rounded-md px-2 bg-yellow-1">
                      {el.caption}
                    </p>
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="ml-auto -mt-10 sm:mt-0">
                    <FaCheck className="text-black-2" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default RadixSelect;
