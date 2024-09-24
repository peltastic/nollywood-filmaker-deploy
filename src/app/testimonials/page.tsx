"use client";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Image from "next/image";
import React from "react";
import Vector1 from "/public/assets/header/vector-1.svg";
import HomeTitleHeader from "@/components/Headers/HomeTitleHeader";
import VideoBox from "@/components/VideoBox/VideoBox";
import { Rating } from "@mantine/core";
import VideoCaptions from "@/components/Captions/VideoCaptions";
import TestimonalVideo from "@/components/Testimonial/TestimonalVideo";

type Props = {};

const TestimonialPage = (props: Props) => {
  return (
    <HomeLayout hasFooter >
      <div className="absolute top-[10rem] left-[2rem]">
        <Image src={Vector1} alt="vector-1" />
      </div>
      <HomeTitleHeader
        subTitle="Here’s what people say about us   "
        title="Testimonials"
      />
      <div className="px-[4rem] mt-[7rem] flex items-center">
        <div className="w-[50%]">
          <VideoBox />
        </div>
        <div className="ml-[6rem] w-[50%]">
          <Rating defaultValue={5} color="rgba(0, 0, 0, 1)" />
          <p className="text-[1.5rem] font-bold mt-8">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
            quis viverra ornare, eros dolor interdum nulla, ut commodo diam
            libero vitae erat."
          </p>
          <div className="mt-4">
            <VideoCaptions />
          </div>
        </div>
      </div>
      <div className="px-[4rem] mb-[10rem] gap-x-10 gap-y-20 mt-[11rem] grid grid-cols-2">
        <TestimonalVideo />
        <TestimonalVideo />
        <TestimonalVideo />
        <TestimonalVideo />
      </div>
    </HomeLayout>
  );
};

export default TestimonialPage;
