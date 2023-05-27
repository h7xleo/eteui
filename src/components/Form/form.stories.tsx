import { Meta, StoryFn } from "@storybook/react";
import React, { useRef } from "react";
import Form, { IFormRef } from "./Form";
import FormItem from "./FormItem";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { CustomRule } from "./useStore";
import Icon from "../Icon/Icon";

const formMeta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
};

export default formMeta;

export const defaultForm: StoryFn<typeof Form> = (args) => {
  return (
    <Form {...args}>
      <FormItem
        name="username"
        label="用户名"
        rules={[{ max: 3, required: true }]}
      >
        <Input width={300} />
      </FormItem>
      <FormItem
        name="password"
        label="密码"
        rules={[{ max: 8, required: true }]}
      >
        <Input type="password" width={300} />
      </FormItem>
      <div className="ete-form-submit-area">
        <Button type="submit">登陆</Button>
      </div>
    </Form>
  );
};

const Sample: React.FC = () => {
  const ref = useRef<IFormRef>(null);
  const handleClick = () => {
    ref.current?.resetFields();
  };
  const confirm: CustomRule[] = [
    { required: true, type: "string" },
    ({ getFieldValue }) => ({
      asyncValidator(rule, value) {
        return new Promise((resolve, reject) => {
          if (value !== getFieldValue("password")) {
            reject("The two passwords that you entered do not match!");
          } else {
            setTimeout(() => {
              return resolve();
            }, 2000);
          }
        });
      },
    }),
  ];
  return (
    <Form ref={ref} initialValues={{ username: "h7x" }}>
      {({ isSubmitting }) => {
        return (
          <>
            <FormItem
              name="username"
              label="用户名"
              rules={[{ max: 3, required: true }]}
            >
              <Input width={300} />
            </FormItem>
            <FormItem
              name="password"
              label="密码"
              rules={[{ max: 8, required: true }]}
            >
              <Input type="password" width={300} />
            </FormItem>
            <FormItem name="confirmPwd" label="确认密码" rules={confirm}>
              <Input type="password" width={300} />
            </FormItem>
            <div className="ete-form-submit-area">
              <Button type="submit" btnType="primary" disabled={isSubmitting}>
                {isSubmitting && <Icon icon="spinner" spin theme="light" />}
                {isSubmitting ? "验证中" : "登陆"}
              </Button>
              <Button
                type="button"
                onClick={handleClick}
                style={{ marginLeft: "10px" }}
              >
                重置
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export const sampleForm: StoryFn<typeof Form> = () => {
  return <Sample />;
  // Sample组件代码
  //   const Sample: React.FC = () => {
  //     const ref = useRef<IFormRef>(null);
  //     const handleClick = () => {
  //       ref.current?.resetFields();
  //     };
  //     const confirm: CustomRule[] = [
  //       { required: true, type: "string" },
  //       ({ getFieldValue }) => ({
  //         asyncValidator(rule, value) {
  //           return new Promise((resolve, reject) => {
  //             if (value !== getFieldValue("password")) {
  //               reject("The two passwords that you entered do not match!");
  //             } else {
  //               setTimeout(() => {
  //                 return resolve();
  //               }, 2000);
  //             }
  //           });
  //         },
  //       }),
  //     ];
  //     return (
  //       <Form ref={ref} initialValues={{ username: "h7x" }}>
  //         {({ isSubmitting }) => {
  //           return (
  //             <>
  //               <FormItem
  //                 name="username"
  //                 label="用户名"
  //                 rules={[{ max: 3, required: true }]}
  //               >
  //                 <Input width={300} />
  //               </FormItem>
  //               <FormItem
  //                 name="password"
  //                 label="密码"
  //                 rules={[{ max: 8, required: true }]}
  //               >
  //                 <Input type="password" width={300} />
  //               </FormItem>
  //               <FormItem name="confirmPwd" label="确认密码" rules={confirm}>
  //                 <Input type="password" width={300} />
  //               </FormItem>
  //               <div className="ete-form-submit-area">
  //                 <Button type="submit" btnType="primary" disabled={isSubmitting}>
  //                   {isSubmitting && <Icon icon="spinner" spin theme="light" />}
  //                   {isSubmitting ? "验证中" : "登陆"}
  //                 </Button>
  //                 <Button
  //                   type="button"
  //                   onClick={handleClick}
  //                   style={{ marginLeft: "10px" }}
  //                 >
  //                   重置
  //                 </Button>
  //               </div>
  //             </>
  //           );
  //         }}
  //       </Form>
  //     );
  //   };
};
