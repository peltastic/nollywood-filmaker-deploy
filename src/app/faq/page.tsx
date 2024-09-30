"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Accordion } from "@mantine/core";
import React, { useState } from "react";
import Image from "next/image";
import PlusIcon from "/public/assets/accordion/chevron.svg";
import MinusIcon from "/public/assets/accordion/opened-chevron.svg";
import classes from "../styles/Faq.module.css";
import FaqContactUs from "@/components/Sections/FaqContactUs";
import HomeTitleHeader from "@/components/Headers/HomeTitleHeader";
import Vector1 from "/public/assets/header/vector-1.svg";

const faqList = [
  {
    id: "acc-1",
    value: "Is there a free trial available?",
    description:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    id: "acc-2",
    value: "Can I change my plan later?",
    description:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    id: "acc-3",
    value: "What is your cancellation policy?",
    description:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    id: "acc-4",
    value: "Can other info be added to an invoice?",
    description:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    id: "acc-5",
    value: "How does billing work?",
    description:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    id: "acc-6",
    value: "How do I change my account email?",
    description:
      "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
];

type Props = {};

const FAQPage = (props: Props) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <HomeLayout hasFooter >
      <div className="absolute top-[10rem] left-[2rem]">
        <Image src={Vector1} alt="vector-1" />
      </div>
      <HomeTitleHeader
        subTitle="Everything you need to know about the product and billing."
        title="Frequently asked questions"
      />
      <div className="w-[90%] md:w-[60%] mx-auto mt-[4rem]">
        <Accordion
          disableChevronRotation
          classNames={{ chevron: classes.chevron, item: classes.item }}
          onChange={setValue}
          chevron={
            value ? (
              <Image src={MinusIcon} alt="plus-icon" />
            ) : (
              <Image src={PlusIcon} alt="plus-icon" />
            )
          }
        >
          {faqList.map((el) => (
            <Accordion.Item value={el.id} key={el.id}>
              <Accordion.Control className="">
                <p className="">{el.value}</p>
              </Accordion.Control>
              <Accordion.Panel>
                <p className="text-gray-1 text-[0.9rem]">{el.description}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <FaqContactUs />
    </HomeLayout>
  );
};

export default FAQPage;
