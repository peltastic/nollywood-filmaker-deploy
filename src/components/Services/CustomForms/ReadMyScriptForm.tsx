import Spinner from "@/app/Spinner/Spinner";
import { IReadMyScriptState } from "@/app/services/read-my-script/page";
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
  testSelectData,
} from "@/utils/constants/constants";
import { Switch } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import SeriesFiles from "../SeriesFiles";
import { pdfjs } from "react-pdf";
import { BsUpload } from "react-icons/bs";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  fileName?: string;
  disabled?: boolean;
  data: IReadMyScriptState;
  setScriptProps: (key: string, value: string) => void;
  setFileProps: (value: File | null) => void;
  proceed: () => void;
  isLoading?: boolean;
  files?: File[];
  seriesPageCount: number[];
  setSeriesPrices: (value: number[]) => void;
  removeFileData: (index: number) => void;
  setSeriesFilesData: (files: File[]) => void;
  setSeriesCount: (counts: number[]) => void;
};

const ReadMyScriptForm = ({
  data,
  setScriptProps,
  setFileProps,
  disabled,
  fileName,
  proceed,
  isLoading,
  files,
  removeFileData,
  seriesPageCount,
  setSeriesCount,
  setSeriesFilesData,
  setSeriesPrices,
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  const getPdfPageCount = async (file: File): Promise<number> => {
    const reader = new FileReader();

    return new Promise<number>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const result = reader.result;
          if (!(result instanceof ArrayBuffer)) {
            return reject(new Error("Invalid file data"));
          }

          const pdf = await pdfjs.getDocument({ data: result }).promise;
          resolve(pdf.numPages);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="w-full xl:w-[90%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(numPages);
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
            changed={(val) => setScriptProps("logline", val)}
            value={data.logline}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Tell us your logline/synopsis"
          />
        </div>
        {checked ? (
          <div className="mt-10">
            <div className="mb-2  flex font-medium text-[0.88rem] ">
              <p>Upload scripts (pdf) files for each episodes</p>
            </div>
            <DropZoneComponent
              accept={{
                "application/pdf": [".pdf"],
              }}
              setFiles={async (files) => {
                // setSeriesCount([]);
                // setSeriesPrices(null)
                setSeriesFilesData(files);
                const pageCount = [];
                const prices = [];

                for (const el of files) {
                  const page = await getPdfPageCount(el);
                  if (page <= 50) {
                    prices.push(50);
                  } else {
                    prices.push(100);
                  }
                  pageCount.push(page);
                }
                setSeriesCount(pageCount);
                setSeriesPrices(prices);
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
            <ServiceInfo
              activeColor
              content="Billing is based on the page count of each documents, documents uploaded must be at least 20 pages."
            />
            {files && files.length > 0 && (
              <p className="font-bold text-[0.88rem] mt-8">Selected files</p>
            )}
            {files && files.length > 0 ? (
              <div className="max-h-[25rem]  overflow-y-scroll mt-6">
                {files.map((el, index) => (
                  <SeriesFiles
                    index={index}
                    name={el.name}
                    pageCount={seriesPageCount}
                    removeFileData={removeFileData}
                    size={el.size}
                    key={el.name + index}
                    id={`${el.name}${el.size}${index}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10">
            <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
              Upload
            </label>
            <FileInput
              accept=""
              setFile={(file) => {
                if (file) {
                  setFileProps(file);
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
          <TextArea
            changed={(val) => setScriptProps("concerns", val)}
            value={data.concerns}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any particular concerns"
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
            disabled={disabled || isLoading}
            class=" justify-center w-[12rem] flex py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
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

export default ReadMyScriptForm;
