import React from "react";
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const defaultProps = {
  onSelect: jest.fn(),
};

const createStyleFile = () => {
  const cssFile: string = `
  .ete-subMenu {
    display:none;
  }
  .ete-subMenu.is-open{
    display:block;
  }
  `;
  const style = document.createElement("style");
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test the Menu component and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(
      <Menu index="0" className="test" {...defaultProps}>
        <MenuItem>active</MenuItem>
        <MenuItem disable>disable</MenuItem>
        <MenuItem>test</MenuItem>
        <SubMenu title="title">
          <MenuItem>subMenu</MenuItem>
        </SubMenu>
      </Menu>
    );
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disable");
  });

  it("Should render the correct default menu", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement.querySelectorAll(":scope>li").length).toEqual(4);
    expect(menuElement).toHaveClass("ete-menu test");
    expect(activeElement).toHaveClass("ete-menuItem is-active");
    expect(disabledElement).toHaveClass("ete-menuItem is-disable");
  });

  it("The correct change occurs when the menuItem is clicked", () => {
    const testElement = wrapper.getByText("test");
    fireEvent.click(testElement);
    expect(defaultProps.onSelect).toBeCalled();
    expect(testElement).toHaveClass("ete-menuItem is-active");
    expect(activeElement).not.toHaveClass("is-active");
  });

  it("The correct change occurs when clicking on a menuItem with the disbale attribute", () => {
    fireEvent.click(disabledElement);
    expect(defaultProps.onSelect).not.toBeCalled();
    expect(activeElement).toHaveClass("is-active");
    expect(disabledElement).not.toHaveClass("is-active");
  });

  it("Should render the correct menu when the value of mode is vertical", () => {
    cleanup();
    const wrapper = render(
      <Menu mode="vertical">
        <MenuItem>test</MenuItem>
      </Menu>
    );
    expect(wrapper.getByTestId("test-menu")).toBeInTheDocument();
    expect(wrapper.getByTestId("test-menu")).toHaveClass("ete-menu-vertical");
  });

  it("Should show dropDown items when hover on subMenu", () => {
    expect(wrapper.queryByText("subMenu")).not.toBeInTheDocument();
    const dropElement = wrapper.queryByText("title");
    fireEvent.mouseEnter(dropElement as HTMLElement);
    expect(wrapper.queryByText("subMenu")).toBeVisible();
    fireEvent.click(wrapper.getByText("subMenu"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropElement as HTMLElement);
    expect(wrapper.queryByText("subMenu")).not.toBeVisible();
  });

  it("Should show dropDown items when click on subMenu", () => {
    cleanup();
    const wrapper = render(
      <Menu mode="vertical" defaultOpenSubMenus={["1"]} {...defaultProps}>
        <SubMenu title="subMenu">
          <MenuItem>test</MenuItem>
        </SubMenu>
        <SubMenu title="show">
          <MenuItem>showTest</MenuItem>
        </SubMenu>
      </Menu>
    );
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText("test")).not.toBeInTheDocument();
    expect(wrapper.queryByText("showTest")).toBeVisible();
    const dropElement = wrapper.queryByText("subMenu");
    fireEvent.click(dropElement as HTMLElement);
    expect(wrapper.queryByText("test")).toBeVisible();
    fireEvent.click(wrapper.getByText("test"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith("0-0");
    fireEvent.click(dropElement as HTMLElement);
    expect(wrapper.queryByText("test")).not.toBeVisible();
  });

  it("render the correct subMenu when the value of dropdownIcon is fasle", () => {
    cleanup();
    const wrapper = render(
      <Menu>
        <SubMenu title="title" dropdownIcon={false}>
          <MenuItem>test</MenuItem>
        </SubMenu>
      </Menu>
    );
    expect(wrapper.queryByTestId("test-subMenu-icon")).not.toBeInTheDocument();
  });
});
