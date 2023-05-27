import React, { DragEvent, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/Icon";

export interface DraggerProps {
  onFiles: (files: FileList) => void;
  children: React.ReactNode;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFiles, children } = props;
  const [drager, setDrager] = useState<boolean>(false);
  const classes = classNames("ete-upload-dragger", {
    "is-drager": drager,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, drager: boolean) => {
    e.preventDefault();
    setDrager(drager);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrager(false);
    onFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={(e) => handleDrop(e)}
    >
      {children ? (
        children
      ) : (
        <>
          <Icon icon="upload" size="5x" theme="secondary" />
          <br />
          <p style={{ marginTop: "10px" }}>点击或拖入文件上传</p>
        </>
      )}
    </div>
  );
};

export default Dragger;
