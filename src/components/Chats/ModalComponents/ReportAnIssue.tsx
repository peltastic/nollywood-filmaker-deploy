import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import InputComponent from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useReportAnIssueAsCustomerMutation } from "@/lib/features/users/dashboard/chat/chat";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import Spinner from "@/app/Spinner/Spinner";

type Props = {
  close: () => void;
  orderId: string;
  userId: string;
  cid: string;
};

const ReportAnIssue = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [complain, setCmplain] = useState<string>("");
  const [reportIssue, { isLoading, isError, isSuccess, error }] =
    useReportAnIssueAsCustomerMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occured");
    }

    if (isSuccess) {
      nprogress.complete();
      notify("success", "Success", "Issue sent succesfully");
      props.close();
    }
  }, [isError, isSuccess]);
  return (
    <section className="px-3 xs:px-6 py-6">
      <div className="flex">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Report an issue
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="my-6">
        <InputComponent
          label="What is the issue?"
          placeholder="Text"
          changed={(val) => setTitle(val)}
          value={title}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-3 px-3"
          type="text"
        />
        <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setCmplain(val)}
            value={complain}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Tell us more about the problem you mentioned"
          />
        </div>
      </div>
      <div className="w-full flex mt-[2rem]">
        <UnstyledButton
          disabled={!title || !complain || isLoading}
          clicked={() => {
            nprogress.start();
            reportIssue({
              cid: props.cid,
              complain,
              orderId: props.orderId,
              title,
              uid: props.userId,
            });
          }}
          class="flex py-2 w-[10rem] justify-center px-4 ml-auto transition-all rounded-md items-center text-white  bg-black-3 disabled:opacity-50 text-[0.88rem] "
        >
          {isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Submit my report</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default ReportAnIssue;
