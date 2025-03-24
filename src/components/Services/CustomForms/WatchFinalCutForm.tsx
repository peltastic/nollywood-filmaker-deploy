import Spinner from "@/app/Spinner/Spinner";
import { IWatchFinalCutState } from "@/app/services/watch-final-cut/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import {
  seriesExhibitionData,
  testExhibitionData,
  testSelectData,
} from "@/utils/constants/constants";
import { Switch } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  data: IWatchFinalCutState;
  setScriptProps: (key: string, value: string) => void;
  proceed: () => void;
  isLoading?: boolean;
  seriesLinks: string[];
  updateSeriesLinkProps: (index: number, link: string) => void;
};

const stage = [
  {
    label: "First cut minus colour/sound/music/vfx",
    value: "First cut minus colour/sound/music/vfx",
  },
  {
    label: "First cut plus temp music/sound and vfx",
    value: "First cut plus temp music/sound and vfx",
  },
  {
    label: "Final cut plus temp/music/sound/vfx",
    value: "Final cut plus temp/music/sound/vfx",
  },
  {
    label: "Final cut",
    value: "Final cut",
  },
];

const WatchFinalCutForm = ({
  data,
  setScriptProps,
  disabled,
  proceed,
  isLoading,
  seriesLinks,
  updateSeriesLinkProps,
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
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
          label="Working title"
          placeholder="Text"
          changed={(val) => setScriptProps("movie_title", val)}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          type=""
        />
        <div className="mt-10 mb-10 cursor-pointer w-fit">
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
            changed={(val) => {
              setScriptProps("episodes", val);
              // if (Number(val) > 0) {
              // }
            }}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type="number"
          />
        )}
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
              label="Primary platform for exhibition"
              data={checked ? seriesExhibitionData : testExhibitionData}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="mt-10">
          <SelectComponent
            size="md"
            value={data.stage}
            setValueProps={(val) => setScriptProps("stage", val!)}
            label={`What stage is your ${
              data.showType === "Yes" ? "series" : "movie"
            } currently`}
            data={stage}
            placeholder="Select"
          />
        </div>
        {data.showType === "No" ? (
          <div className="mt-10">
            <InputComponent
              value={data.link}
              label="Share a link (Video should be watermarked with “Nollywood Filmmaker”)"
              placeholder="Text"
              changed={(val) => setScriptProps("link", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
        ) : (
          <div className="mt-8">
            {Array.from({ length: Number(data.episodes) || 0 }).map(
              (_, index) => (
                <div className="mt-10" key={index.toString()}>
                  <InputComponent
                    value={seriesLinks[index]}
                    label={`Share a link for episode ${
                      index + 1
                    } (Video should be preferably be watermarked)`}
                    placeholder="Text"
                    changed={(val) => updateSeriesLinkProps(index, val)}
                    className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
                    type=""
                  />
                </div>
              )
            )}
          </div>
        )}
        <div className="mt-8">
          <TextArea
            changed={(val) => setScriptProps("concerns", val)}
            value={data.concerns}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any particular concerns"
          />
        </div>

        <div className="mt-4 w-full">
          <CheckboxComponent
            setCheckedProps={(val) => setTerms(val)}
            checked={terms}
            label={
              <p className="max-w-[40rem] text-gray-3">
                By proceeding with this upload, I confirm that I have read,
                understood, and agree to the{" "}
                <span className="font-semibold underline">
                  <Link href={"/terms-and-conditions"}>
                    Terms and Conditions
                  </Link>
                </span>{" "}
                &nbsp; and &nbsp;
                <span className="font-semibold underline">
                  <Link href={"/privacy-policy"}>privacy policy</Link>
                </span>
                of the service.
              </p>
            }
          />
        </div>
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
            disabled={disabled || !terms}
            class="flex justify-center w-[12rem] py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            {isLoading ? (
              <div className="w-[1rem]">
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

export default WatchFinalCutForm;
