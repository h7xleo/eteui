// import "@testing-library/jest-dom/extend-expect";
import React from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import Upload, { UploadProps } from "./Upload";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  beforeUpload: jest.fn(() => true),
  drag: true,
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".ete-upload-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Click to upload") as HTMLElement;
  });
  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // test BeforeUpload
    expect(testProps.beforeUpload).toBeCalled();
    expect(wrapper.getByTestId("test-icon-spinner")).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
      expect(wrapper.getByTestId("test-icon-check-circle")).toBeInTheDocument();
    });
    // test onSuccess
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      "cool",
      expect.objectContaining({
        raw: testFile,
        status: "success",
        response: "cool",
        name: "test.png",
      })
    );
    // test onChange
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        response: "cool",
        name: "test.png",
      })
    );

    //remove the uploaded file
    expect(wrapper.getByTestId("upload-remove-icon")).toBeInTheDocument();
    fireEvent.click(wrapper.getByTestId("upload-remove-icon"));
    expect(queryByText("test.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  it("drag and drop files should works fine", async () => {
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-drager");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-drager");
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile],
      },
    });
    await waitFor(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      "cool",
      expect.objectContaining({
        raw: testFile,
        status: "success",
        response: "cool",
        name: "test.png",
      })
    );
  });
});
