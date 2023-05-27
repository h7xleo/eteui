import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "ete-in-top"
  | "ete-in-left"
  | "ete-in-bottom"
  | "ete-in-right";

type TransitionProps = CSSTransitionProps & {
  /**动画效果，className的优先级高于animation */
  animation?: AnimationName;
  /**是否在外层添加一个容器元素，解决transition属性覆盖问题 */
  wrapper?: boolean;
  children?: ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
