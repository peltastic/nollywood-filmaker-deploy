import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

type Props = {
  children: ReactNode;
  hasFooter?: boolean;
};

const HomeLayout = ({ children, hasFooter }: Props) => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-[1680px] mx-auto ">

      {children}
      </div>
      {hasFooter ? <Footer /> : null}
    </div>
  );
};

export default HomeLayout;
