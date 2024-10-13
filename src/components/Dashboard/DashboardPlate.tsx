import React from "react";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";

interface Props extends React.PropsWithChildren {
  title: string;
  showMoreBtnContent?: string;
  link?: string;
}

const DashboardPlate = (props: Props) => {
  const router = useRouter();
  return (
    <div className="shadow-lg shadow-[#1018280F] rounded-md bg-white pt-2 pb-4  w-full border border-stroke-5">
      <div className="flex items-center text-black-4 py-4 border-b border-stroke-5">
        <div className="px-6 w-full  flex items-center">
          <h1 className="text-[1.13rem] mr-auto font-medium">{props.title}</h1>
          <div className="">
            {props.showMoreBtnContent && (
              <UnstyledButton
                clicked={() => {
                  if (props.link) {
                    router.push(props.link);
                  }
                }}
                class="bg-black-3 text-white px-4 py-2 rounded-md text-[0.88rem]"
              >
                {props.showMoreBtnContent}
              </UnstyledButton>
            )}
          </div>
        </div>
      </div>
      <div className="px-6">{props.children}</div>
    </div>
  );
};

export default DashboardPlate;
