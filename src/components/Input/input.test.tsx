import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

const defaultProps = {
  onChange: jest.fn(),
};

describe("test Input Component", () => {
  it("Should render the correct default Input", () => {
    const wrapper = render(<Input placeholder="test" {...defaultProps} />);
    const inputElement = wrapper.getByPlaceholderText(
      "test"
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("ete-input-inner");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual("test");
  });

  it("The input should be rendered correctly when the icon is present", () => {
    const wrapper = render(<Input placeholder="icon" icon="home" />);
    const inputElement = wrapper.getByPlaceholderText(
      "icon"
    ) as HTMLInputElement;
    const iconElement = wrapper.getByTestId("test-icon-home");
    expect(inputElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("ete-input-inner-pr");
  });

  it("The input should be rendered correctly when the size is present", () => {
    const wrapper = render(<Input placeholder="large" size="large" />);
    const inputElement = wrapper.getByPlaceholderText(
      "large"
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("ete-input-inner-large");
  });

  it("The input should be rendered correctly when the disabled is true", () => {
    const wrapper = render(<Input placeholder="disabled" disabled />);
    const inputElement = wrapper.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.disabled).toBeTruthy();
  });

  it("The input should be rendered correctly when the prepend and append is present", () => {
    const wrapper = render(
      <Input placeholder="test" prepend="https://" append=".com" />
    );
    const inputElement = wrapper.getByPlaceholderText(
      "test"
    ) as HTMLInputElement;
    const preElement = wrapper.getByText("https://");
    const apElement = wrapper.getByText(".com");
    expect(inputElement).toBeInTheDocument();
    expect(preElement).toBeInTheDocument();
    expect(apElement).toBeInTheDocument();
    expect(wrapper.container.querySelector(".ete-input-group")).toHaveClass(
      "ete-input-prepend-group ete-input-append-group"
    );
  });
});
