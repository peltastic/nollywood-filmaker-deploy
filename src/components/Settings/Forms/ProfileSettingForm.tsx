import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Expertise from "@/components/Expertise/Expertise";
import Field from "@/components/Field/Field";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import { IConsultantProfileResponse } from "@/interfaces/consultants/profile/profile";
import { IGetUserProfileResponse } from "@/interfaces/profile/profile";
import { useUpdateConsultantProfileMutation } from "@/lib/features/consultants/profile/profile";
import { useUpdateUserProfileMutation } from "@/lib/features/users/profile/profile";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { updateProfileSchema } from "@/utils/validation/profile";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  data: IGetUserProfileResponse | IConsultantProfileResponse;
  settingsType?: "consultant" | "admin";
};

const ProfileSettingForm = (props: Props) => {
  const [updateProfile, { isError, isSuccess, data, isLoading, error }] =
    useUpdateUserProfileMutation();
  const [updateConsultantProfile, result] =
    useUpdateConsultantProfileMutation();

  const [nonInputValues, setNonInputValues] = useState<{
    expertise: string[];
  }>({
    expertise: props.data.expertise,
  });
  const [bio, setBio] = useState<string>(props.data.bio || "");
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );

  const [showNoExpertiseErrMessage, setSetNoExpertiseErrMessage] =
    useState<boolean>(false);

  const setExpertiseHandler = (value: string, type: "add" | "remove") => {
    if (showNoExpertiseErrMessage) {
      setSetNoExpertiseErrMessage(false);
    }
    const data = [...nonInputValues.expertise];
    if (type === "add") {
      data.push(value);
    } else {
      const index = nonInputValues.expertise.indexOf(value);
      data.splice(index, 1);
    }
    setNonInputValues({
      ...nonInputValues,
      expertise: data,
    });
  };

  useEffect(() => {
    if (isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notify("success", "Successful", "Profile Updated Successfully!");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (result.isError) {
      notify("error", (result.error as any).data?.message || "An Error Occured");
    }
    if (result.isSuccess) {
      notify("success", "Successful", "Profile Updated Successfully!");
    }
  },[result.isError, result.isSuccess]);

  return (
    <Formik
      initialValues={{
        first_name: props.data.fname,
        last_name: props.data.lname,
        email: props.data.email,
        phone: props.data.phone || "",
        website: props.data.website || "",
        postal_code: props.data.location?.postalcode || "",
        city: props.data.location?.city || "",
        state: props.data.location?.state || "",
        country: props.data.location?.city || "",
      }}
      onSubmit={(values) => {
        if (nonInputValues.expertise.length === 0) {
          return setSetNoExpertiseErrMessage(true);
        }

        const paylaod = {
          fname: values.first_name,
          email: values.email,
          expertise: nonInputValues.expertise,
          lname: values.last_name,
          location: {
            city: values.city,
            country: values.country,
            postalcode: values.postal_code,
            state: values.state,
          },
          bio,
          phone: values.phone,
          website: values.website,
        };
        if (props.settingsType === "consultant") {
          if (consultantId) {
            updateConsultantProfile({
              body: paylaod,
              id: consultantId,
            });
          }
        } else {
          if (userId) {
            updateProfile({
              body: paylaod,
              id: userId,
            });
          }
        }
      }}
      validationSchema={updateProfileSchema}
    >
      <Form>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">First & Last Name</h1>
          </div>
          <div className="w-full md:w-[65%] grid  md:grid-cols-2 gap-x-4">
            <Field
              classname="w-full font-semibold placeholder:font-normal mb-4 md:mb-0"
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
        <div className="flex flex-wrap items-center mt-8">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">Email Address</h1>
          </div>
          <div className="w-full md:w-[65%] ">
            <Field
              disabled
              classname="w-full font-semibold placeholder:font-normal"
              label=""
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center mt-8">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">Phone</h1>
          </div>
          <div className="w-full md:w-[65%] ">
            <Field
              classname="w-full font-semibold placeholder:font-normal"
              label=""
              name="phone"
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">Write Your Bio</h1>
          </div>
          <div className="w-full md:w-[65%] ">
            <TextArea
              placeholder="Write about you"
              className="resize-none py-4 px-4 h-[10rem]"
              changed={(e) => setBio(e)}
              value={bio}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center  mt-8">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">Website</h1>
          </div>
          <div className="w-full md:w-[65%] flex">
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
        <div className="flex flex-wrap  mt-8">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">Expertise</h1>
          </div>
          <div className="w-full md:w-[65%]">
            <Expertise
              data={nonInputValues.expertise}
              small
              setExpertise={setExpertiseHandler}
            />
            {showNoExpertiseErrMessage && (
              <p className="text-val-error-red text-xs mt-2">
                Please select at least an expertise
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap  mt-8">
          <div className="w-full md:w-[35%] mb-4 md:mb-0">
            <h1 className="font-semibold">Location</h1>
          </div>
          <div className="w-full md:w-[65%] grid  md:grid-cols-2 gap-4">
            <Field
              label=""
              classname="w-full"
              name="country"
              placeholder="Country"
            />
            <Field
              label=""
              classname="w-full"
              name="state"
              placeholder="State"
            />

            <Field label="" classname="w-full" name="city" placeholder="City" />

            <Field
              label=""
              classname="w-full"
              name="postal_code"
              placeholder="Postal Code"
            />
          </div>
        </div>
        <UnstyledButton
          disabled={isLoading || result.isLoading}
          class="text-[0.88rem] disabled:opacity-50 flex w-[7rem] justify-center font-medium mt-8 bg-black-2 text-white px-4 py-2 rounded-md "
        >
          {isLoading || result.isLoading ? (
            <div className="w-[1rem] py-1">
              <Spinner />
            </div>
          ) : (
            <p>Update</p>
          )}
        </UnstyledButton>
      </Form>
    </Formik>
  );
};

export default ProfileSettingForm;
