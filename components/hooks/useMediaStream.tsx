import { useState, useEffect,  useRef } from "react";

const userMediaStream = () => {
    const [state, setState] = useState<MediaStream | null>(null);
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
        stream :state as MediaStream | null
};
}
export default userMediaStream;