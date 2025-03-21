"use client";

import ContactUsForm from "@/components/Forms/ContactUsForm";
import HomeTitleHeader from "@/components/Headers/HomeTitleHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Image from "next/image";
import React from "react";
import Vector1 from "/public/assets/header/vector-1.svg";
import { IoLogoWhatsapp } from "react-icons/io";
import { CiMail } from "react-icons/ci";

type Props = {};

const ContactUsPage = (props: Props) => {
  return (
    <HomeLayout hasFooter>
      <div className="absolute top-[10rem] left-[2rem]">
        <Image src={Vector1} alt="vector-1" />
      </div>
      <HomeTitleHeader
        title="Get in touch"
        subTitle="We’d love to hear from you"
      />
      <div className=" w-[95%] md:w-[70%] lg:w-[40%] xxl:w-[50%] mx-auto mt-2">
        <div className="flex items-center mb-4">
          <CiMail className="text-2xl" /> &nbsp;
          <p>support@nollywoodfilmmaker.com</p>
        </div>
        <div className="flex items-center">
          <IoLogoWhatsapp className="text-2xl text-green-500" /> &nbsp;
          <p>09135000932</p>
        </div>
      </div>
      <ContactUsForm />
    </HomeLayout>
  );
};

export default ContactUsPage;
