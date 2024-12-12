import React, { PropsWithChildren } from "react";

import { Dropzone } from "@mantine/dropzone";

interface Props extends PropsWithChildren {
  setFiles: (filee: File[]) => void;
}

const DropZoneComponent = (props: Props) => {
  return (
    <Dropzone onDrop={(files) => props.setFiles(files)}>
      {props.children}
    </Dropzone>
  );
};

export default DropZoneComponent;
