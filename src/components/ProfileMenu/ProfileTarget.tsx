import { AspectRatio } from "@mantine/core";
import Image from "next/image";
import React from "react";

type Props = {
  fname: string;
  lname: string;
  ppicture?: string;
};

const ProfileTarget = (props: Props) => {
  return (
    <div>
      {props.ppicture ? (
        <div className="md:mr-4">
          <AspectRatio ratio={1800 / 1800}>
            <Image
              src={props.ppicture}
              width={100}
              height={100}
              alt="test-image"
              className=" rounded-full w-[2.4rem] md:w-[2rem] h-[2.4rem] md:h-[2rem]"
            />
          </AspectRatio>
        </div>
      ) : (
        <div className="bg-black-3 font-bold text-[0.5rem] mr-4 h-[1.7rem] flex items-center justify-center w-[1.7rem] rounded-full text-white">
          {props.fname[0]} {props.lname[0]}
        </div>
      )}
    </div>
  );
};

export default ProfileTarget;
