import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import { MdInfoOutline } from "react-icons/md";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CaptionSelect from "@/components/Select/CaptionSelect";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import { useRequestExtensionMutation } from "@/lib/features/users/dashboard/chat/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useServicePayment } from "@/hooks/useServicePayment";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import Spinner from "@/app/Spinner/Spinner";
import { initializeTransactionListener } from "@/lib/socket";

type Props = {
  close: () => void;
  orderId: string;
  setAuthUrl: (val: string) => void;
  setTransRef: (val: string) => void;
  setExtensionValue: (val: string) => void;
  setPaymentStatus: (val: "initialized" | "pending" | "completed") => void;
};

const extension_data = [
  {
    value: "30",
    label: "30 minutes",
    caption: "₦25,000",
  },
  {
    value: "45",
    label: "45 minutes",
    caption: "₦35,000",
  },
  {
    value: "60",
    label: "1 hour",
    caption: "₦50,000",
  },
];

const RequestExtension = (props: Props) => {
  const [extensionValue, setExtensionvalue] = useState<string>("");
  const [requestExtension, { data, isError, isLoading, isSuccess, error }] =
    useRequestExtensionMutation();
  const [showPaymentWindow, setShowPaymentWindow] = useState<boolean>(false);
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occured");
    }

    if (isSuccess) {
      console.log("success")
      props.setAuthUrl(data.result.authorization_url);
      props.setTransRef(data.result.transaction.reference);
      props.setPaymentStatus("pending");
      initializeTransactionListener(userId!);
      nprogress.start();
      props.close();
    }
  }, [isError, isSuccess, isLoading]);

  return (
    <>
      <section className="px-3 sm:px-6">
        <div className="flex">
          <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
            {showPaymentWindow ? "Payment" : "Request an extension"}
          </h1>
          <div
            onClick={props.close}
            className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
          >
            <Image src={CancelImg} alt="cancel-img" />
          </div>
        </div>
        <section>
          <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
            <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
            <div className="text-black-7 text-[0.88rem]">
              <p>• Choose your preferred extension length</p>
              <p>• Proceed to payment</p>
              <p>• Resume your conversation</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-black-3 text-[0.88rem]">
              Choose extension length
            </h2>
            <div className="w-full relative mt-3">
              <CaptionSelect
                changed={(e) => {
                  props.setExtensionValue(e);
                  setExtensionvalue(e);
                }}
                data={extension_data}
              />
            </div>
            {/* <RadixSelect changed={() => {}} data={extension_data} /> */}
            <div className="w-full flex flex-wrap mt-[10rem]">
              <UnstyledButton
                clicked={props.close}
                class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
                >
                Cancel
              </UnstyledButton>
              <UnstyledButton
                disabled={isLoading || !extensionValue}
                clicked={() => {
                  if (userId) {
                    requestExtension({
                      length: Number(extensionValue),
                      orderId: props.orderId,
                      title: "Extension Purchase",
                      type: "time_extension",
                      userId,
                    });
                  }
                }}
                class="flex py-2 px-4 w-full xs:w-[12rem] transition-all rounded-md  justify-center items-center text-white border border-black-3  bg-black-3 disabled:opacity-50 text-[0.88rem] "
              >
                {isLoading ? (
                  <div className="py-1 w-[1rem]">
                    <Spinner />
                  </div>
                ) : (
                  <p>Proceed To Payment</p>
                )}
              </UnstyledButton>
            </div>
          </div>
        </section>
        {/* )} */}
      </section>
    </>
  );
};

export default RequestExtension;
