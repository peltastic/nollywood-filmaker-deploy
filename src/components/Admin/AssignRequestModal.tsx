import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import CustomSelect from "../Select/CustomSelect";
import UnstyledButton from "../Button/UnstyledButton";
import {
  useAppointConsultantMutation,
  useAssignServiceToConsultantMutation,
  useFetchConsultantsByExpertiseQuery,
  useLazyFetchConsultantsByExpertiseQuery,
  useLazyGetConsultantForTaskQuery,
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
    nameofservice:
      | "Chat With A Professional"
      | "Read my Script and advice"
      | "Watch the Final cut of my film and advice"
      | "Look at my Budget and advice"
      | "Create a Marketing budget"
      | "Create a Pitch based on my Script"
      | "Draft Legal documents"
      | "Create a Production budget";
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
  const [fetchConsultantByExpertise, { data, isFetching }] =
    useLazyFetchConsultantsByExpertiseQuery();
  const [fetchConsultantByTask, res] = useLazyGetConsultantForTaskQuery();
  const [assign, assignRes] = useAssignServiceToConsultantMutation();

  useEffect(() => {
    if (data) {
      const transformed_data: {
        label: string;
        value: string;
        caption?: string;
        info?: string;
        image?: ReactNode;
      }[] = data.consultants.map((el) => {
        return {
          label: `${el.fname} ${el.lname}`,
          value: el._id,
          caption: props.expertise,
          image: (
            <div className="bg-black-3 font-bold text-[0.7rem] mr-1 h-[2rem] flex items-center justify-center w-[2rem] rounded-full text-white">
              {el.fname[0]} {el.lname[0]}
            </div>
          ),
        };
      });
      setDropDownData(transformed_data);
    }
  }, [data]);

  useEffect(() => {
    if (res.data) {
      const transformed_data = res.data.consultants.map((el) => {
        return {
          label: `${el.fname} ${el.lname}`,
          value: el._id,
          image: (
            <div className="bg-black-3 font-bold text-[0.7rem] mr-1 h-[2rem] flex items-center justify-center w-[2rem] rounded-full text-white">
              {el.fname[0]} {el.lname[0]}
            </div>
          ),
        };
      });
      setDropDownData(transformed_data);
    }
  }, [res.data]);

  useEffect(() => {
    if (
      props.chat_appointment_data.nameofservice === "Chat With A Professional"
    ) {
      fetchConsultantByExpertise(props.expertise);
    } else {
      fetchConsultantByTask();
    }
  }, [props.chat_appointment_data.nameofservice]);

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

  useEffect(() => {
    if (assignRes.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (assignRes.error as any).data?.message || "An Error Occured"
      );
    }

    if (assignRes.isSuccess) {
      notify(
        "success",
        "Successful",
        "Service assigned to consultant successfully"
      );
      props.close();
    }
  }, [assignRes.isError, assignRes.isSuccess]);

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
      <div className=" mt-4 relative z-50">
        {isFetching || res.isFetching ? (
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
            if (
              props.chat_appointment_data.nameofservice ===
              "Chat With A Professional"
            ) {
              appointConsultant({
                orderId: props.orderId,
                expertise: props.expertise,
                cid: consultantId,
                date: props.chat_appointment_data.date,
                time: props.chat_appointment_data.time,
                uid: props.chat_appointment_data.userId,
              });
            } else {
              assign({
                cid: consultantId,
                date: props.chat_appointment_data.date,
                expertise: props.expertise,
                nameofservice: props.chat_appointment_data.nameofservice,
                orderId: props.orderId,
                type: "request",
                uid: props.chat_appointment_data.userId,
                status: "pending",
              });
            }
          }}
          disabled={!consultantId || result.isLoading || assignRes.isLoading}
          class="w-[10rem] flex py-2 px-4 disabled:opacity-50 transition-all rounded-md justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 text-[0.88rem] disabled:bg-black-2"
        >
          {result.isLoading || assignRes.isLoading ? (
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
