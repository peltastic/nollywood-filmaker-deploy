import { IChatState } from "@/app/get-started/chat/page";
import UnstyledButton from "@/components/Button/UnstyledButton";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import {
  consultantTypesData,
  testSelectData,
} from "@/utils/constants/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  data: IChatState;
  setScriptProps: (key: string, value: string) => void;
  setPageProps: (val: string) => void;
};

const ChatForm = (props: Props) => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/user/dashboard/chats")} className=" hover:bg-blue-1 transition-all flex rounded-md items-center text-white py-2 px-4 bg-black-2  text-[0.88rem]">
        <p className="mr-2">Continue existing chats</p>

        <FaArrowRight className="text-[0.7rem]" />
      </button>
      <div className="flex items-center w-[80%] gap-x-4 my-4">
        <div className="border-b w-full"></div>
        <p>or</p>
        <div className="border-b w-full"></div>
      </div>
      <h1 className="font-bold text-[1.5rem]">Start a new chat</h1>
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
              label="Conversation title"
              placeholder="Text"
              changed={(val) => props.setScriptProps("title", val)}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
              type=""
            />
          </div>
          <div className="mt-8">
            <TextArea
              placeholder=""
              changed={(val) => props.setScriptProps("summary", val)}
              value={props.data.summary}
              labelStyle2
              className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
              label="Detailed summary"
            />
          </div>
          <div className="mt-8">
            <SelectComponent
              size="md"
              value={props.data.consultant}
              defaultValue={props.data.consultant}
              setValueProps={(val) => props.setScriptProps("consultant", val!)}
              label="Consultant type"
              data={consultantTypesData}
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
              clicked={() => props.setPageProps("2")}
              disabled={
                !props.data.title ||
                !props.data.summary ||
                !props.data.consultant
              }
              type="submit"
              // disabled={disabled}
              class="flex py-2 px-4 disabled:opacity-50 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2  text-[0.88rem] disabled:bg-black-2"
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
