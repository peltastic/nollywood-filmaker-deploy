import { useLazyFetchSingleWithdrawalDataQuery } from "@/lib/features/consultants/dashboard/withdrawals/withdrawals";
import Image from "next/image";
import React, { useEffect } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { Skeleton } from "@mantine/core";
import moment from "moment";

type Props = {
  id: string;
  close: () => void;
};

const WithdrawalInfo = (props: Props) => {
  const [fetchWithdrawals, { isFetching, data }] =
    useLazyFetchSingleWithdrawalDataQuery();

  useEffect(() => {
    fetchWithdrawals(props.id);
  }, []);
  return (
    <section className=" px-2 sm:px-6 py-6">
      <div className="flex">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Withdrawals
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
        </div>
        <div className="border-t border-b border-stroke-10 py-6 mt-12">
          {isFetching ? (
            <div className="">
              <div className="w-[14rem]">
                <Skeleton height={15} />
              </div>
              <div className="w-[7rem] mt-2">
                <Skeleton height={15} />
              </div>
            </div>
          ) : (
            <div className="">
              <h3 className="font-medium text-[0.88rem] text-black-3">
                Amount
              </h3>
              <p className="text-gray-1 text-[0.88rem]">
              ₦ {data?.withdrawal.amount}
              </p>
            </div>
          )}
          <div className="mt-8">
            {isFetching ? (
              <div className="">
                <div className="w-[14rem]">
                  <Skeleton height={15} />
                </div>
                <div className="w-[7rem] mt-2">
                  <Skeleton height={15} />
                </div>
              </div>
            ) : (
              <div className="">
                <h3 className="font-medium text-[0.88rem] text-black-3">
                  Status
                </h3>

                <p className="text-gray-1 text-[0.88rem]">
                  {data?.withdrawal.status}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            {isFetching ? (
              <div className="">
                <div className="w-[14rem]">
                  <Skeleton height={15} />
                </div>
                <div className="w-[7rem] mt-2">
                  <Skeleton height={15} />
                </div>
              </div>
            ) : (
              <div className="">
                <h3 className="font-medium text-[0.88rem] text-black-3">
                  Withdrawal date
                </h3>

                <p className="text-gray-1 text-[0.88rem]">
                  {data?.withdrawal.createdAt
                    ? `${moment(data.withdrawal.createdAt).format("ll")}`
                    : null}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            {isFetching ? (
              <div className="">
                <div className="w-[14rem]">
                  <Skeleton height={15} />
                </div>
                <div className="w-[7rem] mt-2">
                  <Skeleton height={15} />
                </div>
              </div>
            ) : (
              <div className="">
                <h3 className="font-medium text-[0.88rem] text-black-3">
                  Withdrawal bank
                </h3>

                <p className="text-gray-1 text-[0.88rem]">
                  {data?.withdrawal.orderId}
                </p>
              </div>
            )}
          </div>
        </div>

    </section>
  );
};

export default WithdrawalInfo;
