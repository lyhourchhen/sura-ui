import React, { FC, useEffect } from "react";
import videojs from "video.js";
import type { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";

export interface SuraVideoPlayerProps {
  options: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
}

export const SuraVideoPlayer: FC<SuraVideoPlayerProps> = (props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      //   @ts-ignore
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      // * error statements
      // console.log("player error");
    }
  }, [onReady, options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        //   @ts-ignore
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        controls
        playsInline
        autoPlay
      />
    </div>
  );
};
