import React, { useEffect } from "react";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import ChatRoom from "../ChatRoom";
import HamburgerIcon from "/public/assets/chats/hamburger.svg";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import RequestExtension from "../ModalComponents/RequestExtension";
import ReportAnIssue from "../ModalComponents/ReportAnIssue";
import { useRouter } from "next/navigation";
import UserChatMenu from "../Menu/UserChatMenu";
import {
  useLazyFetchChatMessagesQuery,
  useLazyFetchSingleConversationDataQuery,
} from "@/lib/features/users/dashboard/chat/chat";
import Logo from "/public/assets/nav/logo.svg";
import Spinner from "@/app/Spinner/Spinner";
import { IGetUserConversations } from "@/interfaces/dashboard/chat";

type Props = {
  open: () => void;
  opened: boolean;
  admin?: boolean;
  orderId?: string | null;
  isFetching?: boolean;
  data?: IGetUserConversations;
  type: "user" | "consultant";
};

const CustomerChatMiddle = (props: Props) => {
  const router = useRouter();

  const [fetchUserChatMessages, {}] = useLazyFetchChatMessagesQuery();

  useEffect(() => {
    if (props.data) {
      fetchUserChatMessages(props.data.orderId);
    }
  }, [props.data]);


  return (
    <div className=" bg-white border-r relative border-r-stroke-8 border-l border-l-stroke-8  h-full">
      {!props.orderId ? (
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
          <Image src={Logo} alt="logo image" className="w-[10rem] opacity-50" />
          <p className="text-center font-semibold text-gray-4">
            Please select a conversation
          </p>
        </div>
      ) : (
        <div className="">
          {props.isFetching ? (
            <div className="w-[5rem] absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
              <Spinner dark />
            </div>
          ) : (
            <>
              <header className="flex items-center py-[1.4rem] px-2 sm:px-6 border-b border-b-stroke-8">
                <div
                  className="block chatbp:hidden"
                  onClick={() => router.back()}
                >
                  <IoIosArrowBack className="text-2xl mr-2" />
                </div>
                <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                  <Image src={AdminProfileImg} alt="admin-alt-profile" />
                </div>
                <div className="">
                  <h1 className="font-semibold text-[1.25rem]">
                    {props.data?.chat_title}
                  </h1>
                  <p className="text-[#00000082] text-[0.75rem] font-semibold">
                    {props.data?.nameofservice}
                  </p>
                </div>
                <div className="flex items-center ml-auto">
                  <MenuComponent
                    target={
                      <div className="">
                        <UnstyledButton class="px-4 py-2 rounded-md items-center bg-black-3 hover:bg-blue-1  text-white flex">
                          <p className="mr-1 font-medium text-[0.88rem]">
                            Actions
                          </p>
                          <IoIosArrowDown />
                        </UnstyledButton>
                      </div>
                    }
                  >
                    {props.admin ? (
                      <div className="">
                        <ul className="px-1 text-gray-6 text-[0.88rem]">
                          <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                            Re-open chat
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <UserChatMenu />
                    )}
                  </MenuComponent>
                  <div className="hidden lg:block">
                    {props.opened ? (
                      <div
                        onClick={props.open}
                        className=" hover:bg-stroke-4 transition-all ml-6 rounded-md cursor-pointer"
                      >
                        <Image src={HamburgerIcon} alt="hamburger-icons" />
                      </div>
                    ) : null}
                  </div>
                  <div
                    onClick={props.open}
                    className="block lg:hidden hover:bg-stroke-4 transition-all ml-6 rounded-md cursor-pointer"
                  >
                    <Image src={HamburgerIcon} alt="hamburger-icons" />
                  </div>
                </div>
              </header>
              <div className="h-full">
                {props.data && (
                  <ChatRoom orderId={props.data.orderId} type={props.type} />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerChatMiddle;
