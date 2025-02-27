"use client";
import UnstyledButton from "@/components/Button/UnstyledButton";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { BsClockHistory } from "react-icons/bs";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  return (
    <ServiceLayout>
      <div className=" text-center md:absolute md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 mt-[3rem] md:mt-0 mx-auto">
        <BsClockHistory className="text-5xl mx-auto mb-10" />
        <p className="text-2xl">
          Your profile is being verified, you'll an email soon
        </p>
        <UnstyledButton
          clicked={() => router.push("/")}
          class="w-[90%] md:w-[30rem] block hover:bg-blue-1 transition-all duration-500  mt-10 text-[1.13rem] font-bold py-4 rounded-md  text-center mx-auto bg-black-2 text-white "
        >
          Take me home
        </UnstyledButton>
      </div>
    </ServiceLayout>
  );
};

export default page;
