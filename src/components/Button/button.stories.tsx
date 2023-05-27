import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Button from "./Button";

const buttonMeta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
};

export default buttonMeta;

type Story = typeof buttonMeta;

export const defaultButton: StoryFn<typeof Button> = (args) => (
  <Button {...args}>default Button</Button>
);
defaultButton.storyName = "Default";

export const buttonWithType: StoryFn<typeof Button> = () => (
  <>
    <Button>default</Button>
    <Button btnType="primary">primary</Button>
    <Button btnType="success">success</Button>
    <Button btnType="warning">warning</Button>
    <Button btnType="danger">danger</Button>
    <Button btnType="dashed">dashed</Button>
    <Button btnType="link">link</Button>
  </>
);
buttonWithType.storyName = "Type";

export const buttonWithSize: StoryFn<typeof Button> = () => (
  <>
    <Button size="small" />
    <Button />
    <Button size="large" />
  </>
);
buttonWithSize.storyName = "Size";

export const circle: Story = {
  args: {
    children: "button",
    circle: true,
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
  },
};
