import Image from "next/image";
import React from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import CustomSelect from "../Select/CustomSelect";
import UnstyledButton from "../Button/UnstyledButton";

type Props = {
  close: () => void;
};

const AssignRequestModal = (props: Props) => {
  return (
    <section className="px-2 sm:px-6 py-6 h-screen">
      <div className="flex">
        <h1 className="font-semibold text-[1.4rem] sm:text-[2rem]">
          Assign Request
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
        <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
        <div className="text-black-7 text-[0.88rem]">
          <p>• Choose a consultant</p>
          <p>• Assign the request</p>
        </div>
      </div>
      <div className=" mt-4">
        <CustomSelect
          data={[
            {
              label: "Arlene McCoy",
              value: "Arlene McCoy",
              caption: "Cinematographer",
              info: "12 requests completed"
            },
            {
              label: "James Johnson",
              value: "James Johnson",
              caption: "Director",
              info: "11 requests completed"
            },
          ]}
        />
      </div>
      <div className="xs:absolute xs:bottom-4 right-4 w-full flex flex-wrap mt-[5rem]">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
     
          class="flex py-2 px-4 transition-all rounded-md w-full xs:w-auto justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
        >
          <p>Assign Request</p>
        </UnstyledButton>
      </div>
    </section>
  );
};

export default AssignRequestModal;
