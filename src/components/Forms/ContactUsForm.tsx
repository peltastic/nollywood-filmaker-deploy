"use client";
import React, { useEffect, useState } from "react";
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import TextArea from "../TextArea/TextArea";
import CheckboxComponent from "../Checkbox/Checkbox";
import UnstyledButton from "../Button/UnstyledButton";
import { FaArrowRight } from "react-icons/fa";
import { useContactUsMutation } from "@/lib/features/contact-us";
import { contactUsSchema } from "@/utils/validation/contact-us";
import Spinner from "@/app/Spinner/Spinner";
import { notify } from "@/utils/notification";
import Link from "next/link";

type Props = {};

const ContactUsForm = (props: Props) => {
  const [contactus, { data, isError, isLoading, error, isSuccess }] =
    useContactUsMutation();
  const [message, setMessage] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notify("success", "Message sent successfully");
    }
  }, [isError, isSuccess]);
  return (
    <div className="mt-10 mb-28 w-[95%] md:w-[70%] lg:w-[40%] xxl:w-[50%] mx-auto">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        }}
        onSubmit={({ email, firstName, lastName, phone }, { resetForm }) => {
          contactus({
            email,
            agreedToPrivacyPolicy: true,
            firstName,
            lastName,
            message,
            phone,
          })
            .unwrap()
            .then(() => {
              resetForm();
              setMessage("");
              setTerms(false);
            });
        }}
        validationSchema={contactUsSchema}
      >
        {({ isValid }) => (
          <Form>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="">
                <Field
                  classname="w-full"
                  label="First name"
                  placeholder="First name"
                  name="firstName"
                />
              </div>
              <div className="">
                <Field
                  classname="w-full"
                  label="Last name"
                  placeholder="Last name"
                  name="lastName"
                />
              </div>
            </div>
            <div className="mt-9">
              <Field
                classname="w-full"
                label="Email"
                placeholder="you@company.com"
                name="email"
              />
            </div>
            <div className="mt-9">
              <Field
                classname="w-full"
                label="Phone number"
                placeholder="+1 (555) 000-0000"
                name="phone"
              />
            </div>
            <div className="mt-9">
              <TextArea
                label="Message"
                changed={(val) => setMessage(val)}
                placeholder=""
                value={message}
                className="py-1 px-3 h-[10rem] outline-none"
              />
            </div>
            <div className="mt-6">
              <CheckboxComponent
                setCheckedProps={(val) => setTerms(val)}
                checked={terms}
                label={
                  <p className="text-gray-3">
                    You agree to our friendly{" "}
                    <span className="underline">
                      <Link href="/privacy-policy" target="_blank">
                        privacy policy.
                      </Link>
                    </span>
                  </p>
                }
              />
            </div>
            <UnstyledButton
              disabled={!isValid || isLoading || !message || !terms}
              class=" transition-all hover:text-white hover:bg-blue-1 disabled:opacity-50 py-4 px-4 mt-12 rounded-md w-full  flex justify-center items-center mx-auto text-white bg-black-2"
            >
              <>
                {isLoading ? (
                  <div className="w-[1rem] py-1">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <p className="text-[0.88rem] mr-2">Send message</p>
                    <FaArrowRight className="text-[0.7rem]" />
                  </>
                )}
              </>
            </UnstyledButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUsForm;
