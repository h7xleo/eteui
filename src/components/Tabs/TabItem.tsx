import React from "react";
// import classNames from "classnames";

export interface TabItemProps {
  /**选项tab上的内容 */
  label?: string | React.ReactElement;
  /**是否禁用 */
  disabled?: boolean;
  children?: React.ReactNode;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

TabItem.displayName = "TabItem";

export default TabItem;
