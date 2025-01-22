import UnstyledButton from "@/components/Button/UnstyledButton";
import React, { useEffect } from "react";
import Image from "next/image";
import WellsFargoImg from "/public/assets/dashboard/wells-fargo.png";
import MenuComponent from "@/components/Menu/MenuComponent";
import { IoIosArrowDown } from "react-icons/io";
import ModalComponent from "@/components/Modal/Modal";
import { useDisclosure } from "@mantine/hooks";
import BankDetails from "./BankDetails";
import PaymentMethods from "./PaymentMethods";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useLazyFetchBankDetailsQuery } from "@/lib/features/consultants/dashboard/withdrawals/withdrawals";
import Spinner from "@/app/Spinner/Spinner";
import { maskNumber } from "@/utils/helperFunction";
import WithdrawFundsModal from "./WithdrawFundsModal";

type Props = {};

const WithdrawFunds = (props: Props) => {
  const consultantId = useSelector(
    (state: RootState) => state.persistedState.consultant.user?.id
  );
  const [fetchBankDetails, { data, isFetching }] =
    useLazyFetchBankDetailsQuery();

  useEffect(() => {
    if (consultantId) {
      fetchBankDetails(consultantId);
    }
  }, []);

  const [opened, { open, close }] = useDisclosure();
  const [paymentMethodOpened, payment] = useDisclosure();
  const [withdrawFundsOpened, withdraw] = useDisclosure();
  return (
    <>
      <ModalComponent
        size="xl"
        onClose={withdraw.close}
        withCloseButton={false}
        opened={withdrawFundsOpened}
        centered
      >
        <WithdrawFundsModal
          close={withdraw.close}
          data={
            data?.banks
              ? {
                  accountnumber: data.banks[0].accountnumber,
                  bankname: data.banks[0].bankname,
                }
              : undefined
          }
        />
      </ModalComponent>
      <ModalComponent
        size="xl"
        onClose={close}
        withCloseButton={false}
        opened={opened}
        centered
      >
        <BankDetails
          data={
            data?.banks
              ? {
                  accountnumber: data.banks[0].accountnumber,
                  bankname: data.banks[0].bankname,
                }
              : undefined
          }
          close={close}
        />
      </ModalComponent>
      <ModalComponent
        withCloseButton={false}
        onClose={payment.close}
        opened={paymentMethodOpened}
        centered
        size="xl"
      >
        <PaymentMethods
          refetch={() => {
            if (consultantId) {
              fetchBankDetails(consultantId);
            }
          }}
          close={payment.close}
        />
      </ModalComponent>
      <div className="px-4 sm:px-10 border border-stroke-10 py-4 rounded-md">
        <UnstyledButton clicked={withdraw.open} class="transition-all hover:bg-blue-1 bg-black-3 text-white w-full py-5 rounded-md  font-medium text-[1.5rem]">
          Withdraw funds
        </UnstyledButton>
        <div className="flex flex-wrap mid:flex-nowrap items-center mt-8">
          <div className="flex items-center mr-auto w-full mid:w-auto">
            {/* <Image src={WellsFargoImg} alt="wells-fargo" className="mr-3" /> */}
            {isFetching ? (
              <div className="w-[1rem]">
                <Spinner dark />
              </div>
            ) : (
              <div className="font-medium ">
                <p className="text-black-3">Withdraw to bank account</p>
                <p className="text-gray-1">
                  {data?.banks ? maskNumber(data.banks[0].accountnumber) : null}{" "}
                  | {data?.banks ? data.banks[0].bankname : null}
                </p>
              </div>
            )}
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
                  <p>Change payment account</p>
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
