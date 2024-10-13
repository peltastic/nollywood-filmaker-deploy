import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  data: {
    name: string;
    link: string;
    function?: () => void;
  }[];
};

const MenuContent = ({ data }: Props) => {
  const router = useRouter();
  return (
    <ul className="px-1 text-gray-6 text-[0.88rem] min-w-[7rem]">
      {data.map((el) => (
        <li
          className="py-2 px-4 cursor-pointer hover:bg-gray-bg-1 transition-all rounded-md"
          onClick={() => {
            if (el.function) {
              return el.function && el.function();
            }
            router.push(el.link);
          }}
        >
          <p>{el.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MenuContent;
