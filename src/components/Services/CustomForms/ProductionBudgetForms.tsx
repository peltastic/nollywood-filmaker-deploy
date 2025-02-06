import Spinner from "@/app/Spinner/Spinner";
import { IProductionBudgetState } from "@/app/services/production-budget/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import FileInput from "@/components/FileInput/FileInput";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import TextArea from "@/components/TextArea/TextArea";
import { seriesExhibitionData, testExhibitionData, testSelectData } from "@/utils/constants/constants";
import { Switch } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  fileName?: string;
  disabled?: boolean;
  data: IProductionBudgetState;
  setScriptProps: (key: string, value: string) => void;
  setFileProps: (value: File | null) => void;
  proceed: () => void;
  isLoading?: boolean;
  updateCost: (value: number) => void
};

const ProductionBudgetForm = ({
  data,
  setScriptProps,
  setFileProps,
  disabled,
  fileName,
  proceed,
  isLoading,
  updateCost
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
                updateCost(350000)
                
              } else {
                setScriptProps("showType", "No");
                updateCost(250000)
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
          <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
            Upload your script
          </label>
          <FileInput accept="" setFile={(file) => setFileProps(file)}>
            <div className="cursor-pointer border rounded-md border-stroke-2 py-[0.35rem] px-[0.4rem] flex items-center">
              <div className=" py-2 px-3 rounded-[0.25rem] text-white font-medium text-[0.6rem] bg-black-2">
                Browse
              </div>
              <p className="text-gray-6 text-[0.88rem] ml-4">
                {fileName || "No file chosen"}
              </p>
            </div>
          </FileInput>
        </div>
        <div className="mt-8">
          <SelectComponent
            size="md"
            value={data.platform}
            setValueProps={(val) => setScriptProps("platform", val!)}
            label="Platform for exhibition"
            data={checked ? seriesExhibitionData : testExhibitionData}
            placeholder="Select"
          />
        </div>
        <div className="mt-8">
          <TextArea
            changed={(val) => setScriptProps("actors_in_mind", val)}
            value={data.actors_in_mind}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Key actors in mind (optional)"
          />
        </div>
        <div className="mt-8">
          <TextArea
            changed={(val) => setScriptProps("crew_in_mind", val)}
            value={data.crew_in_mind}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Key crew in mind (optional)"
          />
        </div>
        <div className="mt-8">
          <InputComponent
            value={data.number_of_days}
            label="Number of days (we will advice if not practical)"
            placeholder="Text"
            changed={(val) => setScriptProps("number_of_days", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-8">
          <TextArea
            changed={(val) => setScriptProps("information", val)}
            value={data.information}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any relevant information (location, equipment etc)"
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

export default ProductionBudgetForm;
