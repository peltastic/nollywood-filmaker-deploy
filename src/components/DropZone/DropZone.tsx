import React, { PropsWithChildren } from "react";

import { Dropzone } from "@mantine/dropzone";

interface Props extends PropsWithChildren {
  setFiles: (file: File[]) => void;
  setSingleFile?: (file: File) => void;
  single?: boolean;
}

const DropZoneComponent = (props: Props) => {
  return (
    <Dropzone
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
