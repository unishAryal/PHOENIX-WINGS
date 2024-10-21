import { useSocket } from '@/context/VideoSocketContext';
import React, { useState } from 'react'
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
    if (!players) return;
    // const playersCopy = JSON.parse(JSON.stringify(players))

    const toggleAudio = ()=>{
      console.log("toggled my audio")
      setPlayers((prev) => {
        const copy = JSON.parse(JSON.stringify(players))
        copy[myId].muted = !copy[myId].muted
        return {...copy}
      })
      // socket.emit('user-toggle-audio', myId, roomId)

    }
    const toggleVideo = ()=>{
      console.log("toggled my video")
    }

    const myPlayer = players[myId];

  return {players, setPlayers}
}

export default useVideoPlayer;