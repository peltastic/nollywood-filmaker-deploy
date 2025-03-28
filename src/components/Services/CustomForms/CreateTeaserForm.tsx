import { ICreateTeaserState } from "@/app/services/create-teaser/page";
import InputComponent from "@/components/Input/Input";
import RadioGroupComponent from "@/components/Radio/RadioGroup";
import { RadioGroup } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import EditCastName from "../Edits/EditCastName";
import TextArea from "@/components/TextArea/TextArea";
import { DateInput } from "@mantine/dates";
import UnstyledButton from "@/components/Button/UnstyledButton";
import Spinner from "@/app/Spinner/Spinner";
import { FaArrowRight } from "react-icons/fa";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Link from "next/link";

type Props = {
  data: ICreateTeaserState;
  setScriptProps: (key: string, value: string) => void;
  proceed: () => void;
  isLoading?: boolean;
  updateCastNameProps: (
    value: string,
    type: "add" | "delete" | "update",
    index: number
  ) => void;
  crewNames: string[];
  setDateHandler: (date: Date | null) => void;
  updateCost: (value: number, type: "add" | "remove") => void;
};

const radioLabel = [
  {
    label: "Yes",
    value: "Yes",
  },
  {
    label: "No",
    value: "No",
  },
];

const CreateTeaserForm = ({
  data,
  proceed,
  setScriptProps,
  isLoading,
  updateCastNameProps,
  crewNames,
  setDateHandler,
  updateCost,
}: Props) => {
  const router = useRouter();
  const [terms, setTerms] = useState<boolean>(false);
  const [currentKeyName, setCurrentKeyName] = useState<string>("");
  return (
    <div className="w-full xl:w-[90%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          proceed();
        }}
      >
        <InputComponent
          value={data.workingTitle}
          label="Working title"
          placeholder="Text"
          changed={(val) => setScriptProps("workingTitle", val)}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          type=""
        />
        <div className="mt-10">
          <InputComponent
            value={data.filmUpload}
            label="Upload your film (MP4) (Send Google drive link for screener)"
            placeholder="https://drive.google.com/....."
            changed={(val) => setScriptProps("filmUpload", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-10">
          <InputComponent
            value={data.dialogueTrack}
            label="Upload Dialogue Track. Wav or mp3 (send a Google link)"
            placeholder="https://drive.google.com/....."
            changed={(val) => setScriptProps("dialogueTrack", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-10">
          <p className="mb-4">
            Do you have music you want in the teaser/trailer?
          </p>
          <RadioGroupComponent
            changed={(value) => {
              setScriptProps("hasMusic", value);
            }}
            data={radioLabel}
            value={data.hasMusic}
          />
        </div>
        {data.hasMusic === "Yes" && (
          <div className="mt-8">
            <InputComponent
              value={data.musicLink}
              label="Upload music link"
              placeholder="https://drive.google.com/....."
              changed={(val) => setScriptProps("musicLink", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
        )}
        {data.hasMusic === "No" && (
          <div className="mt-10">
            <p className="mb-4">Would you like original (score) music?</p>
            <RadioGroupComponent
              changed={(value) => {
                setScriptProps("wantsOriginalScore", value);
              }}
              data={radioLabel}
              value={data.wantsOriginalScore}
            />
          </div>
        )}

        <div className="mt-10">
          <p className="mb-4">Do you have title graphic (psd)?</p>
          <RadioGroupComponent
            changed={(value) => {
              setScriptProps("hasTitleGraphic", value);
            }}
            data={radioLabel}
            value={data.hasTitleGraphic}
          />
        </div>
        {data.hasTitleGraphic === "Yes" && (
          <div className="mt-8">
            <InputComponent
              value={data.titleGraphicUpload}
              label="Upload poster PSD if any (link)"
              placeholder="https://link.com..."
              changed={(val) => setScriptProps("titleGraphicUpload", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
        )}

        <div className="mt-10">
          <p className="mb-4">
            Do you want vertical format for TikTok / Reels?
          </p>
          <RadioGroupComponent
            changed={(value) => setScriptProps("wantsVerticalFormat", value)}
            data={radioLabel}
            value={data.wantsVerticalFormat}
          />
        </div>
        <div className="mt-10">
          <InputComponent
            value={data.productionCompanyLogos}
            label="Production company logos (upload google drive link)"
            placeholder="https://drive.google.com/....."
            changed={(val) => setScriptProps("productionCompanyLogos", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-10">
          <h1 className="font-medium">Key cast names</h1>
          {crewNames.map((el, index) => (
            <EditCastName
              value={el}
              index={index}
              updateCastNameProps={updateCastNameProps}
            />
          ))}
          <div className="mt-8">
            <InputComponent
              value={currentKeyName}
              label="Cast name"
              placeholder="Name"
              changed={(val) => setCurrentKeyName(val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
          <button
            onClick={() => {
              updateCastNameProps(currentKeyName, "add", 1);
              setCurrentKeyName("");
            }}
            disabled={!currentKeyName}
            className="disabled:opacity-50 bg-black-2 text-white py-1 px-2 text-[0.75rem] rounded-sm mt-6 flex items-center"
          >
            <MdAdd />
            <p className="ml-1">Save</p>
          </button>
        </div>
        <div className="mt-10">
          <p className="font-medium text-[0.88rem] mb-2">Release date</p>
          <DateInput
            value={data.releaseDate}
            onChange={(val) => setDateHandler(val)}
          />
        </div>
        <div className="mt-10">
          <InputComponent
            value={data.directorName}
            label="Director's name"
            placeholder="Text"
            changed={(val) => setScriptProps("directorName", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-10">
          <InputComponent
            value={data.fromTheMakersOf}
            label="From the makers of"
            placeholder="Text"
            changed={(val) => setScriptProps("fromTheMakersOf", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-10">
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
                  <Link href={"/terms-and-conditions"} target="_blank">
                    Terms and Conditions
                  </Link>
                </span>{" "}
                and{" "}
                <span className="font-semibold underline">
                  <Link href={"/privacy-policy"}>privacy policy</Link>
                </span>{" "}
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
            disabled={isLoading || !terms}
            class=" justify-center w-[12rem] flex py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
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

export default CreateTeaserForm;
