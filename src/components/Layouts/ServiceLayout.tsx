import React, { ReactNode } from "react";
import ServiceNavbar from "../Navbar/ServiceNavbar";

type Props = {
  children: ReactNode;
  nonDashboard?: boolean
  noNav?: boolean
};

const ServiceLayout = ({ children, nonDashboard, noNav }: Props) => {
  return (
    <div>
      {noNav ? null :<ServiceNavbar />}
      <div className={` ${nonDashboard ? "max-w-[1600px] mx-auto" : "" } `}>{children}</div>
    </div>
  );
};

export default ServiceLayout;
