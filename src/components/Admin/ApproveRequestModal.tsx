import { useApproveWithdrawalMutation } from "@/lib/features/admin/dashboard/withdrawals";
import Image from "next/image";
import React, { useEffect } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { numberWithCommas } from "@/utils/helperFunction";
import UnstyledButton from "../Button/UnstyledButton";
import { nprogress } from "@mantine/nprogress";
import Spinner from "@/app/Spinner/Spinner";
import { notify } from "@/utils/notification";

type Props = {
  id: string;
  close: () => void;
  consultant: string;
  amount: string;
  refetch: () => void;
};

const ApproveRequestModal = (props: Props) => {
  const [approveWithdrawal, { isLoading, isError, isSuccess, error }] =
    useApproveWithdrawalMutation();
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }

    if (isSuccess) {
      notify("success", "Withdrawal request approved successfully");
      nprogress.complete();
      props.refetch();
      props.close();
    }
  }, [isError, isSuccess]);

  return (
    <section className="py-6 px-2">
      <div className="flex items-center">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Approve Withdrawal Request
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <p className="my-10 text-[1.13rem] text-black-2">
        Are you sure you want to approve
        <span className="font-bold"> {props.consultant}</span> withdrawal
        request of{" "}
        <span className="font-bold">
          {" "}
          ₦{numberWithCommas(Number(props.amount))}
        </span>{" "}
        ?
      </p>
      <div className="w-full flex font-medium text-[0.88rem]  flex-wrap mt-[3rem]">
        <UnstyledButton
          type="button"
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={isLoading}
          type="submit"
          clicked={() => {
            nprogress.start();
            approveWithdrawal({
              orderId: props.id,
            });
          }}
          class="flex py-2 px-4 w-[6rem] transition-all rounded-md  justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem]"
        >
          {/* <p>{paymentDetails ? "Connect" : "Proceed"}</p> */}
          {isLoading ? (
            <div className="w-[1rem] py-1">
              <Spinner />
            </div>
          ) : (
            <p>Approve</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default ApproveRequestModal;
