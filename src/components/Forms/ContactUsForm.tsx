import React from "react";
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import TextArea from "../TextArea/TextArea";
import CheckboxComponent from "../Checkbox/Checkbox";
import UnstyledButton from "../Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";

type Props = {};

const ContactUsForm = (props: Props) => {
  return (
    <div className="mt-16 mb-28 w-[40%] xxl:w-[50%] mx-auto">
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <div className="grid gap-10 grid-cols-2">
            <div className="">
              <Field
                classname="w-full"
                label="First name"
                placeholder="First name"
                name="omo"
              />
            </div>
            <div className="">
              <Field
                classname="w-full"
                label="Last name"
                placeholder="Last name"
                name="omo"
              />
            </div>
          </div>
          <div className="mt-9">
            <Field
              classname="w-full"
              label="Email"
              placeholder="you@company.com"
              name="omo"
            />
          </div>
          <div className="mt-9">
            <Field
              classname="w-full"
              label="Phone number"
              placeholder="+1 (555) 000-0000"
              name="omo"
            />
          </div>
          <div className="mt-9">
            <TextArea
              label="Message"
              changed={() => {}}
              placeholder=""
              value=""
            />
          </div>
          <div className="mt-6">
            <CheckboxComponent
              label={
                <p className="text-gray-3">
                  You agree to our friendly{" "}
                  <span className="underline">privacy policy.</span>
                </p>
              }
            />
          </div>
          <UnstyledButton class="py-3 px-4 mt-12 rounded-md w-full  flex justify-center items-center mx-auto text-white bg-black-2">
            <p className="text-[0.88rem] mr-2">Send message</p>
            <FaArrowRight className="text-[0.7rem]" />
          </UnstyledButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactUsForm;
