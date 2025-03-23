import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Field from "../Field/Field";
import TextArea from "../TextArea/TextArea";
import UnstyledButton from "../Button/UnstyledButton";
import { usePostContactResponseMutation } from "@/lib/features/admin/contact-us/contact-us";
import { contactUsReply } from "@/utils/validation/contact-us";
import Spinner from "@/app/Spinner/Spinner";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const ContactUSResponseForm = (props: Props) => {
  const router = useRouter();
  const [sendReply, { isError, isLoading, isSuccess, error }] =
    usePostContactResponseMutation();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notify("success", "Reply sent successfully");
      router.push("/admin/dashboard/contact-us");
    }
  }, [isError, isSuccess]);
  return (
    <Formik
      initialValues={{
        subject: "",
      }}
      onSubmit={({ subject }) => {
        sendReply({
          id: props.id,
          replyMessage: message,
          subject,
        });
      }}
      validationSchema={contactUsReply}
    >
      {({ isValid }) => (
        <Form>
          <h1 className="my-[3rem] text-2xl font-medium">Send Reply</h1>
          <div className="">
            <Field
              classname="w-full"
              label="Subject"
              placeholder=""
              name="subject"
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
          <UnstyledButton
            disabled={!isValid || !message || isLoading}
            class="bg-black-2 w-[9rem] text-white mt-8 py-2 disabled:opacity-50 transition-all hover:bg-blue-1 px-6 flex justify-center rounded-lg text-[0.88rem]"
          >
            {isLoading ? (
              <div className="w-[1rem] py-1">
                <Spinner />
              </div>
            ) : (
              <>
                <p className="text-[0.88rem]">Send reply</p>
              </>
            )}
          </UnstyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUSResponseForm;
