import React from "react";

type Props = {
  text: string;
};

const RenderTextAreaInput = ({ text }: Props) => {
  return (
    <div>
      {text.split("\n").map((line, index) => (
        <p className="" key={index}>
          {line}
          <br />
        </p>
      ))}
    </div>
  );
};

export default RenderTextAreaInput;
