"use client"
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import ServiceLayout from "./ServiceLayout";


type Props = {
  children: ReactNode;
  hasFooter?: boolean;
  hideLogin?: boolean
};

const HomeLayout = ({ children, hasFooter, hideLogin }: Props) => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.status
  );
  return (
    <>
      {authStatus === "LOGGED_IN" ? (
        <ServiceLayout>
          {children}
        </ServiceLayout>
      ) : (
        <div className="">
          <Navbar hideLogin={hideLogin} />
          <div className="max-w-[1680px] mx-auto ">{children}</div>
          {hasFooter ? <Footer /> : null}
        </div>
      )}
    </>
  );
};

export default HomeLayout;
