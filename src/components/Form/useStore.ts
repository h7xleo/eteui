import { useReducer, useState } from "react";
import Schema, { RuleItem, ValidateError } from "async-validator";
import mapValues from "lodash-es/mapValues";
import each from "lodash-es/each";

export type CustomRuleFunc = ({ getFieldValue }) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;

export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FormState {
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, ValidateError[]>;
}

export interface FieldsAction {
  type: "addField" | "updateValue" | "updateValidateResult";
  name: string;
  value: any;
}

export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case "updateValue":
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    case "updateValidateResult":
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    default:
      return state;
  }
}

function useStore(initialValues?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {},
  });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value;
  };
  const getFieldsvalue = () => {
    return mapValues(fields, (item) => item.value);
  };
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: "updateValue", name, value });
    }
  };
  const resetFields = () => {
    if (initialValues) {
      each(fields, (value, name) => {
        if (initialValues[name]) {
          dispatch({ type: "updateValue", name, value: initialValues[name] });
        } else {
          dispatch({ type: "updateValue", name, value: "" });
        }
      });
    } else {
      each(fields, (value, name) => {
        dispatch({ type: "updateValue", name, value: "" });
      });
    }
  };
  const transfromRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === "function") {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      } else {
        return rule;
      }
    });
  };
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const currentRules = transfromRules(rules);
    const descriptor = {
      [name]: currentRules,
    };
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as any;
      errors = err.errors;
    } finally {
      dispatch({
        type: "updateValidateResult",
        name,
        value: { isValid, errors },
      });
    }
  };
  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    const valueMaps = mapValues(fields, (item) => item.value);
    // {'username': 'abc'}
    const descriptors = mapValues(fields, (item) => transfromRules(item.rules));
    const validator = new Schema(descriptors);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMaps);
    } catch (e) {
      isValid = false;
      const err = e as ValidateErrorType;
      errors = err.fields;
      each(fields, (value, name) => {
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: "updateValidateResult",
            name,
            value: { isValid: false, errors: itemErrors },
          });
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({
            type: "updateValidateResult",
            name,
            value: { isValid: true, errors: [] },
          });
        }
      });
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors });
      return {
        isValid,
        errors,
        values: valueMaps,
      };
    }
  };
  return {
    fields,
    dispatch,
    form,
    validateField,
    validateAllFields,
    getFieldValue,
    getFieldsvalue,
    setFieldValue,
    resetFields,
  };
}

export default useStore;
