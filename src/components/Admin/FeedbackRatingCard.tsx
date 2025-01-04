import { Progress, Rating } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  average_rating: string;
  total_rating: string;
  ratings_data: { rating: number; percentage: number }[];
};



const FeedbackRatingCard = (props: Props) => {
  return (
    <div className="border border-stroke-10 py-4 px-5 rounded-lg ">
      <h1 className="text-[1.13rem] text-black-8 font-medium">
        {props.title}
      </h1>
      <div className="flex items-center flex-col justify-center mt-12 ">
        <div className="bg-black-3 rounded-full h-[6rem] w-[6rem] flex justify-center items-center">
          <p className="font-semibold text-white text-[2.5rem]">{props.average_rating}</p>
        </div>
        <div className="mt-6">
          <Rating color="#F8C51B" size={"lg"} defaultValue={Number(props.average_rating)} />
          <p className="text-gray-5 text-center  text-[0.88rem] mt-4">
            {props.total_rating} ratings
          </p>
        </div>
      </div>
      <div className="mt-8">
        {props.ratings_data.map((el) => (
          <div className="flex mb-3 items-center" key={el.rating}>
            <p className="mr-2 font-medium text-black-3 text-[0.88rem]">
              {el.rating}
            </p>
            <div className="w-full">
              <Progress size={"sm"} value={el.percentage} color="#181818" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackRatingCard;
