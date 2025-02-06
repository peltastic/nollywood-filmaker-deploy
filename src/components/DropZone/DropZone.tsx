import React, { PropsWithChildren } from "react";

import { Dropzone } from "@mantine/dropzone";
import { Accept } from "react-dropzone-esm";

interface Props extends PropsWithChildren {
  setFiles: (file: File[]) => void;
  setSingleFile?: (file: File) => void;
  single?: boolean;
  accept?: Accept
}

const DropZoneComponent = (props: Props) => {
  return (
    <Dropzone
    accept={props.accept}
      onDrop={(files) => {
        if (props.single) {
          props.setSingleFile && props.setSingleFile(files[0])
        } else {
          props.setFiles( files);
        }
      }}
    >
      {props.children}
    </Dropzone>
  );
};

export default DropZoneComponent;
