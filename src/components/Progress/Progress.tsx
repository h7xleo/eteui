import React from "react";
import { ThemeType } from "../Icon/Icon";
export interface ProgressProps {
  /**进度条百分比 */
  percent: number;
  /**进度条高度，单位px */
  strokeHeight?: number;
  /**是否显示百分比文字 */
  showText?: boolean;
  /**自定义样式 */
  styles?: React.CSSProperties;
  /**主题颜色 */
  theme?: ThemeType;
}

/**
 * 展示操作的当前进度。
 * ###如何使用
 * ```js
 * import { Progress } from "eteui"
 * ```
 */
const Progress: React.FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="ete-progress-bar" style={styles}>
      <div
        className="ete-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`ete-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      {showText && (
        <span className="ete-progress-inner-text">{`${percent}%`}</span>
      )}
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
export default Progress;
