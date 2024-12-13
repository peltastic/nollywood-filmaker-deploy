import { useSetChatAsCompleteMutation } from "@/lib/features/consultants/dashboard/request";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import UnstyledButton from "../Button/UnstyledButton";
import { nprogress } from "@mantine/nprogress";
import Spinner from "@/app/Spinner/Spinner";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  orderId: string;
};

const SetAsCompletedModal = (props: Props) => {
  const [setAsCompleted, { isLoading, isError, isSuccess, error }] =
    useSetChatAsCompleteMutation();
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      notify(
        "success",
        "Successful",
        "Service set to completed"
      );
      nprogress.complete();
      props.close();
    }
  }, [isError, isSuccess]);
  return (
    <div className=" py-8 px-8">
      <FaCheckCircle className="text-[3rem] text-[#8fcb95] mb-4" />
      <h1 className="font-semibold text-black-2 text-2xl">
        Set service as completed
      </h1>
      <p>Are you sure you want to set this service as completed?</p>
      <div className="w-full flex flex-wrap mt-[2rem]">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-1 rounded-md px-3 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          No, cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={isLoading}
          clicked={() => {
            nprogress.start();
            setAsCompleted(props.orderId);
          }}
          class="w-[8rem] flex py-1 px-3 disabled:opacity-50 transition-all rounded-md justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 text-[0.88rem] disabled:bg-black-2"
        >
          {isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Yes, Set</p>
          )}
        </UnstyledButton>
      </div>
    </div>
  );
};

export default SetAsCompletedModal;
