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

export const useVideoPlayer = (myId: string, roomId: string, isHost:boolean) => {
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
      socket.socket.emit('userToggleAudio', myId, roomId)
    }

    const toggleVideo = () => {
      console.log("toggled my video")
      setPlayers((prev) => ({
        ...prev,
        [myId]: {
          ...prev[myId],
          playing: !prev[myId].playing
        }
      }))
      socket.socket.emit('userToggleVideo', myId, roomId)
    }

    

return { players, setPlayers, myPlayer, otherPlayers, toggleAudio, toggleVideo }
}
