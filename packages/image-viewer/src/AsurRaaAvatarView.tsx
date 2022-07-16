import { FC, Fragment } from "react";
import { AsurRaaImageViewerProps } from "./AsurRaaImageViewer";
import { AsurRaaImageViewer } from "./AsurRaaImageViewer";

export interface AsurRaaAvatarViewProps extends AsurRaaImageViewerProps {}

export const AsurRaaAvatarView: FC<AsurRaaAvatarViewProps> = (props) => {
  return (
    <AsurRaaImageViewer
      isPreview={false}
      antdImageProps={{
        style: {
          width: "35px",
          height: "35px",
          borderRadius: 35 / 2,
        },
      }}
      {...props}
    />
  );
};
