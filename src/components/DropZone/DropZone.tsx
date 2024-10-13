import React, { PropsWithChildren } from "react";

import { Dropzone } from "@mantine/dropzone";

interface Props extends PropsWithChildren {}

const DropZoneComponent = (props: Props) => {
  return (
    <Dropzone onDrop={(files) => console.log(files)}>{props.children}</Dropzone>
  );
};

export default DropZoneComponent;
