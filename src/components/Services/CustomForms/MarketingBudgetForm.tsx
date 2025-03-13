import Spinner from "@/app/Spinner/Spinner";
import { IMarketingBudgetState } from "@/app/services/marketing-budget/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import SwitchComponent from "@/components/Switch/SwitchComponent";
import TextArea from "@/components/TextArea/TextArea";
import {
  seriesExhibitionData,
  testExhibitionData,
  testSelectData,
} from "@/utils/constants/constants";
import { Switch } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  data: IMarketingBudgetState;
  setScriptProps: (key: string, value: string) => void;
  proceed: () => void;
  isLoading?: boolean;
  setCost: (value: number) => void;
  setSocials: (value: string, deleteVal?: boolean) => void;
  setOoh: (value: string, deleteVal?: boolean) => void;
  ooh: string[];
  socials: string[];
};

const MarketingBudgetForm = ({
  data,
  setScriptProps,
  disabled,
  proceed,
  isLoading,
  setCost,
  setSocials,
  socials,
  ooh,
  setOoh,
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  return (
    <div className="w-full xl:w-[80%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          proceed();
        }}
      >
        <InputComponent
          value={data.movie_title}
          label="Working title"
          placeholder="Text"
          changed={(val) => setScriptProps("movie_title", val)}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          type=""
        />
        {/* <div className="mt-10 mb-10 cursor-pointer">
          <Switch
            label="Series"
            color="#181818"
            checked={checked}
            size="md"
            onChange={(val) => {
              if (val.currentTarget.checked) {
                setScriptProps("showType", "Yes");
                // setCost(350000)
              } else {
                setCost(250000);
                setScriptProps("showType", "No");
              }
              setChecked(val.currentTarget.checked);
            }}
          />
        </div>
        {checked && (
          <InputComponent
            value={data.episodes}
            label="No. of episodes"
            placeholder="Text"
            changed={(val) => setScriptProps("episodes", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type="number"
          />
        )} */}
        <div className="mt-8">
          <InputComponent
            value={data.film_link}
            label="Upload your film (send link)"
            placeholder="Text"
            changed={(val) => setScriptProps("film_link", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-8">
          <SelectComponent
            size="md"
            value={data.platform}
            setValueProps={(val) => setScriptProps("platform", val!)}
            label="Primary platform for exhibition"
            data={checked ? seriesExhibitionData : testExhibitionData}
            placeholder="Select"
          />
        </div>
        {/* <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("target_social", val)}
            value={data.target_social}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Target Social media platforms"
          />
        </div> */}
        <h1 className="mb-4 mt-10 text-[0.88rem] font-medium text-black">
          Target social media platforms
        </h1>
        <div className="grid-cols-3 grid gap-y-6 gap-x-3">
          <CheckboxComponent
            checked={socials.includes("Instagram")}
            setCheckedProps={(val) => {
              if (val) {
                setSocials("Instagram");
              } else {
                setSocials("Instagram", true);
              }
            }}
            label={<p>Instagram</p>}
          />
          <CheckboxComponent
            setCheckedProps={(val) => {
              if (val) {
                setSocials("Tiktok");
              } else {
                setSocials("Tiktok", true);
              }
            }}
            checked={socials.includes("Tiktok")}
            label={<p>Tiktok</p>}
          />
          <CheckboxComponent
            setCheckedProps={(val) => {
              if (val) {
                setSocials("X");
              } else {
                setSocials("X", true);
              }
            }}
            checked={socials.includes("X")}
            label={<p>X</p>}
          />
          <CheckboxComponent
            setCheckedProps={(val) => {
              if (val) {
                setSocials("Youtube");
              } else {
                setSocials("Youtube", true);
              }
            }}
            checked={socials.includes("Youtube")}
            label={<p>Youtube</p>}
          />
          <CheckboxComponent
            setCheckedProps={(val) => {
              if (val) {
                setSocials("Others");
              } else {
                setSocials("Others", true);
              }
            }}
            checked={socials.includes("Others")}
            label={<p>Others</p>}
          />
        </div>
        <h1 className="mb-4 mt-10 text-[0.88rem] font-medium text-black">
          Target ooh platforms
        </h1>
        <div className="grid-cols-3 grid gap-y-6 gap-x-3">
          <CheckboxComponent
            checked={ooh.includes("Billboards")}
            setCheckedProps={(val) => {
              if (val) {
                setOoh("Billboards");
              } else {
                setOoh("Billboards", true);
              }
            }}
            label={<p>Billboards</p>}
          />
          <CheckboxComponent
            checked={ooh.includes("Fliers")}
            setCheckedProps={(val) => {
              if (val) {
                setOoh("Fliers");
              } else {
                setOoh("Fliers", true);
              }
            }}
            label={<p>Fliers</p>}
          />
          <CheckboxComponent
            checked={ooh.includes("Banners")}
            setCheckedProps={(val) => {
              if (val) {
                setOoh("Banners");
              } else {
                setOoh("Banners", true);
              }
            }}
            label={<p>Banners</p>}
          />
          <CheckboxComponent
            checked={ooh.includes("Screens")}
            setCheckedProps={(val) => {
              if (val) {
                setOoh("Screens");
              } else {
                setOoh("Screens", true);
              }
            }}
            label={<p>Screens</p>}
          />
          <CheckboxComponent
            checked={ooh.includes("Vehicle brands")}
            setCheckedProps={(val) => {
              if (val) {
                setOoh("Vehicle brands");
              } else {
                setOoh("Vehicle brands", true);
              }
            }}
            label={<p>Vehicle brands</p>}
          />
          <CheckboxComponent
            checked={ooh.includes("Others")}
            setCheckedProps={(val) => {
              if (val) {
                setOoh("Others");
              } else {
                setOoh("Others", true);
              }
            }}
            label={<p>Others</p>}
          />
        </div>

        {/* <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("target_ooh", val)}
            value={data.target_ooh}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Target OOH platforms"
          />
        </div> */}

        <div className="mt-10">
          <SwitchComponent
            label={<p className="ml-2">Do you have a budget range</p>}
            checked={hasBudget}
            color="#181818"
            size="md"
            setChecked={(val) => setHasBudget(val)}
          />
        </div>

        {hasBudget && (
          <div className="mt-10">
            <InputComponent
              value={data.budget}
              label="Budget Range"
              placeholder="Text"
              changed={(val) => setScriptProps("budget", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
        )}
        {/* <ServiceInfo content="Budget Creation  can take between 1-2 weeks. You will be mailed a link to a detailed, editable budget and a calendar to choose a chat date" /> */}
        <div className="w-full flex mt-14">
          <UnstyledButton
            type="button"
            clicked={() => router.back()}
            class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
          >
            Back
          </UnstyledButton>
          <UnstyledButton
            type="submit"
            disabled={disabled}
            class="flex justify-center w-[12rem] py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            {isLoading ? (
              <div className="w-[1rem] py-1">
                <Spinner />
              </div>
            ) : (
              <>
                <p className="mr-2">Proceed to payment</p>
                <FaArrowRight className="text-[0.7rem]" />
              </>
            )}
          </UnstyledButton>
        </div>
      </form>
    </div>
  );
};

export default MarketingBudgetForm;
