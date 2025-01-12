import React, { useEffect, useState } from "react";
import TestImage from "/public/assets/test-avatar-big.png";
import HamburgerIcon from "/public/assets/chats/hamburger.svg";
import Image from "next/image";
import FileImg from "/public/assets/dashboard/file.svg";
import DownloadImg from "/public/assets/chats/download-icon.svg";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import ChatTimer from "../ChatTimer";
import { IGetUserConversations } from "@/interfaces/dashboard/chat";
import { IChatFiles } from "@/interfaces/chat/chat";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { AspectRatio } from "@mantine/core";
import { useLazyGetCustomerRequestDetailQuery } from "@/lib/features/consultants/dashboard/request";
import { truncateStr } from "@/utils/helperFunction";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import UserChatMenu from "../Menu/UserChatMenu";
import { useDisclosure } from "@mantine/hooks";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import RequestExtension from "../ModalComponents/RequestExtension";
import ModalComponent from "@/components/Modal/Modal";
import ReportAnIssue from "../ModalComponents/ReportAnIssue";
type Props = {
  close: () => void;
  opened?: string;
  closeRight?: boolean;
  data?: IGetUserConversations;
  openRight?: () => void;
  type?: "user" | "consultant" | "admin";
  isTime: boolean;
  sessionOver: boolean;
  orderId?: string;
  isLoading?: boolean;
  res?: IChatFiles[];
  userProfilePic?: string;
  admin?: string;
};

export interface IFilesData {
  name: string;
  file_type: string;
  size: string;
}

const reviewed_request_file_data: IFilesData[] = [
  {
    name: "Screenshot-3817.png",
    file_type: "PNG",
    size: "4mb",
  },
  {
    name: "sharefile.docx",
    file_type: "DOC",
    size: "555kb",
  },
  {
    name: "Jerry-2020_I-9_Form.xxl",
    file_type: "XXL",
    size: "24mb",
  },
];

