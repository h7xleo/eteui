import React from "react";
import classNames from "classnames";

type ButtonSize = "large" | "small";
type ButtonType =
  | "primary"
  | "default"
  | "danger"
  | "link"
  | "success"
  | "warning"
  | "dashed";

interface BaseProps {
  /**自定义class */
  className?: string;
  /**是否禁用按钮 */
  disabled?: boolean;
  /**按钮的尺寸 */
  size?: ButtonSize;
  /**按钮的类型 */
  btnType?: ButtonType;
  children?: React.ReactNode;
  /**跳转的地址，当btnType值为link时有效 */
  href?: string;
  /**是否设置为圆形 */
  circle?: boolean;
}
type NavtiveButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = Partial<NavtiveButtonProps & AnchorButtonProps>;

/**
 * 按钮用于开始一个即时操作。
 *
 * ###如何使用
 * ```js
 * import { Button } from "eteui"
 * ```
 * ###tips
 * 支持 HTML button 和 a 链接的所有属性，如click事件
 */
const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    btnType,
    children,
    href,
    circle,
    ...rest
  } = props;
  const classes = classNames("ete-btn", className, {
    [`ete-btn-${btnType}`]: btnType,
    [`ete-btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
    [`ete-btn-circle`]: circle && !size,
    [`ete-btn-circle-${size}`]: circle && size,
  });

  if (btnType === "link") {
    return (
      <a className={classes} href={href ? href : "#javascript;"} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <button id="btn" className={classes} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
  circle: false,
  children: <>button</>,
};

export default Button;
