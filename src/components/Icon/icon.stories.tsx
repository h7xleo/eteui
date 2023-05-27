import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Icon from "./Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const iconMeta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
  tags: ["autodocs"],
};

export default iconMeta;

type Story = typeof iconMeta;

const iconList = [
  "house",
  "phone",
  "images",
  "bars",
  "envelope",
  "poo",
  "hippo",
  "bell",
  "bolt",
];

export const icons: StoryFn<typeof Icon> = () => (
  <>
    {iconList.map((i, index) => (
      <Icon icon={i as IconProp} size="4x" key={index}></Icon>
    ))}
  </>
);
icons.storyName = "sample";

export const theme: StoryFn<typeof Icon> = () => (
  <>
    <Icon icon="home" size="4x" theme="primary"></Icon>
    <Icon icon="home" size="4x" theme="success"></Icon>
    <Icon icon="home" size="4x" theme="warning"></Icon>
    <Icon icon="home" size="4x" theme="danger"></Icon>
    <Icon icon="home" size="4x" theme="info"></Icon>
    <Icon icon="home" size="4x" theme="dark"></Icon>
    <Icon icon="home" size="4x" theme="secondary"></Icon>
  </>
);
theme.storyName = "Different theme";

export const dif: StoryFn<typeof Icon> = () => (
  <>
    <Icon icon="spinner" size="3x" spin></Icon>
    <Icon icon="spinner" size="3x" pulse></Icon>
  </>
);
dif.storyName = "更多行为的Icon";
