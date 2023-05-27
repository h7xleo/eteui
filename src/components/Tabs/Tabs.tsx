import React, { ReactNode, useState } from "react";
import classNames from "classnames";
import { TabItemProps } from "./TabItem";

type TabsType = "line" | "card";

export interface TabsProps {
  /**当前激活tab面板的索引值，默认为0 */
  index?: number;
  /**自定义class */
  className?: string;
  /**Tabs的样式类型，默认为line */
  type?: TabsType;
  /**点击Tabs触发的回调函数 */
  onSelect?: (index: number) => void;
  children?: ReactNode;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { index, className, type, onSelect, children } = props;
  const [currentIndex, setIndex] = useState(index);
  const classes = classNames("ete-tabs", className);
  const navClass = classNames("ete-tabs-nav", {
    [`ete-tabs-nav-${type}`]: type,
  });

  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disable: boolean | undefined
  ) => {
    if (!disable) {
      if (onSelect) {
        onSelect(index);
      }
      setIndex(index);
    }
  };

  const renderTabsItem = () => {
    return React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      if (childElement.type.displayName === "TabItem") {
        const { label, disabled } = childElement.props;
        const liClass = classNames("ete-tabs-nav-li", {
          "is-active": currentIndex === i && !disabled,
          "is-disabled": disabled,
        });
        return (
          <li className={liClass} onClick={(e) => handleClick(e, i, disabled)}>
            {label}
          </li>
        );
      } else {
        console.warn(
          "Warning: Tabs has a child which is not a TabItem component"
        );
      }
    });
  };

  const renderContent = () => {
    return React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      if (childElement.type.displayName === "TabItem" && i === currentIndex) {
        return child;
      }
    });
  };

  return (
    <div className={classes} data-testid="test-tab">
      <ul className={navClass}>{renderTabsItem()}</ul>
      <div className="ete-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  type: "line",
  index: 0,
};

export default Tabs;
