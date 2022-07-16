import { FC } from "react";
import {
  AsurRaaBaseImageViewer,
  AsurRaaBaseImageViewerProps,
} from "./AsurRaaBaseImageViewer";

export interface AsurRaaImageViewerProps extends AsurRaaBaseImageViewerProps {}

export const AsurRaaImageViewer: FC<AsurRaaImageViewerProps> = (props) => {
  return (
    <AsurRaaBaseImageViewer
      antdImageProps={{ style: { width: "100px" } }}
      {...props}
    />
  );
};

AsurRaaImageViewer.defaultProps = {
  isPreview: true,
};
