import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import Field from "../Field/Field";
import SwitchComponent from "../Switch/SwitchComponent";
import UnstyledButton from "../Button/UnstyledButton";
import { useUpdatePasswordMutation } from "@/lib/features/users/profile/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Spinner from "@/app/Spinner/Spinner";
import { notify } from "@/utils/notification";

type Props = {};

const SecuritySettings = (props: Props) => {
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  const [updatePassword, { isLoading, isError, isSuccess, error }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notify("success", "Successful", "Password Updated Successfully!");
    }
  }, [isSuccess, isError]);
  return (
    <div className="bg-white border mt-10 py-20 px-3 sm:px-10 rounded-md flex flex-wrap items-start border-stroke-10">
      <h1 className="text-[17px] font-medium text-black-3 mb-10 ">
        Change Password
      </h1>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
        }}
        onSubmit={(values) => {
          updatePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            id: userId!,
          });
        }}
      >
        <Form className="w-full">
          <div className="w-full md:w-[60%]">
            <div className="w-full md:w-[80%]">
              <div className="mt-6">
                <Field
                  password
                  label="Current Password"
                  classname="w-full"
                  name="currentPassword"
                  placeholder=""
                />
              </div>
              <div className="mt-6">
                <Field
                  password
                  label="New Password"
                  classname="w-full"
                  name="newPassword"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          {/* <div className="mt-10 md:mt-2 w-full md:w-[40%] my-10 md:my-0">
            <h1 className="text-[17px] font-medium text-black-3">
              Two-factor Authentication
            </h1>
            <div className="mt-4">
              <SwitchComponent
                color="#181818"
                size="md"
                label={
                  <p className="ml-4">
                    Enable or disable two factor authentication
                  </p>
                }
              />
            </div>
          </div> */}
          <UnstyledButton
            type="submit"
            disabled={isLoading}
            class="text-[0.88rem] disabled:opacity-50 flex justify-center w-[7rem] font-medium mt-8 bg-black-2 text-white px-4 py-2 rounded-md "
          >
            {isLoading ? (
              <div className="w-[1rem] py-1">
                <Spinner />
              </div>
            ) : (
              <p>Update</p>
            )}
          </UnstyledButton>
        </Form>
      </Formik>
    </div>
  );
};

export default SecuritySettings;
