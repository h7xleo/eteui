import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { config } from "react-transition-group";
import AutoComplete, { DataSourceType } from "./AutoComplete";

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];

const fetchSuggestions = (key: string) => {
  return testArray.filter((item) => item.value.includes(key));
};

const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{
    value: string;
    number: number;
  }>;
  return <>name: {itemWithNumber.value}</>;
};

const defaultProps = {
  onSelect: jest.fn(),
};

let wrapper: RenderResult, inputElement: HTMLInputElement;
describe("test AutoComplete Component", () => {
  beforeEach(() => {
    wrapper = render(
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        {...defaultProps}
        placeholder="autoComponent"
      />
    );
    inputElement = wrapper.getByPlaceholderText(
      "autoComponent"
    ) as HTMLInputElement;
  });

  it("Test the base autocomplete component", async () => {
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
    });
    expect(
      wrapper.container.querySelectorAll(".ete-autoComplete-li").length
    ).toEqual(2);
    fireEvent.click(wrapper.getByText("ab"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(inputElement.value).toEqual("ab");
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("Test support for keyboard events", async () => {
    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
    });
    const firstElement = wrapper.getByText("ab");
    const secondElement = wrapper.getByText("abc");
    // ArrowDown
    fireEvent.keyDown(inputElement, { key: "ArrowDown" });
    expect(firstElement).toHaveClass("ete-autoComplete-li-active");
    fireEvent.keyDown(inputElement, { key: "ArrowDown" });
    expect(firstElement).not.toHaveClass("ete-autoComplete-li-active");
    expect(secondElement).toHaveClass("ete-autoComplete-li-active");
    // ArrowUp
    fireEvent.keyDown(inputElement, { key: "ArrowUp" });
    expect(firstElement).toHaveClass("ete-autoComplete-li-active");
    expect(secondElement).not.toHaveClass("ete-autoComplete-li-active");
    // Enter
    fireEvent.keyDown(inputElement, { key: "Enter" });
    expect(defaultProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(inputElement.value).toEqual("ab");
    expect(firstElement).not.toBeInTheDocument();
  });

  it("Test Escape key", async () => {
    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
    });
    fireEvent.keyDown(inputElement, { key: "Escape" });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("Click outside should hide the dropdown", async () => {
    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("RenderOption should generate the right template", async () => {
    cleanup();
    const wrapper = render(
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        placeholder="autoComplete"
        renderOption={renderOption}
        {...defaultProps}
      />
    );
    const inputElement = wrapper.getByPlaceholderText("autoComplete");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("name: ab")).toBeInTheDocument();
    });
  });

  it("Test asynchronous event", async () => {
    cleanup();
    const asyncFetch = jest.fn((key: string) => {
      return Promise.resolve(
        testArray.filter((item) => item.value.includes(key))
      );
    });
    const wrapper = render(
      <AutoComplete
        fetchSuggestions={asyncFetch}
        placeholder="autoComplete"
        {...defaultProps}
      />
    );
    const inputElement = wrapper.getByPlaceholderText("autoComplete");
    fireEvent.change(inputElement, { target: { value: "a" } });
    await waitFor(() => {
      expect(asyncFetch).toHaveBeenCalled();
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
  });
});
