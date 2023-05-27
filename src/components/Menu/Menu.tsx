import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./MenuItem";

type MenuType = "horizontal" | "vertical";
type selectCallback = (index: string) => void;

export interface MenuProps {
  /**默认active菜单项的索引值 */
  index?: string;
  /**自定义class */
  className?: string;
  /**菜单的类型 */
  mode?: MenuType;
  /**自定义style */
  style?: React.CSSProperties;
  /**默认展开的子菜单索引值，只在vertical下有效 */
  defaultOpenSubMenus?: string[];
  /**点击菜单项触发的回调函数 (index:number)=>void */
  onSelect?: selectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  index?: string;
  mode?: MenuType;
  defaultOpenSubMenus?: string[];
  onSelect?: selectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

/**
 * 为页面和功能提供导航的菜单列表。
 * ###如何使用
 * ```js
 * import { Menu } from "eteui"
 * ```
 * ###tips
 * 使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 */
const Menu: React.FC<MenuProps> = (props) => {
  const {
    index,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props;
  const [currentIndex, setIndex] = useState<string | undefined>(index);
  const classes = classNames("ete-menu", className, {
    "ete-menu-vertical": mode === "vertical",
    "ete-menu-horizontal": mode !== "vertical",
  });
  const handleSelect = (index: string) => {
    setIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const defaultContext = {
    index: currentIndex,
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  };
  const renderChild = () => {
    return React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem" || "SubMenu") {
        return React.cloneElement(childElement, { index: i + "" });
      } else {
        console.warn(
          "Warning: Menu has a child which is not a MenuItem or SubMenu component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={defaultContext}>
        {renderChild()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  index: "0",
};

export default Menu;
