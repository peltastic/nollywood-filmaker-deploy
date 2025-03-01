import React, { useEffect } from "react";
import CountdownTimer from "../Timer/CountdownTimer";
import { Form, Formik } from "formik";
import Field from "../Field/Field";
import UnstyledButton from "../Button/UnstyledButton";
import { joinWaitlistSchema } from "@/utils/validation/join";
import { useJoinWaitRoomMutation } from "@/lib/features/join";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import Spinner from "@/app/Spinner/Spinner";
import Image from "next/image";
import Logo from "/public/assets/nf-logo-black.png";

type Props = {};

const ProjectCountdown = (props: Props) => {
  const [joinWaitRoom, { isLoading, isError, isSuccess, data, error }] =
    useJoinWaitRoomMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();

      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notify("success", "You're in! We'll keep you posted on updates", "");
    }
  }, [isError, isSuccess]);
  {
    /* <h1 className="font-bold text-xl md:text-3xl ">You too can make a Successful Film</h1>
  <h2 className="mt-8 text-sm sm:text-base">Drop your email so you don’t miss this</h2> */
  }

  return (
    <div className="bg-[#000000cf] w-full h-[100dvh] fixed text-black-2 left-0 top-0 z-[100] backdrop:blur-md">
      <div className="w-full lg:w-auto mx-auto fixed bottom-0 lg:bottom-auto top-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 text-center lg:-translate-y-1/2 py-4 lg:py-10 lg:px-10  rounded-xl bg-white">
        <div className="w-[90%] lg:w-fit mx-auto ">
          <div className="flex items-center sm:justify-center  lg:block">
            <Image
              className="w-[12rem] sm:w-[10rem] lg:mx-auto lg:mb-10 mr-auto"
              src={Logo}
              alt="logo"
            />
            <div className="ml-8 lg:ml-0">
              <CountdownTimer endTime={"2025-03-31T23:59:00+01:00"} label />
            </div>
            <p className="block lg:hidden ml-2 font-medium text-left">DAYS <br /> TO GO</p>
          </div>
          <h1 className="mt-4 lg:mt-10 text-left font-semibold mb-2 lg:mb-6 text-sm sm:text-base">
            Get Notified when Nollywood filmmaker launches!
          </h1>
          <div className="text-left">
            <Formik
              initialValues={{
                email: "",
                name: "",
              }}
              onSubmit={({ email, name }, { resetForm }) => {
                joinWaitRoom({
                  email,
                  name,
                }).then(() => {
                  resetForm();
                });
              }}
              validationSchema={joinWaitlistSchema}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <Field
                    name="email"
                    classname="w-full"
                    label="Email"
                    placeholder=""
                  />
                  <div className="mt-6">
                    <Field
                      name="name"
                      classname="w-full py-0"
                      label="Full name"
                      placeholder=""
                    />
                  </div>
                  <div className="flex mt-4 lg:mt-8">
                    <UnstyledButton
                      disabled={!isValid || isLoading}
                      class="disabled:cursor-not-allowed ml-auto flex py-3 px-4 w-full xs:w-[7rem] transition-all rounded-md  justify-center items-center text-white border border-black-3  bg-black-3 disabled:opacity-50 text-[0.88rem]"
                    >
                      {isLoading ? (
                        <div className="w-[1rem] py-1">
                          <Spinner />
                        </div>
                      ) : (
                        <p>Join</p>
                      )}
                    </UnstyledButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCountdown;
