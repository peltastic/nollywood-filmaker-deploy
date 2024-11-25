import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Field from "@/components/Field/Field";
import { IRegisterdata } from "@/interfaces/auth/auth";
import { useRegisterMutation } from "@/lib/features/users/auth/auth";
import { successColor } from "@/utils/constants/constants";
import { secureAccountSchema } from "@/utils/validation/auth";
import { notifications } from "@mantine/notifications";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import classes from "@/app/styles/SuccessNotification.module.css";
import LoadingBar from "react-top-loading-bar";
import { nprogress } from "@mantine/nprogress";
import { CancelSvg } from "@/components/CustomSvgs/CustomSvgs";

type Props = {
  setPageProps: (value: string) => void;
  data: IRegisterdata;
};

const SecureAccount = ({ setPageProps, data }: Props) => {
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      setErrorMessage((error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notifications.show({
        title: "Successful",
        message: "Acoount created successfully, Please login",
        color: successColor,
        classNames: classes,
        position: "top-right",
      });
      nprogress.complete();
      router.push("/auth/login");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <div className="text-black-2 mt-20">
        <h1 className="font-bold text-[1.5rem]">Secure your account</h1>
        <h2 className="text-[1.13rem]">
          Now it’s time to choose a strong password
        </h2>
      </div>

      {errorMessage && (
        <div className="flex px-4 rounded-sm mt-4 text-dark-red items-center bg-light-red py-3 w-full">
          <p className=" mr-auto text-sm  font-medium">{errorMessage}</p>
          <div className="cursor-pointer" onClick={() => setErrorMessage("")}>
            <CancelSvg fill="#BD002A" />
          </div>
        </div>
      )}
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => {
          nprogress.start();
          registerUser({
            email: data.email,
            expertise: data.expertise,
            fname: data.fname,
            lname: data.lname,
            phone: data.phone,
            password: values.password,
          });
        }}
        validationSchema={secureAccountSchema}
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
                password
              />
              <div className="mt-4">
                <Field
                  classname="w-full"
                  password
                  label="Retype password"
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full flex mt-28 mb-8 sm:mb-0">
              <UnstyledButton
                type="button"
                clicked={() => setPageProps("2")}
                class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
              >
                Back
              </UnstyledButton>
              <UnstyledButton
                type="submit"
                disabled={!isValid || isLoading}
                class="w-[11.5rem] justify-center flex py-2  hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
              >
                {isLoading ? (
                  <div className="w-[1rem] py-1">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <p className="mr-2">Create my account</p>
                    <FaArrowRight className="text-[0.7rem]" />
                  </>
                )}
              </UnstyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SecureAccount;
