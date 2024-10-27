import React from "react";
import TestImg from "/public/assets/test-avatar.png";
import Image from "next/image";
import TextEditor from "../TextEditor/TextEditor";

type Props = {
  admin?: boolean;
};

const IssuesOrderDetails = (props: Props) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap items-start">
      <div className="w-full lg:w-[20%] text-black-3">
        <p className="text-[0.88rem] font-medium">Client</p>
        <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
          <div className="w-[1.2rem] mr-1">
            <Image src={TestImg} alt="test-image" />
          </div>
          <p className="text-[0.88rem]">Niyi Akinmolayan</p>
        </div>
        <p className="text-[0.88rem] font-medium mt-4">Order</p>
        <div className="bg-border-gray w-fit py-1 px-2  rounded-md">
          <p className="text-[0.88rem]">ORDER11632788</p>
        </div>
        <p className="text-[0.88rem] font-medium mt-4">Assigned to</p>
        <div className="flex items-center w-fit py-1 px-2 rounded-md bg-border-gray">
          <div className="w-[1.2rem] mr-1">
            <Image src={TestImg} alt="test-image" />
          </div>
          <p className="text-[0.88rem]">Damilola Emmanuel</p>
        </div>
        <p className="text-[0.88rem] font-medium mt-4">Created</p>
        <p className="text-[0.88rem] ">Aug 1, 2024</p>
      </div>
      <div className="w-full lg:w-[80%] mt-8 lg:mt-0">
        <div className="bg-white border border-stroke-5 shadow-md py-6 px-6 shadow-[#1018280F] rounded-md">
          <div className="text-white font-bold rounded-md bg-black-3 w-full py-2 px-4 text-[1.5rem]">
            My consultant is slow
          </div>
          <div className="text-black-2">
            <p className="text-[17px] mt-6">
              Hello, admin. I have dropped all the information that was
              requested of me and have been in communication with the assigned
              consultant. Unfortunately, it seems this person doesn’t know what
              to do, and instead of passing me over to someone who would,
              they’ve been dragging their feet.
            </p>
          </div>
        </div>
        {props.admin ? (
          <div className="mt-10">
            <TextEditor />
          </div>
        ) : (
          <div className="bg-stroke-5 rounded-md py-6 px-6 mt-10 text-black-2">
            <h1 className="text-[18px] font-bold">Hello Niyi,</h1>
            <p className="my-10">
              Thank you for reaching out and bringing this to our attention. I
              apologize for the inconvenience you’ve experienced. It's important
              to us that you receive the support you need, and it’s concerning
              to hear that your issue hasn't been properly addressed.
            </p>
            <p className="my-10">
              I'll escalate this matter immediately and ensure that you're
              connected with someone who can assist you effectively. Please
              expect a follow-up shortly. We appreciate your patience and
              understanding as we work to resolve this situation
            </p>
            <p className="mb-1">Best Regards</p>
            <p className="text-[18px] font-bold mb-1">Damilola Emmanuel</p>
            <p className="mb-10">Nollywood Filmaker</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesOrderDetails;
