import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

type Props = {
  children: ReactNode;
  hasFooter?: boolean;
};

const HomeLayout = ({ children, hasFooter }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
      {hasFooter ? <Footer /> : null}
    </div>
  );
};

export default HomeLayout;
