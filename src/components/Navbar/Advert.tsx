import Link from "next/link";
import React from "react";

type Props = {};

const Advert = (props: Props) => {
  return (
    <div className="bg-black-8 py-4">
      <Link href={"https://youtu.be/l9tNY0YxjQI?si=NsqPF7yXLvHrYABj"} target="_blank">
      <p className="text-sm text-center text-white text-[0.79rem]"><span className="text-yellow-1 hover:text-white hover:underline">Watch a tutorial on how our service works</span></p>
      </Link>
    </div>
  );
};

export default Advert;
