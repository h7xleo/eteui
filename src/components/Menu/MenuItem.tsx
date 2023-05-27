import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

export interface MenuItemProps {
  /**菜单项的索引值，自动生成 */
  index?: string;
  /**自定义class */
  className?: string;
  /**自定义style */
  style?: React.CSSProperties;
  /**是否禁用 */
  disable?: boolean;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, style, disable, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("ete-menuItem", className, {
    "is-disable": disable,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disable && typeof index === "string") {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
