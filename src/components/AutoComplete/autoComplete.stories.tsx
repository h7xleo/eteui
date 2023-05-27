import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import AutoComplete, { DataSourceType } from "./AutoComplete";

const autoCompleteMeta: Meta<typeof AutoComplete> = {
  title: "AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
};

export default autoCompleteMeta;

interface defaultData {
  time: string;
  value: string;
}

const list = [
  { value: "坤坤", time: "两年半" },
  { value: "坤哥", time: "两年半" },
  { value: "只因坤", time: "两年半" },
];

export const defaultAC: StoryFn<typeof AutoComplete> = () => {
  const handleFetch = (key: string) => {
    return list.filter((p) => p.value.includes(key));
  };
  return (
    <AutoComplete fetchSuggestions={handleFetch} placeholder="请输入'坤'" />
  );
};

defaultAC.storyName = "示例";

export const customAC: StoryFn<typeof AutoComplete> = () => {
  const handleFetch = (key: string) => {
    return list.filter((p) => p.value.includes(key));
  };
  const renderOption = (item: DataSourceType) => {
    const kun = item as DataSourceType<defaultData>;
    return (
      <>
        <b>名字: {kun.value}</b>
        <br />
        <span>练习时长: {kun.time}</span>
      </>
    );
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
      placeholder="请输入'坤'"
    />
  );
};

customAC.storyName = "自定义下拉模版";

export const asyncAC: StoryFn<typeof AutoComplete> = () => {
  const handleFetch = (key: string) => {
    return fetch(`https://api.github.com/search/users?q=${key}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item) => ({ value: item.login, ...item }));
      });
  };
  return <AutoComplete fetchSuggestions={handleFetch} placeholder="请输入" />;
};

asyncAC.storyName = "异步搜索";
