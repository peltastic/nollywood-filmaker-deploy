import React, { useState } from "react";
import SwitchComponent from "../Switch/SwitchComponent";
import SelectComponent from "../Select/SelectComponent";

type Props = {
  day: string;
};

const HoursSelector = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(true);
  return (
    <div className="border flex items-center border-stroke-2 my-4 rounded-lg px-4 font-semibold py-4">
      <div className="w-[14rem] mr-auto flex items-center">
        <p className="mr-auto">{props.day}</p>
        <SwitchComponent
          checked={checked}
          setChecked={(val) => setChecked(val)}
          radius={"sm"}
          size="md"
          color="#181818"
        />
        <p className="text-black-5 ml-4 font-medium text-[0.88rem]">
          {checked ? "Open" : "Closed"}
        </p>
      </div>
      {checked ? (
        <div className="flex items-center">
          <div className="w-[7rem]">
            <SelectComponent
              noIcon
              data={[{ label: "9:00 AM", value: "9:00 AM" }]}
              label=""
              value="9:00 AM"
              placeholder=""
              setValueProps={() => {}}
            />
          </div>
          <p className="text-black-5 text-[0.88rem] font-medium mx-3">To</p>
          <div className="w-[7rem]">
            <SelectComponent
              noIcon
              data={[{ label: "9:00 AM", value: "9:00 AM" }]}
              label=""
              value="9:00 AM"
              placeholder=""
              setValueProps={() => {}}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HoursSelector;
