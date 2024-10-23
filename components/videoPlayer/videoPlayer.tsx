import ReactPlayer from "react-player";
import React from "react";
import styles from "./videoPlayer.module.css";

interface VideoPlayerProps {
  playerId: string;
  url: MediaStream | null;
  muted: boolean;
  playing: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const {  url, muted, playing } = props;
  return (
    <ReactPlayer
      className={styles.actualVideo}
      url={url as MediaStream}
      muted={muted}
      playing={playing}
      width="55%"
      height = "50%"
    />
  );
};

export default VideoPlayer;
