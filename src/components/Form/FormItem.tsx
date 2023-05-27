import classNames from "classnames";
import React, { useContext, useEffect } from "react";
import { FormContext } from "./Form";
import { CustomRule } from "./useStore";

export interface FormItemProps {
  /**字段名 */
  name: string;
  /**标签的文本 */
  label?: string;
  children?: React.ReactNode;
  /**子节点的值的属性，如 checkbox 的是 'checked' */
  valuePropName?: string;
  /**设置收集字段值变更的时机 */
  trigger?: string;
  /**校验规则，设置字段的校验逻辑。具体规则参考async-validator库 */
  rules?: CustomRule[];
  /**设置字段校验的时机 */
  validateTrigger?: string;
  /**设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any;
}

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    rules,
    validateTrigger,
    getValueFromEvent,
  } = props as SomeRequired<
    FormItemProps,
    "valuePropName" | "getValueFromEvent" | "trigger" | "validateTrigger"
  >;
  const { dispatch, fields, initialValues, validateField } =
    useContext(FormContext);

  // 挂载时完成数据注册
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || "";
    dispatch({
      type: "addField",
      name,
      value: {
        label,
        name,
        value,
        rules: rules || [],
        isValid: true,
        errors: [],
      },
    });
  }, []);
  // 获取store中对应的value
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  const isRequired = rules?.some(
    (rule) => typeof rule !== "function" && rule.required
  );
  const hasError = errors && errors.length > 0;

  const updateValue = (e: any) => {
    const val = getValueFromEvent(e);
    dispatch({ type: "updateValue", name, value: val });
  };
  const onValueValidate = async () => {
    await validateField(name);
  };

  // 1 手动创建一个属性列表，需要有value已经onChange属性
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = updateValue;
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  // 2 获取children数组的第一个元素
  const childList = React.Children.toArray(children);
  // 没有子组件
  if (childList.length === 0) {
    console.warn(
      "No child element fond in Form.Item, please provide one form component"
    );
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      "Only support one child element in Form.Item, others will be omitted"
    );
  }
  // 子组件不是ReactElement
  if (!React.isValidElement(childList[0])) {
    throw new Error("Child component is not a valid React Element");
  }
  const child = childList[0] as React.ReactElement;
  // 3 cloneElement，混合这个child以及手动的属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });

  const rowClass = classNames("ete-formItem-row", {
    "ete-formItem-row-no-label": !label,
  });
  const labelClass = classNames({
    "ete-formItem-required": isRequired,
  });
  const itemClass = classNames("ete-formItem-control", {
    "ete-formItem-has-error": hasError,
  });

  return (
    <div className={rowClass}>
      {label && (
        <div className="ete-formItem-label">
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      )}
      <div className="ete-formItem-item">
        <div className={itemClass}>{returnChildNode}</div>
        {hasError && (
          <div className="ete-formItem-explain">
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  validateTrigger: "onBlur",
  getValueFromEvent: (e) => e.target.value,
};

export default FormItem;
