import React, {
  ReactElement,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/Input";
import Icon from "../Icon/Icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/Transition";
import classNames from "classnames";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**输入框的宽度，单位px */
  width?: number;
  /**下拉框的最大高度，单位px */
  dropdownHeight?: number;
  /**返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise type DataSourceType = T & DataSourceObject */
  fetchSuggestions: (
    key: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /**点击建议项时触发的回调 */
  onSelect?: (item: DataSourceType) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 输入框自动完成功能
 *
 * ###如何使用
 * ```js
 * import { AutoComplete } from "eteui"
 * ```
 * ###tips
 * 支持键盘⬆ ⬇ Enter Escape
 */
const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    value,
    fetchSuggestions,
    onSelect,
    renderOption,
    width,
    dropdownHeight,
    size,
    ...restProps
  } = props;
  const [inputVal, setInputVal] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debounceVal = useDebounce(inputVal);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerFlag = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  // 利用自定义hooks，处理点击组件外部收起下拉框
  useClickOutside(elementRef, () => {
    setSuggestions([]);
    setShow(false);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setInputVal(val);
    triggerFlag.current = true;
  };

  useEffect(() => {
    if (debounceVal && triggerFlag.current) {
      setSuggestions([]);
      const result = fetchSuggestions(debounceVal);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setLoading(false);
          setSuggestions(res);
          if (res.length > 0) setShow(true);
        });
      } else {
        setSuggestions(result);
        if (result.length > 0) setShow(true);
      }
    } else {
      setShow(false);
    }
  }, [debounceVal]);

  const handleSelect = (item: DataSourceType) => {
    setInputVal(item.value);
    setSuggestions([]);
    setShow(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerFlag.current = false;
  };

  const changeHighlightIndex = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlightIndex(index);
  };
  // 键盘事件
  const handleKeyborad = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case "ArrowUp":
        changeHighlightIndex(highlightIndex - 1);
        break;
      case "ArrowDown":
        changeHighlightIndex(highlightIndex + 1);
        break;
      case "Escape":
        setShow(false);
        break;
      default:
        break;
    }
  };

  const renderCustom = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  /**
   * 渲染自定义下拉模版
   * @returns ReactElement
   */
  const renderDropdown = () => {
    return (
      <Transition
        nodeRef={nodeRef}
        in={loading || show}
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
        animation="ete-in-top"
      >
        <ul
          className="ete-autoComplete-list"
          ref={nodeRef}
          style={{ maxHeight: dropdownHeight + "px" }}
        >
          {loading && (
            <div className="ete-autoComplete-loadIcon">
              <Icon icon="spinner" spin></Icon>
            </div>
          )}
          {suggestions.map((item: DataSourceType, index: number) => {
            const liClass = classNames("ete-autoComplete-li", {
              [`ete-autoComplete-li-${size}`]: size,
              "ete-autoComplete-li-active": index === highlightIndex,
            });
            return (
              <li
                className={liClass}
                key={index}
                onClick={() => handleSelect(item)}
              >
                {renderCustom(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div
      className="ete-autoComplete"
      ref={elementRef}
      style={{ width: width + "px" }}
    >
      <Input
        value={inputVal}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyborad}
        size={size}
      />
      {renderDropdown()}
    </div>
  );
};

AutoComplete.defaultProps = {
  width: 300,
  dropdownHeight: 150,
};

export default AutoComplete;
