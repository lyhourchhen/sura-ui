import { Upload } from "antd";
import ImgCrop, { ImgCropProps } from "antd-img-crop";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { FC, useEffect, useState } from "react";
import { useGetProviderAsurRaaUpload } from "./asurraa-upload-provider";

type Value = string | null | undefined;
/**
 * @deprecated
 */

export interface uploadInterface {
  uuid: string;
  cdn: string;
}
export interface AsurRaaSingleUploadClassicProps
  extends Omit<UploadProps, "onChange"> {
  onChange?: (url: string | uploadInterface | any) => void;
  getReturnUrl?: (url: any) => void;
  defaultImage?: Value;
  value?: Value;
  corpProps?: ImgCropProps;
}

/**
 *
 * @deprecated
 */
export const AsurRaaSingleUploadClassic: FC<AsurRaaSingleUploadClassicProps> = (
  props
) => {
  const global = useGetProviderAsurRaaUpload();
  const [fileList, setFileList] = useState<Array<UploadFile<uploadInterface>>>(
    []
  );

  const imageUrl = `${global?.returnImagePath}${props?.defaultImage}`;

  useEffect(() => {
    if (props.defaultImage !== undefined) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            props.defaultImage === null ||
            props.defaultImage === undefined ||
            props.defaultImage === ""
              ? undefined
              : imageUrl,
          size: 100,
          type: "",
        },
      ]);
    }
  }, [props.defaultImage]);

  const onChange = ({
    fileList: newFileList,
  }: {
    fileList: Array<UploadFile>;
  }) => {
    setFileList(newFileList);
    props?.getReturnUrl?.(newFileList[0]?.response);
    props?.onChange?.(newFileList[0]?.response);
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
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};
