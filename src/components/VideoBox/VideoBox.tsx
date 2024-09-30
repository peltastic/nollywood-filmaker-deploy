import Image from "next/image";
import React from "react";
import PlayButtonImage from "/public/assets/play-video.svg";

type Props = {};

const VideoBox = (props: Props) => {
  return (
    <div className="relative bg-[#00000080] h-[15rem] sm:h-[25.56rem]">
      <div className="absolute -translate-x-1/2 w-[8rem] h-[6.4rem] flex items-center justify-center rounded-md -translate-y-1/2 bg-[rgba(0,0,0,0.25)] left-1/2 top-1/2">
        <Image src={PlayButtonImage} alt="play-button" />
      </div>
    </div>
  );
};

export default VideoBox;
