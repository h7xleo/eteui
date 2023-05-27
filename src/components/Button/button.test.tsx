import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

const defaultProps = {
  onClick: jest.fn(),
};

describe("test Button component", () => {
  it("Should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>button</Button>);
    const element = wrapper.getByText("button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("ete-btn ete-btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("Should render the correct button base on different props", () => {
    const wrapper = render(
      <Button btnType="success" size="large" className="custom" circle>
        button
      </Button>
    );
    const element = wrapper.getByText("button");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass(
      "ete-btn ete-btn-success ete-btn-circle-large custom"
    );
  });

  it("Should be rendered correctly when btnType is link", () => {
    const wrapper = render(
      <Button btnType="link" href="http://url.com">
        link
      </Button>
    );
    const element = wrapper.getByText("link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("ete-btn ete-btn-link");
  });

  it("Should be rendered correctly when disable is true", () => {
    const wrapper = render(
      <Button disabled {...defaultProps}>
        button
      </Button>
    );
    const element = wrapper.getByText("button") as HTMLButtonElement;
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});
