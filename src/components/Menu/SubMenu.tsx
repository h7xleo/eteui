import React, { useContext, useState, useRef } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";
import Icon from "../Icon/Icon";
import Transition from "../Transition/Transition";

export interface subMenuProps {
  /**菜单项的索引值，自动生成 */
  index?: string;
  /**菜单项的标题 */
  title?: string;
  /**自定义class */
  className?: string;
  children?: React.ReactNode;
  /**是否显示右侧图标 */
  dropdownIcon?: boolean;
}

const SubMenu: React.FC<subMenuProps> = (props) => {
  const { index, title, className, children, dropdownIcon } = props;
  const nodeRef = useRef(null);
  const context = useContext(MenuContext);
  const initial =
    context.mode === "vertical"
      ? context.defaultOpenSubMenus?.includes(index as string)
      : false;
  const [show, setShow] = useState<boolean>(initial as boolean);
  const classes = classNames("ete-menuItem ete-subMenuItem", className, {
    "is-active": context.index === index,
    "is-vertical": context.mode === "vertical",
    "is-verticalAndOpen": context.mode === "vertical" && show,
  });

  const handleClick = (e: React.MouseEvent) => {
    setShow(!show);
  };
  const handleHover = (e: React.MouseEvent, target: boolean) => {
    setShow(target);
  };

  const clickEvent =
    context.mode === "vertical" ? { onClick: handleClick } : {};
  const hoverEvent =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleHover(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleHover(e, false);
          },
        }
      : {};

  const renderChild = () => {
    const childs = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.warn(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    const childClasses = classNames("ete-subMenu", {
      "is-open": show,
    });

    return (
      <Transition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        animation="ete-in-top"
      >
        <ul ref={nodeRef} className={childClasses}>
          {childs}
        </ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="ete-subMenu-title" {...clickEvent}>
        {title}
        {dropdownIcon && (
          <Icon
            icon="chevron-down"
            size="sm"
            className="ete-subMenu-Icon"
            data-testid="test-subMenu-icon"
          ></Icon>
        )}
      </div>
      {renderChild()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

SubMenu.defaultProps = {
  dropdownIcon: true,
};

export default SubMenu;
