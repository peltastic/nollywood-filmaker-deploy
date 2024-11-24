import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import CustomSelect from "../Select/CustomSelect";
import UnstyledButton from "../Button/UnstyledButton";
import {
  useAppointConsultantMutation,
  useFetchConsultantsByExpertiseQuery,
} from "@/lib/features/admin/requests/request";
import { Skeleton } from "@mantine/core";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  expertise: string;
  orderId: string;
  chat_appointment_data: {
    time: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    userId: string;
    date: string;
  };
};

const AssignRequestModal = (props: Props) => {
  const [dropdownData, setDropDownData] = useState<
    {
      label: string;
      value: string;
      caption?: string;
      info?: string;
    }[]
  >([]);
  const [appointConsultant, result] = useAppointConsultantMutation();
  const [consultantId, setConsultantId] = useState<string>("");
  const { data, isFetching } = useFetchConsultantsByExpertiseQuery(
    props.expertise
  );
  useEffect(() => {
    if (data) {
      const transformed_data: {
        label: string;
        value: string;
        caption?: string;
        info?: string;
      }[] = data.consultants.map((el) => {
        return {
          label: `${el.fname} ${el.lname}`,
          value: el._id,
          caption: props.expertise,
        };
      });
      setDropDownData(transformed_data);
    }
  }, [data]);
  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (result.error as any).data?.message || "An Error Occured"
      );
    }

    if (result.isSuccess) {
      notify(
        "success",
        "Successful",
        "Appointment assigned to consultant successfully"
      );
      props.close();
    }
  }, [result.isError, result.isSuccess]);
  return (
    <section className="px-2 sm:px-6 py-6 h-screen">
      <div className="flex">
        <h1 className="font-semibold text-[1.4rem] sm:text-[2rem]">
          Assign Request
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
        <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
        <div className="text-black-7 text-[0.88rem]">
          <p>• Choose a consultant</p>
          <p>• Assign the request</p>
        </div>
      </div>
      <div className=" mt-4">
        {isFetching ? (
          <Skeleton height={50} />
        ) : (
          <CustomSelect
            setValue={(el) => setConsultantId(el)}
            data={dropdownData}
          />
        )}
      </div>
      <div className="xs:absolute xs:bottom-4 right-4 w-full flex flex-wrap mt-[5rem]">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          clicked={() => {
            appointConsultant({
              orderId: props.orderId,
              expertise: props.expertise,
              cid: consultantId,
              date: props.chat_appointment_data.date,
              time: props.chat_appointment_data.time,
              uid: props.chat_appointment_data.userId,
            });
          }}
          disabled={!consultantId || result.isLoading}
          class="w-[10rem] flex py-2 px-4 disabled:opacity-50 transition-all rounded-md justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 text-[0.88rem] disabled:bg-black-2"
        >
          {result.isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Assign Request</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default AssignRequestModal;
