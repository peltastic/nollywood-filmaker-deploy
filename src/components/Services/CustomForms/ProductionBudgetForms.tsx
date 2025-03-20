import Spinner from "@/app/Spinner/Spinner";
import { IProductionBudgetState } from "@/app/services/production-budget/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DropZoneComponent from "@/components/DropZone/DropZone";
import FileInput from "@/components/FileInput/FileInput";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import SwitchComponent from "@/components/Switch/SwitchComponent";
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
import EditFiles from "../Edits/EditFiles";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import { notify } from "@/utils/notification";

type Props = {
  fileName?: string;
  disabled?: boolean;
  data: IProductionBudgetState;
  setScriptProps: (key: string, value: string) => void;
  setFileProps: (value: File | null) => void;
  proceed: () => void;
  isLoading?: boolean;
  files: File[];
  updateCost: (value: number) => void;
  setFilesProps: (
    file: File[],
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
};

const ProductionBudgetForm = ({
  data,
  setScriptProps,
  setFileProps,
  disabled,
  fileName,
  proceed,
  isLoading,
  updateCost,
  setFilesProps,
  files,
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [hasBudget, setHasBudget] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="w-full xl:w-[80%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            Number(data.episodes) < files.length ||
            Number(data.episodes) > files.length
          ) {
            setErrorMessage(
              "Your number of scripts uploaded must match your number of episodes"
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
        <div className="mt-10 mb-10 cursor-pointer w-fit">
          <Switch
            label="Series"
            color="#181818"
            checked={checked}
            size="md"
            onChange={(val) => {
              setErrorMessage("");
              if (val.currentTarget.checked) {
                setScriptProps("showType", "Yes");
                // updateCost(350000);
                // upd
              } else {
                setScriptProps("showType", "No");
                updateCost(250000);
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
                Upload scripts for your {Number(data.episodes) || 0} episodes
                (max 10mb per file)
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
              Upload your script (max 10mb)
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
        )}
        <div className="mt-10">
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
          <TextArea
            changed={(val) => setScriptProps("actors_in_mind", val)}
            value={data.actors_in_mind}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Key actors in mind (optional)"
          />
        </div>
        <div className="mt-10">
          <InputComponent
            value={data.number_of_days}
            label="Number of shoot days (we will advice if not practical)"
            placeholder="Text"
            changed={(val) => setScriptProps("number_of_days", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            type=""
          />
        </div>
        <div className="mt-10">
          <TextArea
            changed={(val) => setScriptProps("information", val)}
            value={data.information}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any relevant information (location, equipment etc)"
          />
        </div>

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

        {errorMessage && <ServiceInfo activeColor content={errorMessage} />}
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

export default ProductionBudgetForm;
