import Spinner from "@/app/Spinner/Spinner";
import { IWatchFinalCutState } from "@/app/services/watch-final-cut/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import TextArea from "@/components/TextArea/TextArea";
import {
  testExhibitionData,
  testSelectData,
} from "@/utils/constants/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  data: IWatchFinalCutState;
  setScriptProps: (key: string, value: string) => void;
  proceed: () => void;
  isLoading?: boolean;
};

const WatchFinalCutForm = ({
  data,
  setScriptProps,
  disabled,
  proceed,
  isLoading,
}: Props) => {
  const router = useRouter();
  return (
    <div className="w-full xl:w-[90%]">
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
        <div className="mt-6">
          <TextArea
            changed={(val) => setScriptProps("logline", val)}
            value={data.logline}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Tell us your logline/synopsis"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-x-4 mt-6">
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
              data={testExhibitionData}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="mt-8">
          <InputComponent
            value={data.link}
            label="Share a link (video must be watermarked)"
            placeholder="Text"
            changed={(val) => setScriptProps("link", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-8">
          <TextArea
            changed={(val) => setScriptProps("concerns", val)}
            value={data.concerns}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any particular concerns"
          />
        </div>
        {/* <ServiceInfo content="Final Cut watch can take between 3-5 days. You will be mailed with calendar dates to choose a chat" /> */}
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
              <div className="w-[1rem]">
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

export default WatchFinalCutForm;
