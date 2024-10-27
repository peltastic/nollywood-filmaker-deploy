import React from "react";
import TestImg from "/public/assets/admin/test-image.png";
import Image from "next/image";
import { Rating } from "@mantine/core";

type Props = {};

const data = [
  {
    name: "Yomi fash lanso",
    requests: "1246",
    rating: 5,
    id: "1",
  },
  {
    name: "Yomi fash lanso",
    requests: "1246",
    rating: 5,
    id: "2",
  },
  {
    name: "Yomi fash lanso",
    requests: "1246",
    rating: 5,
    id: "3",
  },
  {
    name: "Yomi fash lanso",
    requests: "1246",
    rating: 5,
    id: "4",
  },
  {
    name: "Yomi fash lanso",
    requests: "1246",
    rating: 5,
    id: "5",
  },
];

const TopConsultants = (props: Props) => {
  return (
    <div className="border h-full border-stroke-10 py-4 px-5 rounded-lg">
      <h1 className="text-[1.13rem] text-black-8 font-medium">
        Top Consultants
      </h1>
      <div className="mt-10">
        {data.map((el) => (
          <div className="mb-7 flex items-center" key={el.id}>
            <div className="mr-4">
              <Image src={TestImg} alt="test-image" />
            </div>
            <div className="mr-auto">
              <p className="font-semibold text-[0.88rem]">{el.name}</p>
              <p className="text-[#00000066] font-semibold text-[0.75rem]">
                {new Intl.NumberFormat("en-US").format(Number(el.requests))}{" "}
                requests completed
              </p>
            </div>
            <div className="flex items-center">
              <Rating color="#F8C51B" size={"xs"} defaultValue={el.rating} />
              <p className="font-bold text-[0.88rem] ml-2">{el.rating.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopConsultants;
