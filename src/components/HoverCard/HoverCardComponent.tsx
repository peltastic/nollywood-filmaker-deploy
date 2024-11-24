import { HoverCard } from "@mantine/core";
import React from "react";

type Props = {
  closeDelay?: number;
  children: React.ReactNode;
  target: React.ReactNode
};

const HoverCardComponent = (props: Props) => {
  return (
    <HoverCard shadow="md"closeDelay={props.closeDelay}>
      <HoverCard.Target>{props.target}</HoverCard.Target>
      <HoverCard.Dropdown>
        {props.children}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default HoverCardComponent;
