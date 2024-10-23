import { useState, useEffect,  useRef } from "react";

interface Player {
    url: MediaStream;
    muted: boolean;
    playing: boolean;
  }
  interface Players {
    [key: string]: Player;
  }

const userMediaStream = () => {
    const [state, setState] = useState<MediaStream | boolean >(); 
    const isStreamSet = useRef<boolean>(false);

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;
        (async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                });
                console.log("setting a stream");
                setState(stream);
            } catch (error) {
                console.log("Error in media Navigator", error);
            }
        })();
    }, []);

    return {
        stream :state? state: " cannot get the video"
};
}
export default userMediaStream;