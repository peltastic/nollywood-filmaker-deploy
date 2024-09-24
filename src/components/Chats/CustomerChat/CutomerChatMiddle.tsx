import React from "react";
import AdminProfileImg from "/public/assets/dashboard/admin-profile-img.svg";
import Image from "next/image";
import MenuComponent from "@/components/Menu/MenuComponent";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import ChatRoom from "../ChatRoom";
import HamburgerIcon from "/public/assets/chats/hamburger.svg";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import RequestExtension from "../ModalComponents/RequestExtension";
import ReportAnIssue from "../ModalComponents/ReportAnIssue";

type Props = {
  open: () => void;
  opened: boolean;
};

const CustomerChatMiddle = (props: Props) => {
  const [opened, { open, close }] = useDisclosure();
  const [reportModOpened, funcs] = useDisclosure()
  return (
    <>
      <ModalComponent
        onClose={close}
        opened={opened}
        centered
        withCloseButton={false}
        size="xl"
      >
        <RequestExtension close={close} />
      </ModalComponent>
      <ModalComponent
        onClose={funcs.close}
        opened={reportModOpened}
        centered
        withCloseButton={false}
        size="xl"
      >
       <ReportAnIssue close={funcs.close} />
      </ModalComponent>
      
      <div className="bg-white border-r border-r-stroke-8 border-l border-l-stroke-8  h-full">
        <header className="flex items-center py-[1.4rem] px-6 border-b border-b-stroke-8">
          <div className="w-[2.5rem] mr-3 h-[2.5rem] rounded-full bg-black flex items-center justify-center">
            <Image src={AdminProfileImg} alt="admin-alt-profile" />
          </div>
          <div className="">
            <h1 className="font-semibold text-[1.25rem]">Mikolo</h1>
            <p className="text-[#00000082] text-[0.75rem] font-semibold">
              Read my script
            </p>
          </div>
          <div className="flex items-center ml-auto">
            <MenuComponent
              target={
                <div className="">
                  <UnstyledButton class="px-4 py-2 rounded-md items-center bg-black-3 hover:bg-blue-1  text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              <div className="bg-white ">
                <ul className="px-1 text-gray-6 text-[0.88rem]">
                  <li
                    onClick={open}
                    className="py-2 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4"
                  >
                    Request an extension
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                    <Link href={"/user/dashboard/order-details/1"}>
                      Export conversation
                    </Link>
                  </li>
                  <li onClick={funcs.open} className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                 
                      Make a report
                    
                  </li>
                </ul>
              </div>
            </MenuComponent>
            {props.opened ? (
              <div
                onClick={props.open}
                className=" hover:bg-stroke-4 transition-all ml-6 rounded-md cursor-pointer"
              >
                <Image src={HamburgerIcon} alt="hamburger-icons" />
              </div>
            ) : null}
          </div>
        </header>
        <div className="h-[90%]">
          <ChatRoom />
        </div>
      </div>
    </>
  );
};

export default CustomerChatMiddle;
