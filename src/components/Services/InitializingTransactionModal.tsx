import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "@/components/Lottie/loading.json";
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";

type Props = {
  status: "initialized" | "pending" | "completed";
};

const InitializingTransactionModal = (props: Props) => {
  return (
    <>
      <Backdrop />
      <motion.div
        initial={{
          y: "-100%",
          x: "-50%"
         
        }}
        animate={{
          y: "-50%",
          x: "-50%"
        }}
        className="w-full md:w-[80%] xl:w-[50%] h-[100%] md:h-auto z-20 py-[5rem] rounded-md fixed left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-white"
      >
        <div className="w-[5rem] mx-auto">
          <Lottie animationData={LoadingAnimation} loop={true} />
        </div>
        <div className="text-center mt-9 text-black-2">
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
        </div>
      </motion.div>
    </>
  );
};

export default InitializingTransactionModal;
