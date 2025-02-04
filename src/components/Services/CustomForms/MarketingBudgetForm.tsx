import Spinner from "@/app/Spinner/Spinner";
import { IMarketingBudgetState } from "@/app/services/marketing-budget/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import TextArea from "@/components/TextArea/TextArea";
import { testExhibitionData, testSelectData } from "@/utils/constants/constants";
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
  setCost: (value: number) => void
};

const MarketingBudgetForm = ({
  data,
  setScriptProps,
  disabled,
  proceed,
  isLoading,
  setCost
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
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
          label="Movie title"
          placeholder="Text"
          changed={(val) => setScriptProps("movie_title", val)}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          type=""
        />
          <div className="mt-10 mb-10 cursor-pointer">
          <Switch
            label="Series"
            color="#181818"
            checked={checked}
            size="md"
            onChange={(val) => {
              if (val.currentTarget.checked) {
                setScriptProps("showType", "Yes");
                setCost(350000)
                
              } else {
                setCost(250000)
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
            type=""
          />
        )}
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
            label="Platform for exhibition"
            data={testExhibitionData}
            placeholder="Select"
          />
        </div>
        <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("target_social", val)}
            value={data.target_social}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Target Social media platforms"
          />
        </div>
        <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("target_ooh", val)}
            value={data.target_ooh}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Target OOH platforms"
          />
        </div>
        <div className="mt-8">
          <InputComponent
            value={data.budget}
            label="Budget Range"
            placeholder="Text"
            changed={(val) => setScriptProps("budget", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
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
                <p className="mr-2">Procced to payment</p>
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
