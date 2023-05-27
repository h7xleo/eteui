import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Progress from "./Progress";

const progressMeta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
  tags: ["autodocs"],
};

export default progressMeta;

type Story = typeof progressMeta;

export const defaultProgress: Story = {
  args: {
    percent: 30,
  },
};

export const themeProgress: StoryFn<typeof Progress> = () => (
  <>
    <Progress percent={60} theme="success"></Progress>
    <Progress percent={60} theme="primary"></Progress>
    <Progress percent={60} theme="warning"></Progress>
    <Progress percent={60} theme="danger"></Progress>
    <Progress percent={60} theme="secondary"></Progress>
    <Progress percent={60} theme="light"></Progress>
    <Progress percent={60} theme="info"></Progress>
    <Progress percent={60} theme="dark"></Progress>
  </>
);

themeProgress.storyName = "不同主题的进度条";
