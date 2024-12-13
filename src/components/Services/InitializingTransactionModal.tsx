import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import Spinner from "@/app/Spinner/Spinner";
import Link from "next/link";
import ServiceInfo from "../ServiceInfo/ServiceInfo";

type Props = {
  status: "initialized" | "pending" | "completed";
  paymentUrl?: string;
  info?: string;
};

const InitializingTransactionModal = (props: Props) => {
  return (
    <>
      <Backdrop />
      <motion.div
        initial={{
          y: "-100%",
          x: "-50%",
        }}
        animate={{
          y: "-50%",
          x: "-50%",
        }}
        className="w-full md:w-[80%] px-10 xl:w-[50%] h-[100%] md:h-auto z-20 py-[5rem] rounded-md fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-white"
      >
        {props.info && <ServiceInfo activeColor content={props.info} />}

        <div className="flex mt-10 items-center">
          <div className="w-[1.5rem]">
            <Spinner dark />
          </div>
          <p className="ml-4 font-medium">
            {props.status === "initialized"
              ? "Generating Payment link...."
              : "Waiting for payment confirmation...."}
          </p>
        </div>
        {props.paymentUrl && (
          <Link
            className="mt-10 bg-black-2 flex disabled:opacity-50 justify-center hover:bg-blue-1 transition-all text-white w-full py-4 rounded-md"
            href={props.paymentUrl}
            target="_blank"
          >
            Click Here To Pay
          </Link>
        )}
        {/* <div className="text-center mt-9 text-black-2">
          <p className="font-semibold text-xl  ">
            {props.status === "initialized"
              ? "Initializing Payment"
              : props.status === "pending"
              ? "Processing Payment"
              : "Payment Received"}
          </p>
          <p className=" font-medium mt-3">
            {props.status === "initialized"
              ? "You will be redirected to a payment window in a few seconds"
              : props.status === "pending"
              ? "Processing payment, will be completed as soon as payment is received"
              : ""}
          </p>
        </div> */}
      </motion.div>
    </>
  );
};

export default InitializingTransactionModal;
