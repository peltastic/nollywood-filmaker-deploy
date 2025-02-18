import React, { useEffect } from "react";
import Link from "next/link";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { downloadCSV } from "@/utils/helperFunction";
import { useLazyExportChatQuery } from "@/lib/features/export";
import moment from "moment";

type Props = {
  type: "user" | "consultant" | "admin";
  openExtension: () => void;
  openReportIssue: () => void;
  isTime?: boolean;
  chat_title?: string;
  orderId?: string;
};

const UserChatMenu = (props: Props) => {
  const [exportChat, result] = useLazyExportChatQuery();

  const exportChatHandler = async () => {
    const now = new Date();
    if (props.orderId && props.chat_title) {
      nprogress.start();
      try {
        const blob = await exportChat(props.orderId).unwrap();

        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${props.chat_title}-${moment(now).format(
          "YYYY-MM-DD"
        )}.pdf`; // Default filename
        document.body.appendChild(a);
        a.click();
        nprogress.complete();
        document.body.removeChild(a);

        // Clean up
        window.URL.revokeObjectURL(url);
      } catch (error) {
        nprogress.complete();
        notify("error", "", "Error exporting chat");
      }
    }
  };

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
          {props.chat_title && props.orderId && props.type === "consultant" && (
            <UnstyledButton
              disabled={result.isFetching}
              clicked={exportChatHandler}
            >
              <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                Export conversation
              </li>
            </UnstyledButton>
          )}
          {props.type === "user" && (
            <li
              onClick={props.openReportIssue}
              className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md"
            >
              Make a report
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default UserChatMenu;
