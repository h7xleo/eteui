import React, { useRef, useState, MouseEvent, useEffect } from "react";
import Icon from "../Icon/Icon";
import classNames from "classnames";
import Transition from "../Transition/Transition";
import useClickOutside from "../../hooks/useClickOutside";

interface Option {
  value: any;
  label: string;
}

export interface SelectProps {
  /**指定默认选中的条目 */
  defaultValue?: string | string[];
  /**选择框默认文字 */
  phaceholder?: string;
  /**是否支持多选 */
  multiple?: boolean;
  /**数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 */
  options?: { value: any; label: string }[];
  /**是否显示下拉箭头 */
  showArrow?: boolean;
  /**选择框的宽度，单位px */
  width?: number;
  /**是否禁用 */
  disabled?: boolean;
  /**是否支持全部清除 */
  allowClear?: boolean;
  /**选中值发生变化时触发的回调 */
  onChange?: (
    selectValue: { value: any; label: string },
    selectValues: { value: any; label: string }[]
  ) => void;
  /**下拉框出现/隐藏时触发的回调 */
  onVisibleChange?: (visible: boolean) => void;
  /**清除全部条目时的回调 */
  onClear?: (option: { value: any; label: string }[]) => void;
  /**选中条目时的回调，参数为option的value */
  onSelect?: (value: any) => void;
}

/**
 * 下拉选择器。
 *
 * ###如何使用
 * ```js
 * import { Select } from "eteui"
 * ```
 */
const Select: React.FC<SelectProps> = (props) => {
  const {
    defaultValue,
    width,
    phaceholder,
    multiple,
    showArrow,
    options,
    disabled,
    allowClear,
    onVisibleChange,
    onChange,
    onClear,
    onSelect,
  } = props;
  const [valueList, setValueList] = useState<Option[]>(() => {
    if (defaultValue && options) {
      if (typeof defaultValue === "string") {
        let item;
        options.forEach((i: Option) => {
          if (i.label === defaultValue) {
            item = i;
          }
        });
        if (item) {
          return [{ value: item.value, label: item.label }];
        } else {
          return [];
        }
      } else {
        let itemArr: any = [];
        defaultValue.forEach((item) => {
          options.forEach((i: Option) => {
            if (i.label === item) {
              itemArr.push(i);
            }
          });
        });
        if (itemArr.length) {
          return itemArr;
        } else {
          return [];
        }
      }
    } else {
      return [];
    }
  });
  const [show, setShow] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useClickOutside(elementRef, () => {
    setShow(false);
    if (onVisibleChange) {
      onVisibleChange(false);
    }
  });

  const renderMultipeNode = () => {
    return valueList.map((val, index) => (
      <span className="ete-select-tag" key={`tag-${index}`}>
        <span>{val.label}</span>
        <div className="ete-select-tagIcon">
          <Icon icon="times" onClick={(e) => handleDelete(e, val)} />
        </div>
      </span>
    ));
  };

  const handleShow = () => {
    if (!disabled) {
      setShow(!show);
      if (onVisibleChange) {
        onVisibleChange(!show);
      }
    }
  };

  const handleSelect = (option: Option) => {
    if (!multiple || valueList.length === 0) {
      setValueList([option]);
      if (onChange) {
        onChange(option, [option]);
      }
      if (onSelect) {
        onSelect(option.value);
      }
    } else {
      let newValueList = valueList;
      let flag: boolean = false;
      valueList.forEach((i, index) => {
        if (i.value === option.value) {
          newValueList.splice(index, 1);
          flag = true;
        }
      });
      if (!flag) {
        newValueList.push(option);
        if (onSelect) {
          onSelect(option.value);
        }
      }
      setValueList(newValueList);
      if (onChange) {
        onChange(option, newValueList);
      }
    }
  };

  const handleDelete = (e: MouseEvent, option: Option) => {
    e.stopPropagation();
    setValueList((pre) => {
      const newVal = pre.filter((i) => i.value !== option.value);
      if (onChange) {
        onChange(option, newVal);
      }
      return newVal;
    });
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    setValueList([]);
    if (onClear) {
      onClear(valueList);
    }
  };

  const classes = classNames("ete-select", {
    "is-active": show,
    "is-disabled": disabled,
  });
  const arrowClasses = classNames("ete-select-arrowIcon", {
    "ete-select-arrowIcon-none": allowClear,
  });

  return (
    <div
      className={classes}
      style={{ width: `${width}px` }}
      onClick={handleShow}
      ref={elementRef}
    >
      <div
        className="ete-select-inner"
        style={{ width: showArrow ? "calc(100% - 20px)" : "100%" }}
      >
        {valueList.length !== 0 && !multiple && (
          <span className="ete-select-inner-single">{valueList[0].label}</span>
        )}
        {valueList.length !== 0 && multiple && renderMultipeNode()}
        {valueList.length === 0 && (
          <span className="ete-select-inner-phaceholder">{phaceholder}</span>
        )}
      </div>
      {showArrow && (
        <div className={arrowClasses}>
          <Icon icon="chevron-down" />
        </div>
      )}
      {allowClear && (
        <div className="ete-select-clearIcon">
          <Icon icon="times-circle" theme="secondary" onClick={handleClear} />
        </div>
      )}
      {options && (
        <Transition
          nodeRef={nodeRef}
          in={show}
          timeout={300}
          animation="ete-in-top"
        >
          <ul className="ete-select-options" ref={nodeRef}>
            {options.map((item, index) => {
              let activeFlag: boolean = false;
              valueList.forEach((i) => {
                if (i.value === item.value) {
                  activeFlag = true;
                }
              });
              const optionClass = classNames("ete-select-option", {
                "is-active": activeFlag,
              });
              return (
                <li
                  className={optionClass}
                  key={index}
                  onClick={() => handleSelect(item)}
                >
                  <span
                    className="ete-select-option-inner"
                    style={{ width: multiple ? "calc(100% - 20px)" : "100%" }}
                  >
                    {item.label}
                  </span>
                  {multiple && activeFlag && (
                    <span className="ete-select-option-icon">
                      <Icon icon="check" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Transition>
      )}
    </div>
  );
};

Select.defaultProps = {
  phaceholder: "请选择",
  width: 300,
  multiple: false,
  showArrow: true,
  allowClear: true,
};

export default Select;
