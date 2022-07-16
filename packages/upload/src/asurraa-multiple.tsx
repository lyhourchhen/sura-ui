import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { FC, useEffect, useState } from "react";
import { CropProps } from "./asurraa-upload";
import { useGetProviderAsurRaaUpload } from "./asurraa-upload-provider";

export interface AsurRaaMultipleUploadProps extends Omit<UploadProps, "value"> {
  cropProps?: CropProps;
  onMount?: (value: string[]) => void;
  value?: string[];
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const AsurRaaMultipleUpload: FC<AsurRaaMultipleUploadProps> = (
  props
) => {
  const context = useGetProviderAsurRaaUpload();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getImageUrl = (value: string) => {
    return `${context?.returnImagePath}${value}`;
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    const fileArrayString = fileList?.map((value) => {
      // console.log("log", value);
      if (props.value) {
        return value?.response?.uuid ?? value?.uid;
      } else {
        return value?.response?.uuid;
      }
    });
    props.onMount?.(fileArrayString);
  }, [fileList, props.value]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (props.value) {
      const valueFileList: Array<UploadFile> = props.value.map((res) => {
        return {
          uid: res,
          name: res,
          status: "done",
          url: getImageUrl(res),
        };
      });
      setFileList(valueFileList);
    }
  }, []);

  return (
    <div>
      {/*
        // ? react18 problem
 // @ts-ignore */}
      <ImgCrop rotate {...props.cropProps}>
        <Upload
          action={context?.postUrl}
          headers={{
            ...context?.header,
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          {...props}
        >
          {fileList.length >= 50 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </ImgCrop>
    </div>
  );
};
