import Spinner from "@/app/Spinner/Spinner";
import { ICreatePitchState } from "@/app/services/create-movie-schedule/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DropZoneComponent from "@/components/DropZone/DropZone";
import FileInput from "@/components/FileInput/FileInput";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import TextArea from "@/components/TextArea/TextArea";
import {
  seriesExhibitionData,
  testExhibitionData,
} from "@/utils/constants/constants";
import { Switch } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { pdfjs } from "react-pdf";
import SwitchComponent from "@/components/Switch/SwitchComponent";
import { DateInput, DatePickerInput } from "@mantine/dates";
import EditCharacter from "../Edits/EditCharacter";
import { MdAdd } from "react-icons/md";
import EditFiles from "../Edits/EditFiles";
import { notify } from "@/utils/notification";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  fileName?: string;
  disabled?: boolean;
  data: ICreatePitchState;
  setScriptProps: (key: string, value: string) => void;
  setFileProps: (value: File | null) => void;
  proceed: () => void;
  isLoading?: boolean;
  setCost: (value: number) => void;
  files: File[];
  file: File | null;
  setChacterLocked: (
    val: { name: string; date: Date[] },
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
  setLocationLocked: (
    val: { name: string; date: Date[] },
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
  characterlocked: { name: string; date: Date[] }[];
  locationlocked: { name: string; date: Date[] }[];

  setDateHandler: (date: Date | null) => void;
  setFilesProps: (
    file: File[],
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
};

const CreatePitchForm = ({
  data,
  setScriptProps,
  setFileProps,
  disabled,
  fileName,
  proceed,
  isLoading,
  setCost,
  file,
  files,
  setDateHandler,
  characterlocked,
  setChacterLocked,
  setLocationLocked,
  locationlocked,
  setFilesProps,
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [principal, setPrincipal] = useState<boolean>(false);

  const [characterdDate, setCharacterDate] = useState<Date[]>([]);
  const [locationDate, setLocationDate] = useState<Date[]>([]);
  const [character, setCharacter] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="w-full xl:w-[95%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            Number(data.episodes) < files.length ||
            Number(data.episodes) > files.length
          ) {
            setErrorMessage(
              "Your number of scripts uploaded must match the number of episodes"
            );
          } else {
            proceed();
          }
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
        <div className="mt-10 mb-10 cursor-pointer">
          <Switch
            label="Series"
            color="#181818"
            checked={checked}
            size="md"
            onChange={(val) => {
              setErrorMessage("");
              if (val.currentTarget.checked) {
                setScriptProps("showType", "Yes");
                setCost(150000);
              } else {
                setScriptProps("showType", "No");
                setCost(300000);
              }
              setChecked(val.currentTarget.checked);
            }}
          />
        </div>
        {checked && (
          <InputComponent
            value={data.episodes}
            label="No. of episodes"
            placeholder=""
            changed={(val) => setScriptProps("episodes", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type="number"
          />
        )}

        {checked ? (
          <div className="mt-10">
            <div className="mb-2  flex font-medium text-[0.88rem] ">
              <p>
                Upload scripts for your {Number(data.episodes) || 0} episodes (max 10mb per
                file)
              </p>
            </div>
            <DropZoneComponent
              setFiles={(files) => {
                setErrorMessage("");
                let isValid = true;
                for (const el of files) {
                  if (el?.size > 10 * 1024 * 1024) {
                    isValid = false;
                    notify(
                      "message",
                      "Upload should not contain a file more than 10mb"
                    );
                  }
                }

                if (isValid) {
                  setFilesProps(files, 1, "add");
                }
              }}
            >
              <div
                className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
              >
                <BsUpload className="text-center mx-auto mb-6" />
                <p className="">Drag and Drop here to upload</p>

                <p className="text-[0.88rem] mt-6">Or click to browse file</p>
              </div>
            </DropZoneComponent>
            {files.length > 0 ? (
              <div className="max-h-[25rem]  overflow-y-scroll mt-6">
                {files.map((el, index) => (
                  <EditFiles
                    file={el}
                    index={index}
                    updateFile={setFilesProps}
                    key={el.name + el.size + index}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10">
            <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
              Upload script (max 10mb)
            </label>
            <FileInput
              accept=""
              setFile={(file) => {
                if (file) {
                  if (file?.size > 10 * 1024 * 1024) {
                    notify(
                      "message",
                      "Cannot upload a file with size more than 10mb"
                    );
                  } else {
                    setFileProps(file);
                  }
                }
              }}
            >
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
        )}
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
        <div className="mt-10">
          <SwitchComponent
            checked={principal}
            color="#181818"
            label={
              <p className="ml-2 ">
                Do you have a start date for principal photography?
              </p>
            }
            setChecked={(val) => setPrincipal(val)}
          />
        </div>
        <div className="mt-10">
          {principal ? (
            <>
              <p className="font-medium text-[0.88rem] mb-2">
                Select start date
              </p>
              <DateInput
                value={data.startpop}
                onChange={(val) => setDateHandler(val)}
              />
            </>
          ) : (
            <InputComponent
              value={data.days}
              label="Number of days"
              placeholder="Text"
              changed={(val) => setScriptProps("days", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type="number"
            />
          )}
        </div>
        {/* <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("actors_in_mind", val)}
            value={data.actors_in_mind}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Key actors in mind (optional)"
          />
        </div> */}


        {/* <div className="mt-8">
          <InputComponent
            value={data.budget}
            label="Budget Range (optional)"
            placeholder="Text"
            changed={(val) => setScriptProps("budget", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div> */}

        <h1 className="font-medium text-md mt-10">Character locked days</h1>

        {characterlocked.map((el, index) => (
          <EditCharacter
            index={index}
            updateCharacter={setChacterLocked}
            value={el}
          />
        ))}

        <div className="grid grid-cols-2 gap-x-4 mt-8">
          <div className="">
            <InputComponent
              value={character}
              label="Character"
              placeholder="Text"
              changed={(val) => setCharacter(val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-[0.62rem] px-3"
              type=""
            />
          </div>
          <div className="">
            <p className="font-medium text-[0.88rem] mb-2">
              Locked dates, (you can select multiple)
            </p>
            <DatePickerInput
              size="md"
              onChange={setCharacterDate}
              value={characterdDate}
              type="multiple"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setChacterLocked(
              {
                name: character,
                date: characterdDate,
              },
              1,
              "add"
            );
            setCharacter("");
            setCharacterDate([]);
          }}
          disabled={characterdDate.length < 1 || !character}
          className="disabled:opacity-50 bg-black-2 text-white py-1 px-2 text-[0.75rem] rounded-sm mt-6 flex items-center"
        >
          <MdAdd />
          <p className="ml-1">Save</p>
        </button>
        <h1 className="font-medium text-md mt-10">Location locked days</h1>

        {locationlocked.map((el, index) => (
          <EditCharacter
            index={index}
            updateCharacter={setLocationLocked}
            value={el}
            location
          />
        ))}

        <div className="grid grid-cols-2 gap-x-4 mt-8">
          <div className="">
            <InputComponent
              value={location}
              label="Location"
              placeholder="Text"
              changed={(val) => setLocation(val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-[0.62rem] px-3"
              type=""
            />
          </div>
          <div className="">
            <p className="font-medium text-[0.88rem] mb-2">
              Locked dates, (you can select multiple)
            </p>
            <DatePickerInput
              size="md"
              onChange={setLocationDate}
              value={locationDate}
              type="multiple"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setLocationLocked(
              {
                name: location,
                date: locationDate,
              },
              1,
              "add"
            );
            setLocation("");
            setLocationDate([]);
          }}
          disabled={locationDate.length < 1 || !location}
          className="disabled:opacity-50 bg-black-2 text-white py-1 px-2 text-[0.75rem] rounded-sm mt-6 flex items-center"
        >
          <MdAdd />
          <p className="ml-1">Save</p>
        </button>
        {errorMessage && <ServiceInfo activeColor content={errorMessage} />}
        {/* <ServiceInfo content="Pitch deck Creation  can take between 1-2 weeks. You will be mailed with an editable pitch deck and a calendar to choose a chat date" /> */}

        <div className="mt-8">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("information", val)}
            value={data.information}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any relevant information (location, equipment etc)"
          />
        </div>
        <div className="mt-8 w-full">
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
            disabled={disabled || !terms} 
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

export default CreatePitchForm;
