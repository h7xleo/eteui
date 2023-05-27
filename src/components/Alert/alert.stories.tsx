import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Alert from "./Alert";

const alertMeta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default alertMeta;

export const defaultAlert: StoryFn<typeof Alert> = ({ title, ...rest }) => (
  <Alert title="this is title" {...rest}></Alert>
);
defaultAlert.storyName = "Default";

export const alertWithType: StoryFn<typeof Alert> = () => (
  <>
    <Alert type="default" title="default"></Alert>
    <Alert type="success" title="success"></Alert>
    <Alert type="warning" title="warning"></Alert>
    <Alert type="danger" title="danger"></Alert>
  </>
);

alertWithType.storyName = "Type";

export const notClose: StoryFn<typeof Alert> = () => (
  <Alert title="Don't have close icon" closable={false}></Alert>
);
notClose.storyName = "Closable with false";

export const descAlert: StoryFn<typeof Alert> = () => (
  <Alert title="this is title" description="this is description"></Alert>
);
descAlert.storyName = "Closable with false";
