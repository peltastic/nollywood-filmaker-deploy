import React, { ReactNode } from "react";
import ServiceNavbar from "../Navbar/ServiceNavbar";

type Props = {
  children: ReactNode;
  nonDashboard?: boolean
};

const ServiceLayout = ({ children, nonDashboard }: Props) => {
  return (
    <div>
      <ServiceNavbar />
      <div className={` ${nonDashboard ? "max-w-[1600px] mx-auto" : "" } `}>{children}</div>
    </div>
  );
};

export default ServiceLayout;
