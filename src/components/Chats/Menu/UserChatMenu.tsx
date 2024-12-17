import React, { useEffect } from "react";
import Link from "next/link";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { downloadCSV } from "@/utils/helperFunction";
import { useLazyExportConsultantChatQuery } from "@/lib/features/consultants/dashboard/chat/chat";
import { useLazyExportUserChatQuery } from "@/lib/features/users/dashboard/chat/chat";

type Props = {
  type: "user" | "consultant" | "admin";
  openExtension: () => void;
  openReportIssue: () => void;
  isTime?: boolean;
  chat_title?: string;
  orderId?: string;
};

const UserChatMenu = (props: Props) => {
  const [
    exportUserChat,
    { isError, isFetching, isLoading, isSuccess, error, data },
  ] = useLazyExportUserChatQuery();
  const [exportConsultantChat, result] = useLazyExportConsultantChatQuery();

  const exportChatHandler = () => {
    if (props.orderId) {
      nprogress.start();
      if (props.type === "user") {
        exportUserChat(props.orderId);
      } else if (props.type === "consultant") {
        exportConsultantChat(props.orderId);
      }
    }
  };

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any)?.data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      downloadCSV(data, props.chat_title);
      nprogress.complete();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify("error", "", (result.error as any)?.data?.message || "An Error Occcured");
    }

    if (result.isSuccess) {
      downloadCSV(result.data, props.chat_title);
      nprogress.complete();
    }
  }, [result.isError, result.isSuccess]);

  return (
    <>
      <div className="bg-white ">
        <ul className="px-1 text-gray-6 text-[0.88rem]">
          {props.type === "user" && props.isTime && (
            <li
              onClick={props.openExtension}
              className="py-2 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
            >
              Request an extension
            </li>
          )}
          {props.chat_title && props.orderId && (
            <UnstyledButton disabled={isFetching} clicked={exportChatHandler}>
              <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                Export conversation
              </li>
            </UnstyledButton>
          )}
          <li
            onClick={props.openReportIssue}
            className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md"
          >
            Make a report
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserChatMenu;
