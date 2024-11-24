import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import UnstyledButton from "../Button/UnstyledButton";
import MenuComponent from "../Menu/MenuComponent";
import Link from "next/link";
import MenuContent from "../Menu/MenuContent";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "../Modal/Modal";
import ResolveRequestModal from "../Consultants/ResolveRequestModal";
import AssignRequestModal from "../Admin/AssignRequestModal";
import {
  useAcceptRequestMutation,
  useDeclineRequestMutation,
} from "@/lib/features/consultants/dashboard/request";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";
import { capitalizeFirstLetter } from "@/utils/helperFunction";

type Props = {
  status?: "ready" | "completed" | "ongoing" | "pending" | string;
  statusValue?: string;
  consultant?: boolean;
  admin?: boolean;
  customerReqOrderId?: string;
  orderId?: string;
  expertise?: string;
  chat_appointment_data?: {
    time: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    userId: string;
    date: string;
  };
};

const OrderDetailsHeader = ({
  status,
  statusValue,
  consultant,
  admin,
  orderId,
  expertise,
  chat_appointment_data,
}: Props) => {
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure();

  const [assignReqOpened, assingReqOptions] = useDisclosure();

  const [acceptRequest, { isLoading, isSuccess, isError, data, error }] =
    useAcceptRequestMutation();
  const [declineRequest, result] = useDeclineRequestMutation();

  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );

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

  const statusClassname =
    status === "ready"
      ? "bg-light-blue text-dark-blue"
      : status === "completed"
      ? "bg-light-green text-dark-green"
      : status === "pending"
      ? "bg-stroke-4 text-black-6"
      : "bg-light-yellow text-dark-yellow";

  let adminMenuContent = <div className=""></div>;

  switch (status) {
    case "pending":
      adminMenuContent = (
        <MenuContent
          data={[
            { name: "Resolve", link: "/", function: () => {} },
            {
              name: "Assign",
              link: "/",
              function: () => {
                assingReqOptions.open();
              },
            },
          ]}
        />
      );
      break;
    case "ongoing":
      adminMenuContent = (
        <MenuContent
          data={[{ name: "Assign", link: "/", function: () => {} }]}
        />
      );
      break;
    case "completed":
      adminMenuContent = adminMenuContent = (
        <MenuContent
          data={[
            {
              name: "Go To Chat",
              link: "/admin/dashboard/customers/1/chat/1",
            },
          ]}
        />
      );
      break;
    default:
      break;
  }

  let consultantMenuContent = <div></div>;

  switch (status) {
    case "pending":
      consultantMenuContent = (
        <MenuContent
          data={[
            {
              name: "Accept",
              link: "/",
              disabled: isLoading,
              function: () => {
                if (consultantId && orderId) {
                  nprogress.start();
                  acceptRequest({
                    consultant_id: consultantId,
                    order_id: orderId,
                  });
                }
              },
            },
            {
              name: "Reject",
              link: "/",
              disabled: result.isLoading,
              function: () => {
                if (consultantId && orderId) {
                  nprogress.start();
                  declineRequest({
                    consultant_id: consultantId,
                    order_id: orderId,
                  });
                }
              },
            },
          ]}
        />
      );
      break;
    case "ongoing":
      consultantMenuContent = (
        <MenuContent
          data={[
            {
              name: "Resolve service request",
              link: "/",
              function: () => {
                open();
              },
            },
            {
              name: "Go to chat",
              link: "/",
              function: () => {},
            },
          ]}
        />
      );
      break;
    case "ready":
      consultantMenuContent = (
        <MenuContent
          data={[
            {
              name: "Go to  chat",
              link: "/",
              function: () => {
                router.push("/consultants/dashboard/chats");
              },
            },
          ]}
        />
      );
      break;
    default:
      break;
  }
  return (
    <>
      <ModalComponent
        opened={opened}
        centered
        onClose={close}
        withCloseButton={false}
        size="xl"
      >
        <ResolveRequestModal close={close} />
      </ModalComponent>
      <ModalComponent
        opened={assignReqOpened}
        centered
        size="xl"
        onClose={assingReqOptions.close}
        withCloseButton={false}
      >
        {expertise && orderId && chat_appointment_data && (
          <AssignRequestModal
            chat_appointment_data={chat_appointment_data}
            expertise={expertise}
            close={assingReqOptions.close}
            orderId={orderId}
          />
        )}
      </ModalComponent>
      <div>
        <header className="flex flex-wrap items-center px-2 chatbg:mx-0 py-4 chatbg:py-0 ">
          <div className="flex items-center w-full md:w-auto text-[1.5rem] mr-auto">
            <div
              onClick={() => router.back()}
              className="hover:bg-gray-bg-3 w-fit mr-3 md:mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
            >
              <IoIosArrowBack className="text-gray-4 " />
            </div>
            <h1 className="text-black-2 font-bold">Order details</h1>
          </div>
          <div className="flex items-center ml-3 md:ml-0 mt-6 md:mt-0">
            <p className="text-[0.88rem] text-black-2 mr-2">Status:</p>
            {statusValue && (
              <p
                className={`${statusClassname} font-medium, w-fit flex text-[0.75rem] items-center font-medium py-2 px-2 rounded-md`}
              >
                <span className="block pr-1">
                  <GoDotFill />
                </span>
                {capitalizeFirstLetter(statusValue)}
              </p>
            )}
            <MenuComponent
              target={
                <div>
                  <UnstyledButton class="ml-6 px-4 py-2 hover:bg-blue-1 rounded-md items-center bg-black-3 text-white flex">
                    <p className="mr-1 font-medium text-[0.88rem]">Actions</p>
                    <IoIosArrowDown />
                  </UnstyledButton>
                </div>
              }
            >
              {admin ? (
                adminMenuContent
              ) : consultant ? (
                consultantMenuContent
              ) : (
                <div className="bg-white ">
                  <ul className="px-1 text-gray-6 text-[0.88rem]">
                    <li className="py-1 hover:bg-gray-bg-1 cursor-pointer transition-all rounded-md px-4">
                      Go to Chat
                    </li>
                    <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                      <Link href={"/user/dashboard/order-details/1"}>
                        See Details
                      </Link>
                    </li>
                    <li className="py-1 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
                      <Link
                        href={
                          "/user/dashboard/order-details/1?page_type=download_files"
                        }
                      >
                        Download files
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </MenuComponent>
          </div>
        </header>
      </div>
    </>
  );
};

export default OrderDetailsHeader;
