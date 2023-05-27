import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import UploadList from "./UploadList";
import Dragger from "./Dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /**上传的地址 */
  action: string;
  /**上传的文件列表 */
  defaultFileList?: UploadFile[];
  /**上传的文件字段名 */
  name?: string;
  /**上传的额外参数 */
  data?: { [key: string]: any };
  /**设置上传的请求头部 */
  headers?: { [key: string]: any };
  /**上传请求时是否携带  cookie 凭证信息 */
  withCredentials?: boolean;
  /**接受上传的文件类型 */
  accpet?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽上传 */
  drag?: boolean;
  /**上传文件之前的回调，参数为上传的文件，若返回 false 或者 Promise rejected 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**文件上传时的回调 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**文件上传成功时的回调 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**文件上传失败时的回调 */
  onError?: (err: any, file: UploadFile) => void;
  /**上传文件改变时的回调 */
  onChange?: (file: UploadFile) => void;
  /**点击移除文件时的回调 */
  onRemove?: (file: UploadFile) => void;
  /**点击已上传文件时的回调 */
  onPreview?: (file: UploadFile) => void;
  children?: React.ReactNode;
}

/**
 * 文件选择上传和拖拽上传控件。
 * ###如何使用
 * ```js
 * import { Upload } from "eteui"
 * ```
 */
const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    name,
    data,
    headers,
    withCredentials,
    accpet,
    multiple,
    drag,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    onPreview,
    children,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  /**
   * 更新上传文件的数组
   */
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((preFileList) => {
      return preFileList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...updateFile, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  /**
   * 点击上传按钮
   */
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  /**
   * 删除已上传文件
   * @param {UploadFile} file 目标文件
   */
  const handleRemove = (file: UploadFile) => {
    const newFiles = fileList.filter((_file) => _file.uid !== file.uid);
    setFileList(newFiles);
    // 处理onRemove回调事件
    if (onRemove) {
      onRemove(file);
    }
  };

  const handlePreview = (file: UploadFile) => {
    if (onPreview) {
      onPreview(file);
    }
  };

  /**
   * 上传input change
   * @param {ChangeEvent<HTMLInputElement>} e change事件event
   * @returns
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    // clear input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  /**
   * 上传选中的文件数组
   * @param {FileList} files 选中的上传文件数组
   */
  const uploadFiles = (files: FileList) => {
    const filesArr = Array.from(files);
    filesArr.forEach((file) => {
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((resFile) => {
            sendFile(resFile);
          });
        } else if (result !== false) {
          sendFile(file);
        }
      } else {
        sendFile(file);
      }
    });
  };

  /**
   * 向action上传文件
   * @param {File} file 上传的目标文件
   */
  const sendFile = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
      status: "ready",
    };
    setFileList((pre) => {
      return [...pre, _file];
    });

    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: { ...headers, "Content-type": "multipart/form-data" },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage;
          if (e.total) {
            percentage = Math.round((e.loaded * 100) / e.total);
          } else {
            percentage = 0;
          }

          if (percentage < 100 && onProgress) {
            // 更新文件数组中该项的状态和上传进度
            updateFileList(_file, { percent: percentage, status: "uploading" });
            _file.percent = percentage;
            _file.status = "uploading";

            onProgress(percentage, _file);
          }
        },
      })
      .then((res) => {
        updateFileList(_file, { status: "success", response: res.data });
        _file.status = "success";
        _file.response = res.data;
        if (onSuccess) {
          onSuccess(res.data, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: "error", error: err });
        _file.status = "error";
        _file.error = err;
        if (onError) {
          onError(err, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      });
  };

  return (
    <div className="ete-upload">
      <div className="ete-upload-input-box" onClick={handleClick}>
        {drag ? (
          <Dragger onFiles={(files) => uploadFiles(files)}>{children}</Dragger>
        ) : (
          children
        )}
        <input
          ref={inputRef}
          className="ete-upload-input"
          style={{ display: "none" }}
          type="file"
          accept={accpet}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
        onPreview={handlePreview}
      />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
