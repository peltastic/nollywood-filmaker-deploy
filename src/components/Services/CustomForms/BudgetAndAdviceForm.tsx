import Spinner from "@/app/Spinner/Spinner";
import { IReadMyScriptState } from "@/app/services/read-my-script/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import FileInput from "@/components/FileInput/FileInput";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
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
  fileName?: string;
  disabled?: boolean;
  data: IReadMyScriptState;
  setScriptProps: (key: string, value: string) => void;
  setFileProps: (value: File | null) => void;
  proceed: () => void;
  isLoading?: boolean;
};

const BudgetAndAdviceForm = ({
  data,
  setScriptProps,
  setFileProps,
  disabled,
  fileName,
  proceed,
  isLoading,
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
              } else {
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
        <div className="mt-10">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("logline", val)}
            value={data.logline}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Tell us your logline/synopsis"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-x-4 mt-10">
          <SelectComponent
            size="md"
            value={data.genre}
            setValueProps={(val) => setScriptProps("genre", val!)}
            label="Genre"
            data={testSelectData}
            placeholder="Select"
          />
          <div className="mt-10 md:mt-0">
            <SelectComponent
              size="md"
              value={data.platform}
              setValueProps={(val) => setScriptProps("platform", val!)}
              label="Platform for exhibition"
              data={checked ? seriesExhibitionData : testExhibitionData}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="mt-10">
          <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
            Upload your budget (pdf, excel)
          </label>
          <FileInput accept="" setFile={(file) => setFileProps(file)}>
            <div className="border rounded-md border-stroke-2 py-[0.35rem] px-[0.4rem] flex items-center">
              <div className=" cursor-pointer py-2 px-3 rounded-[0.25rem] text-white font-medium text-[0.6rem] bg-black-2">
                Browse
              </div>
              <p className="text-gray-6 text-[0.88rem] ml-4">
                {fileName || "No file chosen"}
              </p>
            </div>
          </FileInput>
        </div>
        <div className="mt-10">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("concerns", val)}
            value={data.concerns}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any particular concerns"
          />
        </div>
        {/* <ServiceInfo content="Budget Review  can take between 3-5 days. You will be mailed with calendar dates to choose a chat" /> */}
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

export default BudgetAndAdviceForm;
