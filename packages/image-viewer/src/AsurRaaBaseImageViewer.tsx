import { Image, ImageProps } from "antd";
import { FC, useEffect, useState } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import {
  AsurRaaImageViewerContextInterface,
  useGetAsurRaaImageViewer,
} from "./AsurRaaImageViewerProvider";

type ShouldRequireNameOrNot =
  AsurRaaImageViewerContextInterface["fallbackType"] extends "avatar"
    ? Required<{
        name: string;
      }>
    : { name?: string | undefined };

export interface AsurRaaBaseImageViewerProps extends ShouldRequireNameOrNot {
  value: string | undefined | null;
  isPreview?: boolean;
  antdImageProps?: Partial<ImageProps>;
  avatarProps?: typeof Avatar;
  overrideDefaultImage?: string;
  imageLoading?: (loading: boolean) => void;
}

export const AsurRaaBaseImageViewer: FC<AsurRaaBaseImageViewerProps> = (
  props
) => {
  const context = useGetAsurRaaImageViewer();
  const [isError, setIsError] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const defaultImage = props.overrideDefaultImage
    ? props.overrideDefaultImage
    : context?.fallbackImage;

  const imageUrl = `${context?.imageUrl}${props.value}`;
  const [headerImgRes, setHeaderImgRes] = useState<string | undefined>();

  useEffect(() => {
    setImageLoading(true);
    if (context?.advanced?.headers !== undefined) {
      const src = imageUrl;
      const options = {
        headers: {
          ...context?.advanced?.headers,
        },
      };

      fetch(src, options)
        .then((res) => res.blob())
        .then((blob) => {
          setHeaderImgRes(URL.createObjectURL(blob));
          setImageLoading(false);
        })
        .finally(() => setImageLoading(false));
    }
  }, []);

  useEffect(() => {
    props?.imageLoading?.(imageLoading);
  }, []);

  const isAllowPreviewImage = () => {
    if (context?.allowPreview) {
      return isError ? false : props.isPreview;
    } else {
      return false;
    }
  };

  if (isError && context?.fallbackType === "avatar") {
    return (
      <div>
        {/*
        // ? react18 not using class
        // @ts-ignore */}
        <ConfigProvider {...context.fallbackAvatarProviderProps}>
          {/* <Avatar name={props.name} {...props.avatarProps} /> */}
        </ConfigProvider>
      </div>
    );
  }

  return (
    <Image
      preview={isAllowPreviewImage() ?? false}
      draggable={false}
      src={
        props.value === null || props.value === "null"
          ? defaultImage
          : context?.advanced?.headers !== undefined
          ? headerImgRes
          : imageUrl
      }
      onError={() => setIsError(true)}
      fallback={defaultImage}
      {...props.antdImageProps}
    />
  );
};
