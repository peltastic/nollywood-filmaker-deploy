import React from "react";
import SelectComponent from "../Select/SelectComponent";

type Props = {
  amount: string;
  info: string;
  title: string;
  filter?: boolean;
};

const WithdrawalAmount = (props: Props) => {
  return (
    <div className="w-full mb-8 lg:mb-0 border border-stroke-10 px-4 sm:px-10 py-6 rounded-md">
      <div className="flex flex-wrap md:flex-nowrap items-center mb-4">
        <h3 className="font-bold  w-full md:w-auto mr-auto">{props.title}</h3>
        <div className="w-[9rem] mt-6 md:mt-0">
          <SelectComponent
            darkBorder
            data={[
              {
                label: "This Month",
                value: "This Month",
              },
            ]}
            label=""
            placeholder=""
            setValueProps={() => {}}
            defaultValue="This Month"
          />
        </div>
      </div>
      <p className="flex items-end mb-10 md:mb-3 mt-10 md:mt-0">
        <span className="text-[2rem] xs:text-[2.5rem] md:text-[4rem] font-bold">${props.amount}</span>
        <span className=" block mb-2 font-bold text-[0.75rem] xs:text-[1rem] md:text-[1.5rem]">USD</span>
      </p>
      <p className="text-[0.88rem] text-black-4 font-medium">{props.info}</p>
    </div>
  );
};

export default WithdrawalAmount;
