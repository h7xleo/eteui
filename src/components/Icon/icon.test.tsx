import React from "react";
import Icon from "./Icon";
import { render } from "@testing-library/react";

describe("test Icon Component", () => {
  it("Should render correct Icon", () => {
    const wrapper = render(<Icon icon="home"></Icon>);
    const iconWrapper = wrapper.getByTestId("test-icon-home");
    expect(iconWrapper).toBeInTheDocument();
    expect(iconWrapper).toHaveClass("ete-icon");
  });

  it("Icon also render correctly when the theme is present", () => {
    const wrapper = render(<Icon icon="home" theme="success"></Icon>);
    const iconWrapper = wrapper.getByTestId("test-icon-home");
    expect(iconWrapper).toBeInTheDocument();
    expect(iconWrapper).toHaveClass("ete-icon ete-icon-success");
  });
});
