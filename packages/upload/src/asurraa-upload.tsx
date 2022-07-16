/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Upload } from "antd";
import ImgCrop, { ImgCropProps } from "antd-img-crop";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { FC, useEffect, useState } from "react";
import { uid } from "uid";
import { useGetProviderAsurRaaUpload } from "./asurraa-upload-provider";

export interface UploadInterface {
  uuid: string;
  cdn: string;
  data: string;
}

export type CropProps = ImgCropProps;

type Value = string | null | undefined;
export interface AsurRaaSingleUploadProps
  extends Omit<UploadProps, "onChange"> {
  onChange?: (url: string, res: UploadInterface) => void;
  getReturnUrl?: (url: string) => void;
  defaultValue?: Value;
  value?: Value;
  corpProps?: CropProps;
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const AsurRaaSingleUpload: FC<AsurRaaSingleUploadProps> = (props) => {
  const global = useGetProviderAsurRaaUpload();
  const [fileList, setFileList] = useState<Array<UploadFile<UploadInterface>>>(
    []
  );

  const imageUrl = `${global?.returnImagePath}${props?.value}`;

  useEffect(() => {
    if (props.value) {
      if (global?.header !== undefined) {
        // * subdomain logic
        const options = {
          headers: {
            ...global?.header,
          },
        };
        fetch(imageUrl, options)
          .then((res) => res.blob())
          .then(async (blob) => {
            const headerImageBase64 = (await blobToBase64(blob)) as string;
            setFileList([
              { thumbUrl: headerImageBase64, uid: "1", name: "preview" },
            ]);
          });
      } else {
        if (props.defaultValue !== undefined) {
          setFileList([
            {
              uid: uid(),
              name: "image.png",
              status: "done",

              url:
                props.defaultValue === null ||
                props.defaultValue === undefined ||
                props.defaultValue === ""
                  ? undefined
                  : imageUrl,
              size: 100,
              type: "",
            },
          ]);
        }
      }
    } else {
      setFileList([]);
    }
  }, [global?.header, imageUrl, props.defaultValue, props.value]);

  const onChange = ({
    fileList: newFileList,
  }: {
    fileList: Array<UploadFile>;
  }) => {
    setFileList(newFileList);
    props?.getReturnUrl?.(newFileList[0]?.response);
    props?.onChange?.(newFileList[0]?.response?.uuid, newFileList[0]?.response);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        // @ts-ignore
        reader.readAsDataURL(file.originFileObj);
        // @ts-ignore
        reader.onload = () => resolve(reader?.result);
      });
    }
    const image = new Image();
    // @ts-ignore
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div>
      {/*
 // @ts-ignore */}
      <ImgCrop rotate {...props.corpProps}>
        <Upload
          action={global?.postUrl}
          headers={{
            ...global?.header,
          }}
          listType="picture-card"
          // @ts-ignore
          fileList={fileList}
          {...props}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};
