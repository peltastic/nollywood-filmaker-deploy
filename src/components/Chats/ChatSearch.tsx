import React from "react";
import { MdOutlineSearch } from "react-icons/md";

type Props = {
  change: (val: string) => void;
  value: string | null
};

const ChatSearch = (props: Props) => {
  return (
    <div className="bg-stroke-4 flex w-full py-4 px-6 rounded-2xl">
      <MdOutlineSearch className="text-2xl mr-2" />
      <input
        onChange={(e) => props.change(e.target.value)}
        type="text"
        className="bg-transparent outline-none w-full placeholder:text-[#00000064] placeholder:text-[0.88rem]"
        placeholder="Search conversation"
      />
    </div>
  );
};

export default ChatSearch;
