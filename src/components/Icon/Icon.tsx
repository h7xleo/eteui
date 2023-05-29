import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export type ThemeType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  /**icon的主题，根据主题显示不同的颜色 */
  theme?: ThemeType;
}

/**
 * 语义化的图标库，基于react-fontawesome
 *
 * 支持react-fontawesome的所有属性，详见https://fontawesome.com/
 * ###如何使用
 * ```js
 * import { Icon } from "eteui"
 * ```
 * ###tips
 * 拥有1390个图标，具体名称详见https://fontawesome.com/search?o=r&m=free&s=solid
 */
const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, icon, ...restProps } = props;
  const classes = classNames("ete-icon", className, {
    [`ete-icon-${theme}`]: theme,
  });
  return (
    <FontAwesomeIcon
      className={classes}
      icon={icon}
      {...restProps}
      data-testid={`test-icon-${icon}`}
    ></FontAwesomeIcon>
  );
};

export default Icon;
