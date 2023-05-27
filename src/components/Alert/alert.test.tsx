import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert from "./Alert";
import { config } from "react-transition-group";
config.disabled = true;

const defaultProps = {
  onClose: jest.fn(),
};

describe("test Alert component", () => {
  it("Should render the correct default alert", () => {
    const wrapper = render(<Alert title="title" {...defaultProps}></Alert>);
    expect(wrapper.getByText("title")).toBeInTheDocument();
    expect(wrapper.container.querySelector(".ete-alert")).toHaveClass(
      "ete-alert-default"
    );
    fireEvent.click(wrapper.getByTestId("test-alert-close"));
    expect(defaultProps.onClose).toHaveBeenCalled();
    // await wait(350);
    expect(wrapper.queryByText("title")).not.toBeInTheDocument();
  });

  it("Should render the correct alert base on different props", () => {
    const wrapper = render(
      <Alert
        title="title"
        description="desc"
        type="success"
        closable={false}
      ></Alert>
    );
    expect(wrapper.getByText("title")).toBeInTheDocument();
    expect(wrapper.getByText("desc")).toBeInTheDocument();
    expect(wrapper.queryByTestId("test-alert-close")).not.toBeInTheDocument();
    expect(wrapper.container.querySelector(".ete-alert")).toHaveClass(
      "ete-alert-success"
    );
    expect(wrapper.container.querySelector(".ete-alert-title")).toHaveClass(
      "ete-alert-title-bold"
    );
  });
});
