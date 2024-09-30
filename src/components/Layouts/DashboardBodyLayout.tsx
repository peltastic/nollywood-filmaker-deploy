import React from "react";

interface Props extends React.PropsWithChildren {}

const DashboardBodyLayout = ({ children }: Props) => {
  return (
    <div className=" min-h-screen bg-gray-bg-2 px-0 lg:px-2 chatbp:px-10 py-0 lg:py-2 chatbp:py-10">
      <div className="max-w-[1680px] mx-auto">{children}</div>
    </div>
  );
};

export default DashboardBodyLayout;
