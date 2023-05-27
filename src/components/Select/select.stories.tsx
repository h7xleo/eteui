import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Select from "./Select";

const selectMeta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  tags: ["autodocs"],
};

export default selectMeta;
const options = [
  {
    value: 1,
    label: "option one",
  },
  {
    value: 2,
    label: "option two",
  },
  {
    value: 3,
    label: "option three",
  },
];

export const defaultSelect: StoryFn<typeof Select> = () => (
  <Select options={options}></Select>
);

export const multipleSelect: StoryFn<typeof Select> = () => (
  <Select options={options} multiple phaceholder="多选" />
);

multipleSelect.storyName = "多选的Select";

export const dvSelect: StoryFn<typeof Select> = () => (
  <Select options={options} defaultValue={"option one"} />
);

dvSelect.storyName = "有默认值的Select";

export const disabledSelect: StoryFn<typeof Select> = () => (
  <Select options={options} disabled phaceholder="被禁用了" />
);

disabledSelect.storyName = "禁用的Select";
