import React from "react";
import Select, { SelectProps } from "./Select";
import { config } from "react-transition-group";
import { fireEvent, render } from "@testing-library/react";
config.disabled = true;

const defaultProps: SelectProps = {
  phaceholder: "test",
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
  onClear: jest.fn(),
  onSelect: jest.fn(),
  options: [
    {
      value: 1,
      label: "test1",
    },
    {
      value: 2,
      label: "test2",
    },
  ],
};

describe("test Select Component", () => {
  it("Test the base Select component", () => {
    const wrapper = render(<Select {...defaultProps} />);
    const selectElement = wrapper.container.querySelector(
      ".ete-select"
    ) as HTMLElement;
    expect(selectElement).toBeInTheDocument();
    expect(wrapper.getByText("test")).toBeInTheDocument();
    expect(selectElement).not.toHaveClass("is-active is-disabled");
    expect(wrapper.queryByText("test1")).not.toBeInTheDocument();
    fireEvent.click(selectElement);
    expect(selectElement).toHaveClass("is-active");
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(true);
    expect(wrapper.getByText("test1")).toBeInTheDocument();
    fireEvent.click(wrapper.getByText("test1"));
    expect(wrapper.getByText("test1")).toBeInTheDocument();
    expect(wrapper.queryByText("test")).not.toBeInTheDocument();
    expect(wrapper.queryByText("test2")).not.toBeInTheDocument();
    expect(defaultProps.onVisibleChange).toHaveBeenCalledWith(false);
    expect(defaultProps.onChange).toHaveBeenCalledWith(
      { value: 1, label: "test1" },
      [{ value: 1, label: "test1" }]
    );
    expect(defaultProps.onSelect).toHaveBeenCalledWith(1);
    fireEvent.click(selectElement);
  });

  it("Test the multiple Select component", () => {
    const wrapper = render(<Select {...defaultProps} multiple />);
    const selectElement = wrapper.container.querySelector(
      ".ete-select"
    ) as HTMLElement;
    fireEvent.click(selectElement);
    fireEvent.click(wrapper.getByText("test1"));
    expect(wrapper.queryByText("test2")).not.toBeInTheDocument();
    fireEvent.click(selectElement);
    fireEvent.click(wrapper.getByText("test2"));
    expect(wrapper.getByText("test1")).toBeInTheDocument();
    expect(wrapper.getByText("test2")).toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith(
      { value: 2, label: "test2" },
      [
        {
          value: 1,
          label: "test1",
        },
        {
          value: 2,
          label: "test2",
        },
      ]
    );
  });

  it("Test clear value", () => {
    const wrapper = render(<Select {...defaultProps} multiple />);
    const selectElement = wrapper.container.querySelector(
      ".ete-select"
    ) as HTMLElement;
    fireEvent.click(selectElement);
    fireEvent.click(wrapper.getByText("test1"));
    fireEvent.click(wrapper.getByTestId("test-icon-times"));
    expect(defaultProps.onChange).toHaveBeenCalledWith(
      { value: 1, label: "test1" },
      [{ value: 1, label: "test1" }]
    );
    expect(wrapper.queryByText("test1")).not.toBeInTheDocument();
    // clear all
    fireEvent.click(selectElement);
    fireEvent.click(wrapper.getByText("test1"));
    fireEvent.click(selectElement);
    fireEvent.click(wrapper.getByText("test2"));
    fireEvent.click(wrapper.getByTestId("test-icon-times-circle"));
    expect(defaultProps.onClear).toHaveBeenCalledWith([
      {
        value: 1,
        label: "test1",
      },
      {
        value: 2,
        label: "test2",
      },
    ]);
  });

  it("Test disabled", () => {
    const wrapper = render(<Select {...defaultProps} disabled />);
    const selectElement = wrapper.container.querySelector(
      ".ete-select"
    ) as HTMLElement;
    expect(selectElement).toHaveClass("is-disabled");
    fireEvent.click(selectElement);
    expect(selectElement).not.toHaveClass("is-active");
    expect(wrapper.queryByText("test1")).not.toBeInTheDocument();
    expect(defaultProps.onVisibleChange).not.toBeCalled();
  });

  it("Click outside should hide the dropdown", async () => {
    const wrapper = render(<Select {...defaultProps} />);
    const selectElement = wrapper.container.querySelector(
      ".ete-select"
    ) as HTMLElement;
    fireEvent.click(selectElement);
    fireEvent.click(document);
    expect(wrapper.queryByText("test1")).not.toBeInTheDocument();
  });
});
