import { IChatState } from "@/app/get-started/chat/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import { testSelectData } from "@/utils/constants/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  data: IChatState;
  setScriptProps: (key: string, value: string) => void;
  setPageProps: (val: string) => void;
};

const ChatForm = (props: Props) => {
  const router = useRouter()
  return (
    <div>
      <h1 className="font-bold text-[1.5rem]">
        What do you want to chat about?
      </h1>
      <h2 className="text-[1.13rem]">
        Give us a quick summary of what you want to chat about
      </h2>
      <div className="w-full xl:w-[80%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // props.proceed();
          }}
        >
          <div className="mt-8">
            <InputComponent
              value={props.data.title}
              label="Movie title"
              placeholder="Text"
              changed={(val) => props.setScriptProps("title", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
          <div className="mt-8">
            <TextArea
            placeholder=""
              changed={(val) => props.setScriptProps("logline", val)}
              value={props.data.summary}
              labelStyle2
              className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
              label="Quick summary"
            />
          </div>
          <div className="mt-8">
            <SelectComponent
              size="md"
              value={props.data.consultant}
              setValueProps={(val) => props.setScriptProps("platform", val!)}
              label="Consultant type"
              data={testSelectData}
              placeholder="Select"
            />
          </div>
          <div className="w-full flex mt-14 mb-14">
            <UnstyledButton
              type="button"
              clicked={() => router.back()}
              class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
            >
              Back
            </UnstyledButton>
            <UnstyledButton
              clicked={() => props.setPageProps("2") }
              type="submit"
              // disabled={disabled}
              class="flex py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
            >
              <p className="mr-2">Next</p>
              <FaArrowRight className="text-[0.7rem]" />
            </UnstyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
