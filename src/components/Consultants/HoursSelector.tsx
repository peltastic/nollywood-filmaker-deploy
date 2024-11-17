import React, { useEffect, useState } from "react";
import SwitchComponent from "../Switch/SwitchComponent";
import SelectComponent from "../Select/SelectComponent";
import { ICreateAvailabilityPayload } from "@/interfaces/consultants/profile/availability";
import { time_slots } from "@/utils/constants/constants";
import { convert12HT24, get12HTime } from "@/utils/helperFunction";

type Props = {
  day: string;
  data: ICreateAvailabilityPayload;
  index: number;
  updateHours: (
    index: number,
    payload: {
      hours: number;
      minutes: number;
      seconds: number;
    },
    type: "openTime" | "closeTime"
  ) => void;
  updateStatus: (index: number, status: "open" | "close") => void;
};

const HoursSelector = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(
    props.data.status === "open" ? true : false
  );
  const [openTimeValue, setOpenTimeValue] = useState<string | null>(null);
  const [closeTimeValue, setCloseTimeValue] = useState<string | null>(null);

  useEffect(() => {
    if (props.data) {
      setOpenTimeValue(
        `${convert12HT24(props.data.otime.hours)}:00 ${get12HTime(
          props.data.otime.hours
        )}`
      );
      setCloseTimeValue(
        `${convert12HT24(props.data.ctime.hours)}:00 ${get12HTime(
          props.data.ctime.hours
        )}`
      );
    }
  }, [props.data]);

  return (
    <div className="border flex items-center border-stroke-2 my-4 rounded-lg px-4 font-semibold py-4">
      <div className="w-[14rem] mr-auto flex items-center">
        <p className="mr-auto">{props.day}</p>
        <SwitchComponent
          checked={checked}
          setChecked={(val) => {
            setChecked(val);
            props.updateStatus(props.index, val ? "open" : "close");
          }}
          radius={"sm"}
          size="md"
          color="#181818"
        />
        <p className="text-black-5 ml-4 font-medium text-[0.88rem]">
          {checked ? "Open" : "Closed"}
        </p>
      </div>
      {checked && openTimeValue && closeTimeValue ? (
        <div className="flex items-center">
          <div className="w-[7rem]">
            <SelectComponent
              noIcon
              data={time_slots}
              label=""
              value={openTimeValue}
              defaultValue={openTimeValue}
              placeholder=""
              setValueProps={(val) => {
                if (val) {
                  props.updateHours(
                    props.index,
                    {
                      hours: convert12HT24(Number(val.split(":")[0]), true),
                      minutes: 0,
                      seconds: 0,
                    },
                    "openTime"
                  );
                }
                setOpenTimeValue(val);
              }}
            />
          </div>
          <p className="text-black-5 text-[0.88rem] font-medium mx-3">To</p>
          <div className="w-[7rem]">
            <SelectComponent
              noIcon
              data={time_slots}
              label=""
              value={closeTimeValue}
              defaultValue={closeTimeValue}
              placeholder=""
              setValueProps={(val) => {
                if (val) {
                  props.updateHours(
                    props.index,
                    {
                      hours: convert12HT24(Number(val.split(":")[0]), true),
                      minutes: 0,
                      seconds: 0,
                    },
                    "closeTime"
                  );
                }
                setOpenTimeValue(val);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HoursSelector;
