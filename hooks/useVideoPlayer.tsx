import { useSocket } from '@/context/VideoSocketContext';
import React, { useState, useMemo } from 'react'

interface Player {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
}

interface Players {
  [key: string]: Player;
}

const useVideoPlayer = (myId: string, roomId: any) => {
    const [players, setPlayers] = useState<Players>({})
    const socket = useSocket()

    const myPlayer = useMemo(() => players[myId], [players, myId]);

    const otherPlayers = useMemo(() => {
        const others: Players = {};
        for (const [id, player] of Object.entries(players)) {
            if (id !== myId) {
                others[id] = player;
            }
        }
        return others;
    }, [players, myId]);

    const toggleAudio = () => {
      console.log("toggled my audio")
      setPlayers((prev) => ({
        ...prev,
        [myId]: {
          ...prev[myId],
          muted: !prev[myId].muted
        }
      }))
      // socket.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = () => {
      console.log("toggled my video")
    }

    return { players, setPlayers, myPlayer, otherPlayers }
}

export default useVideoPlayer;