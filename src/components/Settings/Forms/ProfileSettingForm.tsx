import UnstyledButton from "@/components/Button/UnstyledButton";
import Expertise from "@/components/Expertise/Expertise";
import Field from "@/components/Field/Field";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import { Form, Formik } from "formik";
import React from "react";

type Props = {};

const ProfileSettingForm = (props: Props) => {
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        bio: "",
        website: "",
      }}
      onSubmit={() => {}}
    >
      <Form>
        <div className="flex items-center">
          <div className="w-[35%]">
            <h1 className="font-semibold">First & Last Name</h1>
          </div>
          <div className="w-[65%] grid grid-cols-2 gap-x-4">
            <Field
              classname="w-full font-semibold placeholder:font-normal"
              label=""
              name="first_name"
              placeholder="First Name"
            />
            <Field
              classname="w-full font-semibold placeholder:font-normal"
              label=""
              name="last_name"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex items-center mt-8">
          <div className="w-[35%]">
            <h1 className="font-semibold">Email Address</h1>
          </div>
          <div className="w-[65%] ">
            <Field
              classname="w-full font-semibold placeholder:font-normal"
              label=""
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="flex items-center mt-8">
          <div className="w-[35%]">
            <h1 className="font-semibold">Phone</h1>
          </div>
          <div className="w-[65%] ">
            <Field
              classname="w-full font-semibold placeholder:font-normal"
              label=""
              name="phone"
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="flex  mt-8">
          <div className="w-[35%]">
            <h1 className="font-semibold">Write Your Bio</h1>
          </div>
          <div className="w-[65%] ">
            <TextArea
              placeholder="Write about you"
              className="resize-none py-4 px-4 h-[10rem]"
              changed={() => {}}
              value=""
            />
          </div>
        </div>
        <div className="flex items-center  mt-8">
          <div className="w-[35%]">
            <h1 className="font-semibold">Website</h1>
          </div>
          <div className="w-[65%] flex">
            <div className=" bg-gray-bg-8 border border-r-0 flex items-center justify-start rounded-s-md border-gray-2  px-3">
              <p className="text-[#71717A] text-[13px]">https://</p>
            </div>
            <Field
              classname="rounded-s-none w-full h-full font-semibold placeholder:font-normal"
              label=""
              name="website"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex  mt-8">
          <div className="w-[35%]">
            <h1 className="font-semibold">Expertise</h1>
          </div>
          <div className="w-[65%]">
            <Expertise data={[]} small setExpertise={() => {}} />
          </div>
        </div>
        <div className="flex  mt-8">
          <div className="w-[35%]">
            <h1 className="font-semibold">Location</h1>
          </div>
          <div className="w-[65%] grid grid-cols-2 gap-4">
            <SelectComponent
              placeholder="Country"
              data={[]}
              label=""
              size="md"
              setValueProps={() => {}}
            />
            <SelectComponent
              placeholder="State"
              data={[]}
              label=""
              size="md"
              setValueProps={() => {}}
            />
            <SelectComponent
              placeholder="City"
              data={[]}
              label=""
              size="md"
              setValueProps={() => {}}
            />
            <SelectComponent
              placeholder="Postal code"
              data={[]}
              label=""
              size="md"
              setValueProps={() => {}}
            />
          </div>
        </div>
        <UnstyledButton class="text-[0.88rem] font-medium mt-8 bg-black-2 text-white px-4 py-2 rounded-md ">
            Update
        </UnstyledButton>
      </Form>
    </Formik>
  );
};

export default ProfileSettingForm;
