"use client"

import ContactUsForm from "@/components/Forms/ContactUsForm";
import HomeTitleHeader from "@/components/Headers/HomeTitleHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Image from "next/image";
import React from "react";
import Vector1 from "/public/assets/header/vector-1.svg";

type Props = {};

const ContactUsPage = (props: Props) => {
  return (
    <HomeLayout hasFooter query="/contact-us">
      <div className="absolute top-[10rem] left-[2rem]">
        <Image src={Vector1} alt="vector-1" />
      </div>
      <HomeTitleHeader
        title="Get in touch"
        subTitle="We’d love to hear from you"
      />
      <ContactUsForm />
    </HomeLayout>
  );
};

export default ContactUsPage;
