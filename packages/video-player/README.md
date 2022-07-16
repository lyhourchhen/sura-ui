# vdo.js with react + typescript

> support live streaming video
> local video support

### Basic Usage

```tsx
import { SuraVideoPlayer } from "@src/components/sura-vdo-player/sura-vdo-player";

const TestPage = () => {
  return (
    <>
      <SuraVideoPlayer
        options={{
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [
            {
              type: "application/x-mpegURL",
              src: "http://localhost:8000/livelive/live/index.m3u8",
            },
          ],
        }}
      />
    </>
  );
};

export default TestPage;
```

### Usages With Ref

```tsx
import { SuraVideoPlayer } from "@src/components/sura-vdo-player/sura-vdo-player";
import React from "react";

const TestPage = () => {
  const playerRef = React.useRef(null);

  return (
    <>
      <SuraVideoPlayer
        options={{
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [
            {
              type: "application/x-mpegURL",
              src: "http://localhost:8000/livelive/live/index.m3u8",
            },
          ],
        }}
        onReady={(player) => {
          // @ts-ignore
          playerRef.current = player;

          // you can handle player events here
          player.on("waiting", () => {
            console.log("player is waiting");
          });

          player.on("dispose", () => {
            console.log("player will dispose");
          });
        }}
      />
    </>
  );
};

export default TestPage;
```
