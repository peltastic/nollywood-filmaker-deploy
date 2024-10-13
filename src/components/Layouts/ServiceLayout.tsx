import React, { ReactNode } from "react";
import ServiceNavbar from "../Navbar/ServiceNavbar";

type Props = {
  children: ReactNode;
  nonDashboard?: boolean;
  noNav?: boolean;
  consultant?: boolean;
};

const ServiceLayout = ({
  children,
  nonDashboard,
  noNav,
  consultant,
}: Props) => {
  return (
    <div>
      {noNav ? null : <ServiceNavbar consultant={consultant} />}
      <div className={` ${nonDashboard ? "max-w-[1600px] mx-auto" : ""} `}>
        {children}
      </div>
    </div>
  );
};

export default ServiceLayout;
