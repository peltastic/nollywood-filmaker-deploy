import React from "react";
import DOMPurify from "dompurify";

type Props = {
  role: "admin" | "user";
  reply: string;
};

const IssuesThread = (props: Props) => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(props.reply),
  });

  return (
    <div className={` rounded-md py-6 px-6 mt-2 ${props.role} ${props.role === "admin" ? "bg-stroke-5 text-black-2" : "text-black-3 bg-white"} `}>
      <div className="" dangerouslySetInnerHTML={sanitizedData()}></div>
    </div>
  );
};

export default IssuesThread;
