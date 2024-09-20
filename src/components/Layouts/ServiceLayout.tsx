import React, { ReactNode } from "react";
import ServiceNavbar from "../Navbar/ServiceNavbar";

type Props = {
  children: ReactNode;
};

const ServiceLayout = ({ children }: Props) => {
  return (
    <div>
      <ServiceNavbar />
      {children}
    </div>
  );
};

export default ServiceLayout;
