import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  setPageProps: (value: string) => void;
};

const SecureAccount = ({ setPageProps }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div className="text-black-2 mt-20">
        <h1 className="font-bold text-[1.5rem]">Secure your account</h1>
        <h2 className="text-[1.13rem]">
          Now it’s time to choose a strong password
        </h2>
      </div>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          router.push("/success-page/register");
        }}
      >
        {({ isValid }) => (
          <Form className="mt-10">
            <div className="">
              <Field
                classname="w-full"
                label="Choose a password"
                name="password"
                type="password"
                placeholder=""
              />
              <div className="mt-4">
                <Field
                  classname="w-full"
                  label="Retype password"
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full flex mt-28">
              <UnstyledButton
                type="button"
                clicked={() => setPageProps("2")}
                class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
              >
                Back
              </UnstyledButton>
              <UnstyledButton
                type="submit"
                disabled={!isValid}
                class="flex py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
              >
                <p className="mr-2">Create my account</p>
                <FaArrowRight className="text-[0.7rem]" />
              </UnstyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SecureAccount;
