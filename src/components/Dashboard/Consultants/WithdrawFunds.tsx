import UnstyledButton from "@/components/Button/UnstyledButton";
import React from "react";
import Image from "next/image";
import WellsFargoImg from "/public/assets/dashboard/wells-fargo.png";
import MenuComponent from "@/components/Menu/MenuComponent";
import { IoIosArrowDown } from "react-icons/io";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import BankDetails from "./BankDetails";
import PaymentMethods from "./PaymentMethods";

type Props = {};

const WithdrawFunds = (props: Props) => {
  const [opened, { open, close }] = useDisclosure();
  const [paymentMethodOpened, payment] = useDisclosure();
  return (
    <>
      <ModalComponent
        size="xl"
        onClose={close}
        withCloseButton={false}
        opened={opened}
        centered
      >
        <BankDetails close={close} />
      </ModalComponent>
      <ModalComponent
        withCloseButton={false}
        onClose={payment.close}
        opened={paymentMethodOpened}
        centered
        size="xl"
      >
        <PaymentMethods close={payment.close} />
      </ModalComponent>
      <div className="px-4 sm:px-10 border border-stroke-10 py-4 rounded-md">
        <UnstyledButton class="bg-black-3 text-white w-full py-5 rounded-md  font-medium text-[1.5rem]">
          Withdraw funds
        </UnstyledButton>
        <div className="flex flex-wrap mid:flex-nowrap items-center mt-8">
          <div className="flex items-center mr-auto w-full mid:w-auto">
            <Image src={WellsFargoImg} alt="wells-fargo" className="mr-3" />
            <div className="font-medium ">
              <p className="text-black-3">Withdraw to bank account</p>
              <p className="text-gray-1">******5864</p>
            </div>
          </div>
          <MenuComponent
            target={
              <div className="mt-10">
                <UnstyledButton class="py-2 px-4 rounded-md font-medium text-[0.88rem] text-black-2 flex items-center border border-black-3">
                  <p className="mr-2">Options</p>
                  <IoIosArrowDown />
                </UnstyledButton>
              </div>
            }
          >
            <div className="text-gray-6 text-[0.88rem] px-3 py-3">
              <ul>
                <li onClick={open} className="cursor-pointer mb-3">
                  <p>View bank details</p>
                </li>
                <li className="cursor-pointer" onClick={payment.open}>
                  <p>Change payment method</p>
                </li>
              </ul>
            </div>
          </MenuComponent>
        </div>
      </div>
    </>
  );
};

export default WithdrawFunds;
