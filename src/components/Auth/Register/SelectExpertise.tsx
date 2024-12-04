import UnstyledButton from "@/components/Button/UnstyledButton";
import Expertise from "@/components/Expertise/Expertise";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  page: string;
  data: string[];
  setExpertise: (value: string, type: "add" | "remove") => void;
  setPageProps: (value: string) => void;
};

const SelectExpertise = ({ page, data, setExpertise, setPageProps }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div className="text-black-2 mt-20">
        <h1 className="font-bold text-[1.5rem]">What&apos;s your expertise?</h1>
        <h2 className="text-[1.13rem]">We would like to know what you do</h2>
      </div>
      <div className="mt-10">
        <Expertise data={data} setExpertise={setExpertise} />
        <p className="mt-4">You can select a maximum of three expertise</p>
      </div>
      <div className="w-full flex mt-28 mb-8 sm:mb-0">
        <UnstyledButton
          clicked={() => router.back()}
          class="rounded-md transition-all hover:bg-gray-bg-1 px-4 border-stroke-2 border"
        >
          Back
        </UnstyledButton>
        <UnstyledButton
          clicked={() => setPageProps("2")}
          disabled={data.length === 0}
          class="flex py-2 px-4 hover:bg-blue-1  transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
        >
          <p className="mr-2">Next</p>
          <FaArrowRight className="text-[0.7rem]" />
        </UnstyledButton>
      </div>
    </div>
  );
};

export default SelectExpertise;
