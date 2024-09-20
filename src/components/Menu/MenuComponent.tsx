import { Menu } from "@mantine/core";
import React from "react";

interface Props extends React.PropsWithChildren {
  target: React.ReactNode;
}

const MenuComponent = (props: Props) => {
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>{props.target}</Menu.Target>
      <Menu.Dropdown >{props.children}</Menu.Dropdown>
    </Menu>
  );
};

export default MenuComponent;
