import React, { InputHTMLAttributes, ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/Icon";

type InputSize = "large" | "small";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**设置input的大小 */
  size?: InputSize;
  /**input右侧悬浮图标，所支持图标详见Icon */
  icon?: IconProp;
  /**添加前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀，用于配置一些固定组合 */
  append?: string | ReactElement;
  /**是否禁用 */
  disabled?: boolean;
  /**input整体的宽度，单位px */
  width?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ###如何使用
 * ```js
 * import { Input } from "eteui"
 * ```
 *
 * ###tips
 * 未标注的属性与React自带Input的属性一致
 */
const Input: React.FC<InputProps> = (props) => {
  // 取出各种属性
  const { size, icon, prepend, append, disabled, width, ...restProps } = props;

  // 根据属性计算不同的class
  const wrapperClass = classNames("ete-input-group", {
    "ete-input-prepend-group": prepend,
    "ete-input-append-group": append,
  });
  const prependClass = classNames("ete-input-prepend", {
    [`ete-input-prependAndappend-${size}`]: size,
  });
  const appendClass = classNames("ete-input-append", {
    [`ete-input-prependAndappend-${size}`]: size,
  });
  const classes = classNames("ete-input-inner", {
    [`ete-input-inner-${size}`]: size,
    [`ete-input-inner-pr`]: icon,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    // 根据属性渲染不同的节点
    <div className={wrapperClass} style={{ width: width + "px" }}>
      {prepend && <div className={prependClass}>{prepend}</div>}
      <div className="ete-input-wrapper">
        <input className={classes} {...restProps} disabled={disabled} />
        {icon && (
          <div className="ete-input-icon-wrapper">
            <Icon icon={icon} title={`title-${icon}`}></Icon>
          </div>
        )}
      </div>
      {append && <div className={appendClass}>{append}</div>}
    </div>
  );
};

export default Input;
