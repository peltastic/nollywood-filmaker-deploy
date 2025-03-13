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
import YoutubeIcon from "/public/assets/youtube-icon.svg";
import Link from "next/link";

const faqList = [
  {
    id: "acc-1",
    value:
      "What services does NOLLYWOOD FILMMAKER offer for filmmakers and enthusiasts?",
    description:
      "We provide online consultancy services, including pre-production planning, production support, post-production editing, marketing, distribution, and legal consultations.",
  },
  {
    id: "acc-2",
    value:
      "Are NOLLYWOOD FILMMAKER services limited to Nollywood, or do you support other film industries?",
    description:
      "While we specialize in supporting Nollywood filmmakers and people looking to make films in Nigeria, we also support filmmakers from anywhere in the world. ",
  },
  {
    id: "acc-3",
    value:
      "Can NOLLYWOOD FILMMAKER help recommend which platform my movie/series should be exhibited on after watching the final cut of my movie/series? ",
    description:
      "We recommend a platform for exhibition.Yes we can recommend the best path for a film",
  },
  {
    id: "acc-4",
    value:
      "How long does it take for an issue I raised to be resolved by your team? ",
    description: " 24-48hours ",
  },
  {
    id: "acc-5",
    value:
      "I scheduled a chat with a professional and made the payment, but I’m unable to track the progress on my dashboard. What steps can I take to resolve this?",
    description: " Kindly send an email to our support team. This is hi",
  },
  {
    id: "acc-6",
    value:
      "I only need one legal document. Will I be billed separately for it, or do I need to pay for all the legal documents as a package?",
    description: " Legal document is a full package.",
  },
  {
    id: "acc-7",
    value: "Am I allowed to request a particular consultant to chat with me?",
    description: "No. All our consultants are industry professionals.",
  },
  {
    id: "acc-8",
    value:
      "I experienced network issues during my chat with my consultant and couldn’t complete the session before my time ran out. How can I recover the lost time?",
    description:
      "Send this to us as an issue and we will try get you another chat session.",
  },
  {
    id: "acc-9",
    value: "How can I sign up to be a Consultant on NOLLYWOOD FILMMAKER?",
    description:
      "Right now, you cant because our consultants are chosen by our team of experts.",
  },
  {
    id: "acc-10",
    value: "How do I edit my expertise on my NOLLYWOOD FILMMAKER profile?",
    description: "Kindly go to settings on your top right.",
  },
  {
    id: "acc-11",
    value:
      "Can I change the email address used to open my NOLLYWOOD FILMMAKER profile?",
    description: "",
  },
  {
    id: "acc-12",
    value:
      "My dashboard shows that my consultant sent a file to my email, but I can't find it in my inbox. How do I contact my consultant to address this issue?",
    description:
      "This is highly unlikely to happen. If it does, kindly send an email to our support team.",
  },
  {
    id: "acc-13",
    value:
      "Can I export my chat or download files from my previously completed chats?",
    description: "Yes",
  },
  {
    id: "acc-14",
    value:
      "I sent the wrong file to be reviewed by a consultant. How do I rectify this?",
    description: "Contact support and send your order number. ",
  },
  {
    id: "acc-15",
    value:
      "Will I get a reminder mail when it’s almost time for my chat session?",
    description:
      "Yes, you will get a reminder via email and SMS 5 minutes to your chat session. ",
  },
  {
    id: "acc-16",
    value:
      "Can I reschedule my session to an hour earlier than my original slated time?",
    description:
      "Kindly send an email to our support team an hour before your chat time.",
  },
  {
    id: "acc-17",
    value:
      "On the crew database, can I choose more than one department if I belong to more than one department?",
    description: "Yes",
  },
  {
    id: "acc-18",
    value:
      " I plan to shoot two movies but haven’t decided which one to prioritize. Can I use a single “Create a Production Budget” chat request to develop budgets for both movies? This will help me decide which one to shoot first.",
    description:
      "We advise you to chat with a producer using our chat with a profeesional.",
  },
  {
    id: "acc-19",
    value:
      "The service I need from NOLLYWOOD FILMMAKER isn’t listed on the website. How can I inquire about this service?",
    description: " Kindly send an Email to our support team.",
  },
  {
    id: "acc-20",
    value: " Can I extend my chat session with my consultant? ",
    description: "Yes",
  },
  {
    id: "acc-21",
    value:
      "How can users stay updated on new services, events, or announcements?",
    description:
      "Subscribe to our newsletter or follow us on social media for updates.",
  },
  {
    id: "acc-22",
    value: "Can I track the progress of my project online?",
    description:
      "Yes, our platform provides an online dashboard where you can track milestones, view reports, and communicate with your project team in real time.",
  },
  {
    id: "acc-24",
    value:
      "Can I submit feedback or request changes during the project development process?",
    description: "No, we encourage feedback after the project is completed. ",
  },
  {
    id: "acc-25",
    value: "How do I access project reports or updates once work has started?",
    description:
      "All reports and updates will be shared on your account dashboard. You’ll also receive notifications when new information is uploaded.",
  },
  {
    id: "acc-26",
    value:
      " Are the stated durations for each service accurate, or could they extend beyond what’s listed?",
    description:
      "We have specific timeline for each services which you will see while making a request.",
  },
  {
    id: "acc-27",
    value:
      "Are there specific genres or types of films your team specializes in?",
    description:
      "Our team has experience across multiple genres, including drama, comedy, action, documentaries, and web series. Let us know your project’s vision.",
  },
];

type Props = {};

const FAQPage = (props: Props) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <HomeLayout hasFooter>
      <div className="absolute top-[10rem] left-[2rem]">
        <Image src={Vector1} alt="vector-1" />
      </div>

      <HomeTitleHeader
        subTitle="Everything you need to know about the product and billing."
        title="Frequently asked questions"
      />
      <div className="w-[90%] md:w-[60%] mx-auto mt-[4rem]">
        <div className=" my-3 mb-11 hover:scale-105 transition-all">
          <Link
          className="flex items-center"
            href={
              "https://youtube.com/@nollywoodfilmmakersupport?si=OyyVtZEiXZPNjkdY"
            }
          >
            <Image
              src={YoutubeIcon}
              alt="youtube-icon"
              className="w-[2rem] mr-2"
            />
            <p className="border-b cursor-pointer">
              Check out tutorials on out youtube channel
            </p>
          </Link>
        </div>
        <h1 className="text-2xl font-semibold">FAQs General Information</h1>
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
                <p className="mr-4">{el.value}</p>
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
