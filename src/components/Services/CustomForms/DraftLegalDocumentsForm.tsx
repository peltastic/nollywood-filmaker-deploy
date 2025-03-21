import Spinner from "@/app/Spinner/Spinner";
import { IDraftLegalDocumentState } from "@/app/services/draft-legal-documents/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import InputComponent from "@/components/Input/Input";
import ServiceInfo from "@/components/ServiceInfo/ServiceInfo";
import TextArea from "@/components/TextArea/TextArea";
import { Switch } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  data: IDraftLegalDocumentState;
  setScriptProps: (key: string, value: string) => void;
  proceed: () => void;
  isLoading?: boolean;
};

const DraftLegalDocumentsForm = ({
  data,
  proceed,
  setScriptProps,
  disabled,
  isLoading,
}: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  return (
    <div className="w-full xl:w-[80%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          proceed();
        }}
      >
        <InputComponent
          value={data.title}
          label="Movie title"
          placeholder="Text"
          changed={(val) => setScriptProps("title", val)}
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
            changed={(val) => setScriptProps("production_company", val)}
            value={data.production_company}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Name of Production Company"
          />
        </div>
        <div className="mt-10">
          <TextArea
            placeholder=""
            changed={(val) => setScriptProps("information", val)}
            value={data.information}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Share any relevant information for contracts"
          />
        </div>
        {/* <ServiceInfo content="Pitch deck Creation  can take between 1-2 weeks. You will be mailed with an editable pitch deck and a calendar to choose a chat date" /> */}
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

export default DraftLegalDocumentsForm;
