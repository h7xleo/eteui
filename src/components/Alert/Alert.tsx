import React, { useState, useRef } from "react";
import classNames from "classnames";
import Transition from "../Transition/Transition";
import Icon from "../Icon/Icon";

type AlertType = "default" | "success" | "warning" | "danger";

interface AlertProps {
  /**指定警告提示的样式*/
  type?: AlertType;
  /**警告提示内容*/
  title: string;
  /**警告提示的辅助性文字介绍 */
  description?: string;
  /**是否显示关闭Icon */
  closable?: boolean;
  /**关闭时触发的回调函数 */
  onClose?: (e: React.MouseEvent) => void;
}

/**
 * 警告提示，展现需要关注的信息。
 * ###如何使用
 * ```js
 * import { Alert } from "eteui"
 * ```
 */
const Alert: React.FC<AlertProps> = (props) => {
  const [show, setShow] = useState<Boolean>(false);
  const nodeRef = useRef(null);
  const { type, title, description, closable, onClose } = props;
  const classes = classNames("ete-alert", {
    [`ete-alert-${type}`]: type,
  });
  const titleClass = classNames("ete-alert-title", {
    [`ete-alert-title-bold`]: description,
  });
  const descClass = classNames("ete-alert-desc");
  const closeClass = classNames("ete-alert-close");

  const handleClick = (e: React.MouseEvent) => {
    if (onClose) {
      onClose(e);
    }
    setShow(true);
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={!show}
      timeout={300}
      animation="ete-in-top"
    >
      <div className={classes} ref={nodeRef}>
        <span className={titleClass}>{title}</span>
        {description && <span className={descClass}>{description}</span>}
        {closable && (
          <span
            className={closeClass}
            onClick={handleClick}
            data-testid="test-alert-close"
          >
            <Icon icon="xmark"></Icon>
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true,
};

export default Alert;
