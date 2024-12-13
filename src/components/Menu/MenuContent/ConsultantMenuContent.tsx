import UnstyledButton from "@/components/Button/UnstyledButton";
import ResolveRequestModal from "@/components/Consultants/ResolveRequestModal";
import ModalComponent from "@/components/Modal/Modal";
import {
  useAcceptRequestMutation,
  useDeclineRequestMutation,
} from "@/lib/features/consultants/dashboard/request";
import { notify } from "@/utils/notification";
import { useDisclosure } from "@mantine/hooks";
import { nprogress } from "@mantine/nprogress";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  orderId?: string;
  chatId?: string;
  status?: "pending" | "ongoing" | "ready" | "completed" | string;
  consultantId?: string;
  isChat?: boolean;
  open: () => void;
  openSetAsCompleted: () => void;
};

const ConsultantMenuContent = (props: Props) => {
  const [acceptRequest, { isLoading, isSuccess, isError, data, error }] =
    useAcceptRequestMutation();

  const [declineRequest, result] = useDeclineRequestMutation();
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any)?.data.message || "An error occured");
    }
    if (isSuccess) {
      nprogress.complete();
      notify("success", "Successful", "Customer request accepted successfully");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify("error", "", (error as any)?.data.message || "An error occured");
    }
    if (result.isSuccess) {
      nprogress.complete();
      notify("success", "Successful", "Customer request declined successfully");
    }
  }, [result.isError, result.isSuccess]);
  return (
    <>
      <div className="bg-white ">
        {props.status === "pending" ? (
          <>
            <ul className="px-1 text-gray-6 text-[0.88rem]">
              <li>
                <UnstyledButton
                  disabled={isLoading}
                  clicked={() => {
                    if (props.consultantId && props.orderId) {
                      nprogress.start();
                      acceptRequest({
                        consultant_id: props.consultantId,
                        order_id: props.orderId,
                      });
                    }
                  }}
                  class="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                >
                  Accept
                </UnstyledButton>
              </li>
              <li>
                <UnstyledButton
                  disabled={result.isLoading}
                  clicked={() => {
                    if (props.consultantId && props.orderId) {
                      nprogress.start();
                      declineRequest({
                        consultant_id: props.consultantId,
                        order_id: props.orderId,
                      });
                    }
                  }}
                  class="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                >
                  Reject
                </UnstyledButton>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="px-1 text-gray-6 text-[0.88rem]">
              {props.status === "ongoing" && !props.isChat && (
                <li
                  onClick={props.open}
                  className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                >
                  Resolve service request
                </li>
              )}
              {(props.isChat || props.status === "ready") && (
                <Link
                  href={`/consultants/dashboard/chats?chat=${props.orderId}`}
                >
                  <li className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4">
                    Go to chat
                  </li>
                </Link>
              )}
              {props.status === "ongoing" && props.isChat && (
                <li
                  onClick={props.openSetAsCompleted}
                  className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                >
                  Set service as complete
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default ConsultantMenuContent;
