import Image from "next/image";
import React from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import Field from "../Field/Field";
import Expertise from "../Expertise/Expertise";
import UnstyledButton from "../Button/UnstyledButton";

type Props = {
  close: () => void;
  edit?: boolean;
};

const CreateNewConsultantModal = (props: Props) => {
  return (
    <section className="px-2 xs:px-6 py-6">
      <div className="flex">
        <h1 className="font-semibold text-[1.4rem] sm:text-[2rem]">
          {props.edit ? "Edit consultant" : "Create new consultant"}
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      {props.edit ? null : (
        <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
          <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
          <div className="text-black-7 text-[0.88rem]">
            <p>• Choose a consultant</p>
            <p>• Assign the request</p>
          </div>
        </div>
      )}
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          state: "",
          country: "",
        }}
        onSubmit={() => {}}
      >
        <Form className="mt-6">
          <div className="grid gap-8 md:grid-cols-2 my-[2rem]">
            <div className="">
              <Field
                placeholder=""
                classname=" w-full"
                label="First name"
                name="first_name"
              />
            </div>
            <div className="">
              <Field
                placeholder=""
                classname="w-full"
                label="Last name"
                name="last_name"
              />
            </div>
            <div className="">
              <Field
                placeholder=""
                classname=" w-full"
                label="Email"
                name="email"
              />
            </div>
            <div className="">
              <Field
                placeholder=""
                classname="w-full"
                label="Last name"
                name="phone"
              />
            </div>
            <div className="">
              <Field
                placeholder=""
                classname=" w-full"
                label="State"
                name="state"
              />
            </div>
            <div className="">
              <Field
                placeholder=""
                classname="w-full"
                label="Country"
                name="country"
              />
            </div>
          </div>
          <div className="mt-10">
            <Expertise setExpertise={(value, type) => {}} data={[]} small />
          </div>
          <div className="  w-full flex flex-wrap mt-[5rem]">
            <UnstyledButton
              clicked={props.close}
              class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
            >
              Cancel
            </UnstyledButton>
            <UnstyledButton class="flex py-2 px-4 transition-all rounded-md w-full xs:w-auto justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2">
              <p>Create</p>
            </UnstyledButton>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default CreateNewConsultantModal;
