import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import Image from "next/image";
import { useLazyFetchSingleRevenueDataQuery } from "@/lib/features/consultants/dashboard/withdrawals/withdrawals";
import { Skeleton } from "@mantine/core";
import { numberWithCommas } from "@/utils/helperFunction";
import moment from "moment";
import { useLazyFetchSingleRevenueDataAdminQuery } from "@/lib/features/admin/dashboard/withdrawals";
import { IConsultantRevenue } from "@/interfaces/consultants/dashboard/withdrawals";

type Props = {
  close: () => void;
  id: string;
  admin?: boolean;
};

const RevenueDetailsModal = (props: Props) => {
  const [revenue, setRevenueData] = useState<{
    deposit: IConsultantRevenue;
  } | null>(null);
  const [fetchRevenue, { isFetching, data }] =
    useLazyFetchSingleRevenueDataQuery();
  const [fetchRevenueAdmin, result] = useLazyFetchSingleRevenueDataAdminQuery();

  useEffect(() => {
    if (props.admin) {
      fetchRevenueAdmin(props.id);
    } else {
      fetchRevenue(props.id);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setRevenueData(data);
    }
  }, [data]);

  useEffect(() => {
    if (result.data) {
      setRevenueData(result.data);
    }
  }, [result.data]);

  return (
    <section className=" px-2 sm:px-6 py-6">
      <div className="flex">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Revenue details
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>

      {/* <div className="mt-8">
        <h1 className="font-semibold text-[1.38rem]">Description</h1>
        <p className="mt-6">
          You earned $51.95 USD for $259.75 USD order made by Damilola Akinosun,
          which you resolved successfully.
        </p>
      </div> */}
      <div className="border-t border-b border-stroke-10 py-6 mt-12">
        {isFetching || result.isFetching ? (
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
            <h3 className="font-medium text-[0.88rem] text-black-3">Amount</h3>
            <p className="text-gray-1 text-[0.88rem]">
              {revenue?.deposit
                ? `₦ ${numberWithCommas(Number(revenue.deposit.amount))}`
                : null}
            </p>
          </div>
        )}
        <div className="mt-8">
          {isFetching || result.isFetching ? (
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
                {revenue?.deposit.status}
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          {isFetching || result.isFetching ? (
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
                Created
              </h3>

              <p className="text-gray-1 text-[0.88rem]">
                {revenue?.deposit
                  ? `${moment(revenue.deposit.createdAt).format("ll")}`
                  : null}
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          {isFetching || result.isFetching ? (
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
                ORDER ID
              </h3>

              <p className="text-gray-1 text-[0.88rem]">
                {revenue?.deposit
                  ? revenue.deposit.orderId.toUpperCase()
                  : null}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <div className="mt-8">
        <div className="">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Customer name
          </h3>
          <p className="text-gray-1 text-[0.88rem]">Niyi Akinmolayan</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Customer ID
          </h3>
          <p className="text-gray-1 text-[0.88rem]">152635763788</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Order cost
          </h3>
          <p className="text-gray-1 text-[0.88rem]">$250 USD</p>
        </div>
        <div className="mt-8">
          <h3 className="font-medium text-[0.88rem] text-black-3">
            Transaction ID
          </h3>
          <p className="text-gray-1 text-[0.88rem]">
            267236-09-9E3W8-90PIOHJSDH
          </p>
        </div>
      </div>  */}
    </section>
  );
};

export default RevenueDetailsModal;
