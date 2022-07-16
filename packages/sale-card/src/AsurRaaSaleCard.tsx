import {
  AsurRaaImageViewer,
  AsurRaaImageViewerContextInterface,
  AsurRaaImageViewerProps,
  AsurRaaImageViewerProvider,
} from "@asurraa/sura-ui-image-viewer";
import { Card, CardProps, Divider, Typography } from "antd";
import { FC, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetAsurRaaSaleCard } from "./AsurRaaSaleCardProvider";
import { Scrollbar } from "react-scrollbars-custom";

const Center = styled.div`
  display: flex;
  justify-content: center;
`;
export interface AsurRaaSaleCardProps {
  antdCardProps?: CardProps;
  imageValue: string | undefined;
  mainTitle: string | undefined | ReactNode;
  mainValueAtLeft: string | undefined | ReactNode;
  mainValueAtRight: string | undefined | ReactNode;
  imageHeader?: AsurRaaImageViewerContextInterface["advanced"];
  imageViewerProps?: Partial<AsurRaaImageViewerProps>;
  overrideFallbackImage?: string;
  needShadow?: boolean;
}

export const AsurRaaSaleCard: FC<AsurRaaSaleCardProps> = (props) => {
  const global = useGetAsurRaaSaleCard();
  const [fallbackImage, setFallbackImage] = useState<string>();

  useEffect(() => {
    if (props?.overrideFallbackImage) {
      setFallbackImage(props.overrideFallbackImage);
    } else {
      setFallbackImage(global?.fallbackImage);
    }
  }, []);

  return (
    <AsurRaaImageViewerProvider
      fallbackType="image"
      fallbackImage={fallbackImage ?? ""}
      imageUrl={global?.imageUrl!}
      allowPreview={false}
      advanced={props.imageHeader}
      {...props.imageViewerProps}
    >
      <Card
        style={{
          boxShadow: props.needShadow
            ? "2px 2px 10px 2px rgba(208, 216, 243, 0.6)"
            : "",
          cursor: "pointer",
        }}
        {...props.antdCardProps}
      >
        <Center>
          <AsurRaaImageViewer isPreview={false} value={props.imageValue} />
        </Center>
        <Divider />
        <Scrollbar
          noScrollX
          momentum
          minimalThumbSize={5}
          style={{
            height: "60px",
            overflowY: "auto",
          }}
        >
          <Typography.Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {props?.mainTitle ?? ""}
          </Typography.Text>
        </Scrollbar>

        <div>
          <div style={{ paddingTop: 5 }}>
            <Typography.Text style={{ fontWeight: "bold", paddingTop: 10 }}>
              {props?.mainValueAtLeft ?? ""}
            </Typography.Text>
          </div>
          <div style={{ marginTop: "8px" }}>
            <Typography.Text style={{ fontWeight: "bold", paddingTop: 10 }}>
              {props?.mainValueAtRight ?? ""}
            </Typography.Text>
          </div>
        </div>
      </Card>
    </AsurRaaImageViewerProvider>
  );
};
AsurRaaSaleCard.defaultProps = { needShadow: true };
