import React from "react";
import UnstyledButton from "../Button/UnstyledButton";
import { useRouter } from "next/navigation";

interface Props extends React.PropsWithChildren {
  title: string;
  subtitle?: string;
  showMoreBtnContent?: string;
  link?: string;
  noborder?: boolean;
  topJSXContent?: React.ReactNode;
}

const DashboardPlate = (props: Props) => {
  const router = useRouter();
  return (
    <div className="h-full shadow-lg shadow-[#1018280F] rounded-md bg-white pt-2 pb-4  w-full border border-stroke-5">
      <div
        className={`flex items-center text-black-4 py-4 ${
          props.noborder ? "" : "border-b border-stroke-5"
        } `}
      >
        <div
          className={` ${
            props.topJSXContent ? "flex-wrap lg:flex-nowrap" : ""
          } px-6 w-full  flex items-center`}
        >
          <div className={` ${props.topJSXContent? "w-full lg:w-auto" : ""} mr-auto`}>
            <h1 className="text-[1.13rem] font-medium">{props.title}</h1>
            {props.subtitle && (
              <p className="text-gray-8 text-[0.81rem]">{props.subtitle}</p>
            )}
          </div>
          {props.topJSXContent && props.topJSXContent}
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
