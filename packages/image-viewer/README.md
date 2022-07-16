[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-image-viewer

> Sura UI Image Viewer Component

This component is used to preview images.

## Installation

With Yarn

```sh
yarn add @asurraa/sura-ui-image-viewer
```

## Interface

```tsx
export type AsurRaaImageViewerProps = {
  value: string | undefined;
  isPreview?: boolean;
  primitiveImageProps?: ImageProps;
};
```

## Usage

1. Image Viewer Provider (Wrap)

```tsx
// app.tsx
import react from "react";
import App from "./App";
import { AsurRaaImageViewerProvider } from "@asurraa/sura-ui-image-viewer";

const PackageProvider = () => {
  return (
    <div>
      // ... wrap within the top component wrapper
      <AsurRaaImageViewerProvider
        imageUrl={returnImageRoute}
        fallbackImage={fallBackImage}
      >
        <App />
      </AsurRaaImageViewerProvider>
    </div>
  );
};
```

2. Image Viewer

```tsx
import { Card, CardProps, Tag, Typography } from "antd";
import { FC, Fragment } from "react";
import { AsurRaaImageViewer } from "@asurraa/sura-ui-image-viewer";

export interface SaleCardProps {
  antdCardProps?: CardProps;
  title: string;
  extra: string | number;
  description: string;
  image: string;
}

const SaleCard: FC<SaleCardProps> = (props) => {
  return (
    <Fragment>
      <Card
        style={{
          cursor: "pointer",
          boxShadow: "2px 2px 10px 2px rgba(208, 216, 243, 0.6)",
        }}
        title={<Typography.Text strong>{props.title}</Typography.Text>}
        bordered={true}
        extra={<Tag color="green">{props.extra}</Tag>}
        {...props.antdCardProps}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <AsurRaaImageViewer isPreview={false} value={props.image} />
          {/* <img src={props.image} /> */}
          <div>
            <p style={{ opacity: 0.7, textAlign: "center" }}>
              {props.description}
            </p>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default SaleCard;
```

## note with tailwindcss

```less
img {
  display: unset !important;
}
```
