"use client";
import { useEffect, useState } from "react";
import usePeer from "@/hooks/usePeer";
import { useSocket } from "@/context/VideoSocketContext";
import userMediaStream from "@/hooks/useMediaStream";
import VideoPlayer from "@/components/videoPlayer/videoPlayer";
import useVideoPlayer from "@/hooks/useVideoPlayer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneSlash,
  faPeopleGroup,
  faVideoSlash,
  faDisplay,
  faHand,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/video.module.css";

const Room = () => {
  const { socket } = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = userMediaStream();
  // setPlayers will be the object
  const { videoPlayers: players, setVideoPlayers: setPlayers } =
    useVideoPlayer();

  useEffect(() => {
    if (!socket || !peer) return;
    const handleUserConnected = (newUser: string) => {
      console.log("user connected with userId", newUser);

      const call = peer?.call(newUser, stream );

      call.on("stream", (incomingStream) => {
        console.log("Incoming stream from someOne", incomingStream);
        if (!stream || !myId) return;
        console.log("Setting my stream", myId);
        setPlayers((prev: any) => ({
          ...prev,
          [myId]: {
            url: stream,
            muted: true,
            playing: true,
          },
        }));
      });
    };
    socket.on("userConnected", handleUserConnected);
    return () => {
      socket?.off("userConnected", handleUserConnected);
    };
  }, [peer, socket, stream]);

  useEffect(() => {
    if (!peer || !stream) return;
    console.log("this is my peerId", peer);
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream as MediaStream);

      call.on("stream", (incomingStream) => {
        console.log("Incoming stream from someone.", callerId);
        console.log("Incoming stream from someOne", incomingStream);
        setPlayers((prev: any) => ({
          ...prev,
          [callerId]: {
            url: stream,
            muted: true,
            playing: true,
          },
        }));
      });
    });
  }, [peer, stream, setPlayers]);

  console.log("setting up stream and this is the stream.", stream);
  console.log(`my peer id is ${myId}`);
  console.log(`my socket id is ${socket}`);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log("Setting my stream", myId);
    setPlayers((prev: any) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);
  return (
    <div className={styles.mainBox}>
      <div className={styles.videoBox}>
        <div className={styles.group}>
          {Object.keys(players).map((playerId) => {
            const { url, muted, playing } = players[playerId];
            return (
              <div className={styles.videoComponent}>
                <VideoPlayer
                  url={url}
                  muted={muted}
                  playing={playing}
                  playerId={""}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          </button>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faPeopleGroup} />
          </button>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faVideoSlash} />
          </button>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faDisplay} />
          </button>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faHand} />
          </button>
          <button className={styles.controlButton}>
            <FontAwesomeIcon icon={faPhoneSlash} />
          </button>
        </div>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chat}>chat</div>
        <div className={styles.host}>Host</div>
      </div>
    </div>
  );
};

export default Room;

// reactPlayer is being used to play a video.
