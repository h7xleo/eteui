import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./Upload";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

const uploadMeta: Meta<typeof Upload> = {
  title: "Upload",
  component: Upload,
  tags: ["autodocs"],
};

const beforeUpload = (file: File) => {
  if (file.size > 50 * 1024) {
    alert("file size > 50");
    return false;
  }
  return true;
};

// const filePromise = (file: File) => {
//   const fileP = new File([file], "new_name.txt", { type: file.type });
//   return Promise.resolve(fileP);
// };

export default uploadMeta;

type Story = typeof uploadMeta;

export const sample: StoryFn<typeof Upload> = () => {
  return (
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
      <Button btnType="default">
        <Icon icon="upload" />
        上传文件
      </Button>
    </Upload>
  );
};

sample.storyName = "示例";

export const size: StoryFn<typeof Upload> = () => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    beforeUpload={beforeUpload}
  >
    <Button btnType="default">
      <Icon icon="upload" />
      不能大于50kb
    </Button>
  </Upload>
);

export const drager: StoryFn<typeof Upload> = () => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    drag={true}
  ></Upload>
);

drager.storyName = "拖拽上传";