const CustomerChatRight = ({
  close,
  isTime,
  sessionOver,
  closeRight,
  data,
  openRight,
  opened,
  orderId,
  type,
  isLoading,
  res,
  userProfilePic,
  admin,
}: Props) => {
  const userData = useSelector(
    (state: RootState) => state.persistedState.user.user
  );

  const [chatFiles, setChatFiles] = useState<IChatFiles[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<
  "initialized" | "pending" | "completed"
>("initialized");
  const [getCustomerReqDetails, result] =
    useLazyGetCustomerRequestDetailQuery();

  useEffect(() => {
    if (res) {
      setChatFiles(res);
    }
  }, [res]);

  useEffect(() => {
    if (orderId) {
      getCustomerReqDetails(orderId);
    }
  }, [orderId]);
  const [extensionOpened, extensionOpenedFuncs] = useDisclosure();
  const [reportModOpened, funcs] = useDisclosure();
  const [extensionAuthUrl, setExtensionAuthUrl] = useState("");
  const [transOpened, transFunc] = useDisclosure();
  const [extentionValue, setExtensionValue] = useState<string>("");
  const [transref, setTransRef] = useState<string>("");

  return (
    <>
      {transOpened ? (
        <InitializingTransactionModal
          paymentUrl={extensionAuthUrl}
          status={paymentStatus}
        />
      ) : null}

      <ModalComponent
        onClose={extensionOpenedFuncs.close}
        opened={extensionOpened}
        centered
        withCloseButton={false}
        size="xl"
      >
        {orderId && (
          <RequestExtension
            setExtensionValue={(val) => setExtensionValue(val)}
            setTransRef={(val) => setTransRef(val)}
            close={extensionOpenedFuncs.close}
            orderId={orderId}
            setAuthUrl={(val) => setExtensionAuthUrl(val)}
            setPaymentStatus={(val) => setPaymentStatus(val)}
          />
        )}
      </ModalComponent>
      <ModalComponent
        onClose={funcs.close}
        opened={reportModOpened}
        centered
        withCloseButton={false}
        size="xl"
      >
        {data && (
          <ReportAnIssue
            cid={data.consultantId}
            orderId={data.orderId}
            userId={data.userId}
            close={funcs.close}
          />
        )}
      </ModalComponent>
      <div
        className={`border-l ${
          closeRight ? "hidden" : null
        }  border-l-stroke-8 h-full`}
      >
        <header className="w-full font-semibold flex items-center px-6 py-8  border-b border-b-stroke-8">
          <h1 className=" text-[1.25rem] mr-auto">Directory</h1>
          {(isTime || sessionOver) && (
            <MenuComponent
              target={
                <div className="block  md:hidden mr-4">
                  <UnstyledButton class="px-4 py-2 rounded-md items-center bg-black-3 hover:bg-blue-1  text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              {admin ? (
                <div className="">
                  <ul className="px-1 text-gray-6 text-[0.88rem]">
                    <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                      Re-open chat
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  {type && (
                    <UserChatMenu
                      isTime={isTime}
                      openExtension={extensionOpenedFuncs.open}
                      openReportIssue={funcs.open}
                      type={type}
                      chat_title={data?.chat_title}
                      orderId={orderId}
                    />
                  )}
                </>
              )}
            </MenuComponent>
          )}
          <div
            onClick={close}
            className=" hover:bg-stroke-4 transition-all rounded-md cursor-pointer"
          >
            <Image src={HamburgerIcon} alt="hamburger-icons" />
          </div>
        </header>
        <section>
          {data && isTime && (
            <ChatTimer
              timeData={{
                startTime: data.startTime,
                endTime: data.endTime,
              }}
              isTime={isTime}
              opened={!closeRight}
              sessionOver={sessionOver}
              openRight={openRight}
              type={type}
            />
          )}
        </section>
        {type === "user" && (
          <section className="py-6 px-4 border-b border-b-stroke-8">
            <div className="flex items-center mb-2">
              <h1 className=" text-[0.88rem] font-semibold mr-2">
                In this chat
              </h1>
              <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
                <p className="text-[0.75rem] font-semibold">2</p>
              </div>
            </div>
            <div className="flex items-center py-4 px-2">
              {userData?.profilepics && (
                <div className="w-[2.5rem] h-[2.5rem] mr-3 ">
                  <AspectRatio ratio={1800 / 1800}>
                    <Image
                      src={userData.profilepics}
                      alt="test-image"
                      className="w-full h-full rounded-full"
                      width={100}
                      height={100}
                    />
                  </AspectRatio>
                </div>
              )}
              <div className="">
                <h1 className="font-semibold text-[0.88remrem]">
                  {userData?.fname} {userData?.lname}
                </h1>
                <p className="text-[#00000066] text-[0.75rem] font-semibold">
                  You
                </p>
              </div>
            </div>
            <div className="flex items-center py-4 px-2">
              <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
                <Image src={AdminProfileImg} alt="admin-alt-profile" />
              </div>
              <div className="">
                <h1 className="font-semibold text-[0.88remrem]">
                  Nollywood Filmaker
                </h1>
                <p className="text-[#00000066] text-[0.75rem] font-semibold">
                  Admin
                </p>
              </div>
            </div>
          </section>
        )}

        {type === "consultant" && (
          <div className="py-6 px-4 border-b border-b-stroke-8">
            <h1 className=" text-[0.88rem] font-semibold mr-2">Chat info</h1>
            {result.data && (
              <div className="py-6">
                <div className="flex items-center">
                  {userProfilePic && (
                    <div className="w-[2.5rem] h-[2.5rem] mr-2">
                      <AspectRatio ratio={1800 / 1800}>
                        <Image
                          src={userProfilePic}
                          alt="user-profile-pic"
                          width={100}
                          height={100}
                          className="w-full h-full rounded-full"
                        />
                      </AspectRatio>
                    </div>
                  )}
                  <div className="text-[0.88rem]">
                    <p>{result.data.user.fullName}</p>
                    <p className="text-[0.75rem]">{result.data.user.email}</p>
                  </div>
                </div>
                <div className="text-[0.75rem] mt-6">
                  <h1 className="font-semibold">Summary</h1>
                  <p>{truncateStr(result.data.request.summary, 500)}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <section className="py-6 px-4 border-b border-b-stroke-8 max-h-[25rem] overflow-y-scroll">
          <div className="flex items-center mb-2">
            <h1 className=" text-[0.88rem] font-semibold mr-2">
              In-chat files
            </h1>
            <div className="rounded-full bg-gray-bg-6 h-[1.45rem] w-[1.45rem] flex items-center justify-center">
              <p className="text-[0.75rem] font-semibold">{chatFiles.length}</p>
            </div>
          </div>
          <div className="py-6">
            {chatFiles.map((el) => (
              <Link href={el.path} key={el.path}>
                <div className="flex items-center  mb-4 cursor-pointer hover:bg-gray-bg-1 transition-all py-3 px-4 rounded-md">
                  <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
                    <Image src={FileImg} alt="file-img" />
                  </div>
                  <div className="mr-auto">
                    <h1 className="text-[0.88rem] font-semibold">
                      {el.filename || "unknown file"}
                    </h1>
                    <div className="flex text-[#00000066] items-center font-semibold text-[0.75rem]">
                      <p>{(Number(el.filesize) / 1000000).toFixed(3)}MB</p>
                    </div>
                  </div>
                  <div className="">
                    <Image src={DownloadImg} alt="download" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerChatRight;
