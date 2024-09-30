import React, { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const ServiceRight = ({ title, subtitle, children }: Props) => {
  return (
    <div className="text-black-2 px-4 xs:px-10 md:px-[5rem] py-[5rem] w-full lg:w-[55%]">
      <h1 className="font-bold text-[1.5rem]">{title}</h1>
      <h2 className="text-[1.13rem]">{subtitle}</h2>
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
};

export default ServiceRight;
