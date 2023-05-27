import React from "react";
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import Tabs from "./Tabs";
import TabItem from "./TabItem";

const defaultProps = {
  onSelect: jest.fn(),
};

let wrapper: RenderResult,
  tabsElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("Test the Tabs component and TabItem component", () => {
  beforeEach(() => {
    wrapper = render(
      <Tabs index={0} {...defaultProps} className="test">
        <TabItem label="title1">tabItem1</TabItem>
        <TabItem label="title2" disabled>
          tabItem2
        </TabItem>
        <TabItem label="title3">tabItem3</TabItem>
      </Tabs>
    );
    tabsElement = wrapper.getByTestId("test-tab");
    activeElement = wrapper.getByText("title1");
    disabledElement = wrapper.getByText("title2");
  });

  it("Should render the correct default tabs", () => {
    expect(tabsElement).toBeInTheDocument();
    expect(tabsElement).toHaveClass("test");
    expect(tabsElement.getElementsByTagName("li").length).toEqual(3);
    expect(tabsElement.getElementsByTagName("ul")[0]).toHaveClass(
      "ete-tabs-nav-line"
    );
    expect(activeElement).toHaveClass("is-active");
    expect(disabledElement).toHaveClass("is-disabled");
    expect(wrapper.queryByText("tabItem1")).toBeInTheDocument();
  });

  it("The correct change occurs when the tabItem is clicked", () => {
    fireEvent.click(wrapper.getByText("title3"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith(2);
    expect(activeElement).not.toHaveClass("is-active");
    expect(wrapper.queryByText("tabItem1")).not.toBeInTheDocument();
    expect(wrapper.getByText("title3")).toHaveClass("is-active");
    expect(wrapper.queryByText("tabItem3")).toBeInTheDocument();
  });

  it("The correct change occurs when clicking on a menuItem with the disbale attribute", () => {
    fireEvent.click(disabledElement);
    expect(defaultProps.onSelect).not.toBeCalled();
    expect(activeElement).toHaveClass("is-active");
    expect(disabledElement).not.toHaveClass("is-active");
  });

  it("Should render the correct tab when the value of type is card", () => {
    cleanup();
    const wrapper = render(
      <Tabs type="card">
        <TabItem label="title">tabItem1</TabItem>
      </Tabs>
    );
    const TabElement = wrapper.getByTestId("test-tab");
    expect(TabElement.getElementsByTagName("li").length).toEqual(1);
    expect(TabElement.getElementsByTagName("ul")[0]).toHaveClass(
      "ete-tabs-nav-card"
    );
  });
});
