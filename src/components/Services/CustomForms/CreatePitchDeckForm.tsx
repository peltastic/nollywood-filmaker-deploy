import { IPitchDeckState } from "@/app/services/create-pitch-deck/page";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import {
  testExhibitionData,
  testSelectData,
} from "@/utils/constants/constants";
import React from "react";

type Props = {
  data: IPitchDeckState;
  setScriptProps: (key: string, value: string) => void;
};

const CreatePitchDeckForm = ({ data, setScriptProps }: Props) => {
  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
        <div className="mt-10">
          <TextArea
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
              data={testExhibitionData}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="text-[">
            <p></p>
        </div>
      </form>
    </div>
  );
};

export default CreatePitchDeckForm;
