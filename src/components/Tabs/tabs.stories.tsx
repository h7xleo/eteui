import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Tabs from "./Tabs";
import TabItem from "./TabItem";
import Icon from "../Icon/Icon";

const tabsMeta: Meta<typeof Tabs> = {
  title: "Tab",
  component: Tabs,
};

export default tabsMeta;

export const defaultTabs: StoryFn<typeof Tabs> = () => (
  <Tabs>
    <TabItem label="选项1">That's choice number one</TabItem>
    <TabItem label="选项2">That's choice number tow</TabItem>
    <TabItem label="选项3">That's choice number three</TabItem>
  </Tabs>
);
defaultTabs.storyName = "line Tabs";

export const cardTabs: StoryFn<typeof Tabs> = () => (
  <Tabs type="card">
    <TabItem label="选项1">That's choice number one</TabItem>
    <TabItem label="选项2">That's choice number tow</TabItem>
    <TabItem label="选项3">That's choice number three</TabItem>
  </Tabs>
);
cardTabs.storyName = "card Tabs";

export const disabledTabs: StoryFn<typeof Tabs> = () => (
  <Tabs>
    <TabItem label="选项1">That's choice number one</TabItem>
    <TabItem label="选项2" disabled>
      That's choice number tow
    </TabItem>
    <TabItem label="选项3">That's choice number three</TabItem>
  </Tabs>
);
disabledTabs.storyName = "disabled";

export const customTabs: StoryFn<typeof Tabs> = () => (
  <Tabs>
    <TabItem
      label={
        <>
          <Icon icon="home"></Icon>首页
        </>
      }
    >
      That's choice number one
    </TabItem>
    <TabItem label="选项2" disabled>
      That's choice number tow
    </TabItem>
    <TabItem label="选项3">That's choice number three</TabItem>
  </Tabs>
);
customTabs.storyName = "custom Tabs";
