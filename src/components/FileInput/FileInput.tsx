import React, { ReactNode } from "react";
import { FileButton } from "@mantine/core";

type Props = {
  setFile: (file: File  | null) => void;
  accept: string;
  children: ReactNode;
};

const FileInput = ({ setFile, accept, children, }: Props) => {
  return (
    <FileButton onChange={setFile} accept={accept}>
      {(props) => (
        <div {...props}>
          {children}
        </div>
      )}
    </FileButton>
  );
};

export default FileInput;
