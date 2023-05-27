import React, { MouseEvent } from "react";
import { UploadFile, UploadFileStatus } from "./Upload";
import Icon from "../Icon/Icon";
import Progress from "../Progress/Progress";
import classNames from "classnames";

export interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
  onPreview: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove, onPreview } = props;

  const renderStatusIcon = (status: UploadFileStatus) => {
    switch (status) {
      case "success":
        return <Icon theme="success" icon="check-circle" />;
      case "error":
        return <Icon theme="danger" icon="times-circle" />;
      case "uploading":
        return <Icon theme="primary" icon="spinner" spin />;
      case "ready":
        return <Icon theme="primary" icon="spinner" spin />;
      default:
        return <></>;
    }
  };

  const handleRemove = (e: MouseEvent<HTMLSpanElement>, file: UploadFile) => {
    e.stopPropagation();
    onRemove(file);
  };

  return (
    <ul className="ete-uploadList">
      {fileList.map((file) => {
        const iconClass = classNames("ete-uploadList-icon", {
          "ete-uploadList-error": file.status === "error",
        });
        const nameClass = classNames("ete-uploadList-name", {
          "ete-uploadList-error": file.status === "error",
        });
        return (
          <li
            className="ete-uploadList-item"
            key={file.uid}
            onClick={() => onPreview(file)}
          >
            <div className="ete-uploadList-item-top">
              <span className={iconClass}>
                <Icon icon="file" />
              </span>
              <div className={nameClass}>{file.name}</div>
              <span className="ete-uploadList-status">
                {renderStatusIcon(file.status)}
              </span>
              <span
                className="ete-uploadList-remove"
                onClick={(e) => handleRemove(e, file)}
                data-testid="upload-remove-icon"
              >
                <Icon icon="xmark" />
              </span>
            </div>
            {file.status === "uploading" && (
              <Progress percent={file.percent || 0} strokeHeight={10} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
