import { useRouter } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import UnstyledButton from "../Button/UnstyledButton";
import MenuComponent from "../Menu/MenuComponent";
import Link from "next/link";

type Props = {
  status: "ready" | "completed" | "ongoing" | "pending";
  statusValue: string;
};

const OrderDetailsHeader = ({ status, statusValue }: Props) => {
  const router = useRouter();
  const statusClassname =
    status === "ready"
      ? "bg-light-blue text-dark-blue"
      : status === "completed"
      ? "bg-light-green text-dark-green"
      : status === "pending"
      ? "bg-stroke-4 text-black-6"
      : "bg-light-yellow text-dark-yellow";
  return (
    <div>
      <header className="flex items-center">
        <div className="flex items-center text-[1.5rem] mr-auto">
          <div
            onClick={() => router.back()}
            className="hover:bg-gray-bg-3 w-fit mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
          >
            <IoIosArrowBack className="text-gray-4 " />
          </div>
          <h1 className="text-black-2 font-bold">Order details</h1>
        </div>
        <div className="flex items-center">
          <p className="text-[0.88rem] text-black-2 mr-2">Status:</p>
          <p
            className={`${statusClassname} font-medium, w-fit flex text-[0.75rem] items-center font-medium py-2 px-2 rounded-md`}
          >
            <span className="block pr-1">
              <GoDotFill />
            </span>
            {statusValue}
          </p>
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
          </MenuComponent>
        </div>
      </header>
    </div>
  );
};

export default OrderDetailsHeader;
