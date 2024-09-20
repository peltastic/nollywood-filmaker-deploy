import React from "react";
import webFlowLogo from "/public/assets/webflow/web-flow-logo.svg"
import Image from "next/image";

type Props = {};

const VideoCaptions = (props: Props) => {
  return (
    <div className="flex items-center">
      <div className="border-r border-black pr-6">
        <p className="font-semibold">Name Surname</p>
        <p>Position, Company name</p>
      </div>
      <div className="pl-6">
        <Image src={webFlowLogo} alt="webflow" />
      </div>
    </div>
  );
};

export default VideoCaptions;
