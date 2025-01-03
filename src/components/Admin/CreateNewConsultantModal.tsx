import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import Field from "../Field/Field";
import Expertise from "../Expertise/Expertise";
import UnstyledButton from "../Button/UnstyledButton";
import { createConsultantSchema } from "@/utils/validation/consultant";
import {
  useCreateConsultantMutation,
  useEditConsultantMutation,
} from "@/lib/features/admin/consultants/consultants";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  edit?: boolean;
  refresh?: () => void;
  id?: string;
  data?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    state: string;
    country: string;
    expertise: string[];
  };
};

const CreateNewConsultantModal = (props: Props) => {
  const [createConsultant, { isLoading, isError, error, isSuccess }] =
    useCreateConsultantMutation();
  const [editConsultant, result] = useEditConsultantMutation();
  const [expertiseData, setExpertiseData] = useState<string[]>(
    props.data?.expertise || []
  );
  const setExpertiseHandler = (value: string, type: "add" | "remove") => {
    const data = [...expertiseData];
    if (type === "add") {
      data.push(value);
    } else {
      const index = expertiseData.indexOf(value);
      data.splice(index, 1);
    }
    setExpertiseData(data);
  };
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occured");
    }

    if (isSuccess) {
      nprogress.complete();
      notify(
        "success",
        "Consultant created successfully",
        "An email has been sent to the consultant to create their password"
      );
      props.close();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (result.error as any).data?.message || "An Error Occured"
      );
    }
    if (result.isSuccess) {
      nprogress.complete();
      notify(
        "success",
        "Successful",
        "Consultant data has been updated"
      );
      props.refresh && props.refresh();
      props.close();
    }
  }, [result.isError, result.isSuccess]);
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
          first_name: props.data?.first_name || "",
          last_name: props.data?.last_name || "",
          email: props.data?.email || "",
          phone: props.data?.phone || "",
          state: props.data?.state || "",
          country: props.data?.country || "",
        }}
        onSubmit={({ first_name, country, email, last_name, phone, state }) => {
          nprogress.start();
          const payload = {
            country,
            email,
            expertise: expertiseData,
            fname: first_name,
            lname: last_name,
            phone,
            state,
          };
          if (props.edit && props.id) {
            editConsultant({ body: payload, id: props.id });
          } else {
            createConsultant(payload);
          }
        }}
        validationSchema={createConsultantSchema}
      >
        {({ isValid }) => (
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
                  label="Phone"
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
              <Expertise
                setExpertise={setExpertiseHandler}
                data={expertiseData}
                small
                maximum
              />
            </div>
            <div className="  w-full flex flex-wrap mt-[5rem]">
              <UnstyledButton
                clicked={props.close}
                class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
              >
                Cancel
              </UnstyledButton>
              <UnstyledButton
                disabled={!isValid || isLoading || !result.isLoading || expertiseData.length < 1}
                class="flex py-2 px-4 transition-all rounded-md w-full xs:w-[8rem] justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem]"
              >
                {isLoading || result.isLoading ? (
                  <div className="py-1 w-[1rem]">
                    <Spinner />
                  </div>
                ) : (
                  <p>{props.edit ? "Edit" : "Create"}</p>
                )}
              </UnstyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateNewConsultantModal;
