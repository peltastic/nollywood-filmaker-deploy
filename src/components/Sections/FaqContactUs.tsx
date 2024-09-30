import React from "react";
import Profiles from "/public/assets/faq/profiles.png";
import Image from "next/image";
import UnstyledButton from "../Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";

type Props = {};

const FaqContactUs = (props: Props) => {
  return (
    <section className="bg-gray-bg-1 py-14 mt-20 w-full px-4 sm:px-0 sm:w-[85%] mx-auto mb-[5rem]">
      <div className="w-fit mx-auto">
        <Image src={Profiles} alt="profiles" className="w-[7rem]" />
      </div>
      <div className="text-center">
        <h1 className="text-black-1 text-[1.25rem] py-2 mt-4">Still have questions?</h1>
        <h2 className="text-gray-1 text-[1.13rem]">
          Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly
          team.
        </h2>
        <UnstyledButton class="py-2 px-4 mt-12 rounded-md flex items-center mx-auto text-white bg-black-2">
          <p className="text-[0.88rem] mr-2">Contact us</p> <FaArrowRight className="text-[0.7rem]" />
        </UnstyledButton>
      </div>
    </section>
  );
};

export default FaqContactUs;
