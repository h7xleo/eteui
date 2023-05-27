import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const menuMeta: Meta<typeof Menu> = {
  title: "Menu",
  component: Menu,
};

export default menuMeta;

export const defaultMenu: StoryFn<typeof Menu> = () => (
  <Menu index="0">
    <MenuItem>选项1</MenuItem>
    <MenuItem>选项2</MenuItem>
    <SubMenu title="选项3">
      <MenuItem>子选项1</MenuItem>
      <MenuItem>子选项2</MenuItem>
    </SubMenu>
  </Menu>
);
defaultMenu.storyName = "horizontal";

export const verticalMenu: StoryFn<typeof Menu> = () => (
  <Menu mode="vertical">
    <MenuItem>选项1</MenuItem>
    <MenuItem>选项2</MenuItem>
    <SubMenu title="选项3">
      <MenuItem>子选项1</MenuItem>
      <MenuItem>子选项2</MenuItem>
    </SubMenu>
  </Menu>
);
verticalMenu.storyName = "vertical";

export const disabledMenu: StoryFn<typeof Menu> = () => (
  <Menu index="0">
    <MenuItem>选项1</MenuItem>
    <MenuItem disable>选项2</MenuItem>
    <SubMenu title="选项3">
      <MenuItem>子选项1</MenuItem>
      <MenuItem>子选项2</MenuItem>
    </SubMenu>
  </Menu>
);
disabledMenu.storyName = "disabled";

export const openMenu: StoryFn<typeof Menu> = () => (
  <Menu mode="vertical" defaultOpenSubMenus={["2"]}>
    <MenuItem>选项1</MenuItem>
    <MenuItem disable>选项2</MenuItem>
    <SubMenu title="选项3">
      <MenuItem>子选项1</MenuItem>
      <MenuItem>子选项2</MenuItem>
    </SubMenu>
  </Menu>
);
openMenu.storyName = "默认展开";
