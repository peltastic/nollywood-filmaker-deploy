import React, { useEffect, useState } from "react";
import SwitchComponent from "../Switch/SwitchComponent";
import SelectComponent from "../Select/SelectComponent";
import { ICreateAvailabilityPayload, ICreateAvailabilityPayloadV2 } from "@/interfaces/consultants/profile/availability";
import { time_slots } from "@/utils/constants/constants";
import { convert12HT24, get12HTime } from "@/utils/helperFunction";
import moment from "moment";
import SlotsSelector from "./SlotsSelector";

type Props = {
  day: string;
  data: ICreateAvailabilityPayloadV2;
  index: number;
  updateHours: (
    index: number,
    slots: string[]
  ) => void;
  updateStatus: (index: number, status: "open" | "closed") => void;
};

const HoursSelector = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(
    props.data.status === "open" ? true : false
  );
  // const [currSlots, setCurrSlots] = useState<string[]>(props.data.slots)
  // const [openTimeValue, setOpenTimeValue] = useState<string | null>(null);
  // const [closeTimeValue, setCloseTimeValue] = useState<string | null>(null);

  // useEffect(() => {
  //   if (props.data) {
  //     setOpenTimeValue(
  //       moment(`${props.data.otime.hours}:00 `, ["HH:mm"]).format("h:mm A")
  //     );
  //     setCloseTimeValue(
  //       moment(`${props.data.ctime.hours}:00`, ["HH:mm"]).format("h:mm A")
  //     );
  //   }
  // }, [props.data]);

  const updateSlots = (value: string, type: "add" | "remove") => {
    const slots = [...props.data.slots]
    if (type === "add") {
      slots.push(value)
    } else {
      const index = slots.indexOf(value)
      slots.splice(index, 1)
    }
    props.updateHours(props.index, slots)
  } 

  return (
    <div className="border  border-stroke-2 my-4 rounded-lg px-4 font-semibold py-4">
      <div className="w-[14rem] mr-auto flex items-center">
        <p className="mr-auto">{props.day}</p>
        <SwitchComponent
          checked={checked}
          setChecked={(val) => {
            setChecked(val);
            props.updateStatus(props.index, val ? "open" : "closed");
          }}
          radius={"sm"}
          size="md"
          color="#181818"
        />
        <p className="text-black-5 ml-4 font-medium text-[0.88rem]">
          {checked ? "Open" : "Closed"}
        </p>
      </div>
    {/* <SlotsSelector /> */}
    {checked && <SlotsSelector slots={props.data.slots} updateSlots={updateSlots} /> }
      {/* {checked && openTimeValue && closeTimeValue ? (
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
                      hours: Number(
                        moment(`${val}:00 `, ["h:mm A"])
                          .format("HH:mm")
                          .split(":")[0]
                      ),
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
                      hours: Number(
                        moment(`${val}:00 `, ["h:mm A"])
                          .format("HH:mm")
                          .split(":")[0]
                      ),
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
      ) : null} */}
    </div>
  );
};

export default HoursSelector;
