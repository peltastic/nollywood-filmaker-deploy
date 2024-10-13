import React from "react";
import SelectComponent from "../Select/SelectComponent";
import SwitchComponent from "../Switch/SwitchComponent";
import UnstyledButton from "../Button/UnstyledButton";

type Props = {
  consultant?: boolean;
};

const PeferencesSettings = (props: Props) => {
  return (
    <div className="bg-white border border-border-gray mt-10 py-10 px-3 sm:px-10">
      <div className="w-full lg:w-[85%]">
        <div className="grid gap-10 md:grid-cols-2">
          {props.consultant ? null : (
            <SelectComponent
              largeLabel
              size="lg"
              data={[]}
              label="Currency"
              placeholder=""
              setValueProps={() => {}}
            />
          )}
          <SelectComponent
            largeLabel
            size="lg"
            data={[]}
            label="Time Zone"
            placeholder=""
            setValueProps={() => {}}
          />
        </div>

        <h1 className="text-[17px] font-medium mt-10">Notification</h1>
        <div className="my-4">
          <SwitchComponent
            size="lg"
            color="#181818"
            label={
              <p className="text-black-2 ml-4">I create a new request order</p>
            }
          />
        </div>
        <div className="my-4">
          <SwitchComponent
            color="#181818"
            size="lg"
            label={
              <p className="text-black-2 ml-4">
                I receive an update on my request order
              </p>
            }
          />
        </div>
        <SwitchComponent
          size="lg"
          color="#181818"
          label={
            <p className="text-black-2 ml-4">
              There are recommendation for my account
            </p>
          }
        />
        <UnstyledButton class="text-[0.88rem] font-medium mt-10 bg-black-2 text-white px-4 py-2 rounded-md ">
          Update
        </UnstyledButton>
      </div>
    </div>
  );
};

export default PeferencesSettings;
