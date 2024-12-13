import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import RequestExtension from "../ModalComponents/RequestExtension";
import ReportAnIssue from "../ModalComponents/ReportAnIssue";
import Link from "next/link";

type Props = {
  type: "user" | "consultant" | "admin";
  openExtension: () => void
  openReportIssue: () => void
};

const UserChatMenu = (props: Props) => {
  return (
    <>

      <div className="bg-white ">
        <ul className="px-1 text-gray-6 text-[0.88rem]">
          {props.type === "user" && (
            <li
              onClick={props.openExtension}
              className="py-2 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
            >
              Request an extension
            </li>
          )}
          <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
            <Link href={"/user/dashboard/order-details/1"}>
              Export conversation
            </Link>
          </li>
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
