import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input from "./Input";

const inputMeta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
};

export default inputMeta;

type Story = typeof inputMeta;

export const defaultInput: Story = {
  args: {
    placeholder: "请输入Input内容",
    width: 300,
  },
};

export const size: StoryFn<typeof Input> = () => (
  <>
    <Input width={300} size="small" placeholder="小号Input" />
    <Input width={300} placeholder="默认大小" />
    <Input width={300} size="large" placeholder="大号input" />
  </>
);

export const disabledInput: Story = {
  args: {
    disabled: true,
    placeholder: "被禁用的Input",
    width: 300,
  },
};

export const iconInput: StoryFn = () => (
  <Input placeholder="带图标的Input" icon="home" width={300} />
);
iconInput.storyName = "带图标的Input";

export const preInput: StoryFn = () => (
  <Input placeholder="带前缀的Input" prepend="https://" width={300} />
);
preInput.storyName = "带前缀的Input";

export const apInput: StoryFn = () => (
  <Input placeholder="带后缀的Input" append=".com" width={300} />
);
apInput.storyName = "带后缀的Input";
