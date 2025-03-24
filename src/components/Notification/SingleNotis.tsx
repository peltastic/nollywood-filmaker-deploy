import { ISingleNotification } from "@/lib/features/users/notifications/notifications";
import React from "react";
import UnstyledButton from "../Button/UnstyledButton";
import GenerateDarkServiceLogo from "../Generate/GenerateDarkServiceLogo";
import { generateColorClass } from "@/utils/helperFunction";
import moment from "moment";
import { useRouter } from "next/navigation";

type Props = {
  data: ISingleNotification;
};

const SingleNotis = (props: Props) => {
  const router = useRouter();
  const link =
    props.data.type === "Chat"
      ? `/user/dashboard/chats?chat=${props.data.relatedId}`
      : props.data.type === "Reply"
      ? `/user/dashboard/issues/details/${props.data.relatedId}`
      : `/user/dashboard/order-details/${props.data.relatedId}`;
  return (
    <div className="mb-6 flex flex-wrap xl:flex-nowrap items-center border-b pb-6 pt-8">
      <div className="w-full xl:w-auto mb-4 xl:mb-0">
        <div
          className={`${generateColorClass(
            "Chat With A Professional"
          )} h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4`}
        >
          <GenerateDarkServiceLogo service="Chat With A Professional" />
        </div>
      </div>
      <div className="mr-auto mb-6 w-full xl:w-auto">
        <p className="font-medium text-[0.88rem] mb-2 xl:mb-0">
          {props.data.title}
        </p>
        <p className="text-black-2 mb-2 xl:mb-0">{props.data.message}</p>
        <p className="text-[0.88rem]">
          {moment(props.data.createdAt).fromNow()}
        </p>
      </div>
      <div className="">
        <UnstyledButton
          clicked={() => router.push(link)}
          class="bg-black-2 text-white  py-1 px-4 transition-all hover:bg-blue-1 rounded-md text-[0.88rem]"
        >
          View
        </UnstyledButton>
      </div>
    </div>
  );
};

export default SingleNotis;
