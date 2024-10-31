'use client';
import { useSocket } from '@/context/VideoSocketContext';
import React, { useState, useMemo, useEffect } from 'react'

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
    const [isMuted, setIsMuted] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false)

    const myPlayer = useMemo(() => players[myId], [players, myId]);

    useEffect(() => {
      if (!socket || !socket.socket) return;

      socket.socket.on('muteParticipantsAudio', (hostId: string ) => {
          console.log('received muteparticipants events', hostId)
          setPlayers((prev) => {
              const updatedPlayers = { ...prev };
              Object.keys(updatedPlayers).forEach(id => {
                  if (id !== hostId) {
                      updatedPlayers[id].muted = false;
                  }
              });
              return updatedPlayers;
          });
      });
  
      socket.socket.on('stopParticipantsVideo', ( hostId: string ) => {
          console.log('Recieved videoStopping event', hostId)
          setPlayers((prev) => {
              const updatedPlayers = { ...prev };
              Object.keys(updatedPlayers).forEach(id => {
                  if (id !== hostId) {
                    console.log('stopping video for player ', id)
                      updatedPlayers[id].playing = false;
                  }
              });
              return updatedPlayers;
          });
      });
  }, [socket, setPlayers]);

  useEffect(() => {
    if (!socket || !socket.socket) return;

    socket.socket.on('unMuteParticipants', (hostId: string ) => {
        console.log('received muteparticipants events', hostId)
        setPlayers((prev) => {
            const updatedPlayers = { ...prev };
            Object.keys(updatedPlayers).forEach(id => {
                if (id !== hostId) {
                    updatedPlayers[id].muted = true;
                }
            });
            return updatedPlayers;
        });
    });

    socket.socket.on('playParticipantsVideo', ( hostId: string ) => {
        console.log('Recieved videoStopping event', hostId)
        setPlayers((prev) => {
            const updatedPlayers = { ...prev };
            Object.keys(updatedPlayers).forEach(id => {
                if (id !== hostId) {
                  console.log('stopping video for player ', id)
                    updatedPlayers[id].playing = true;
                }
            });
            return updatedPlayers;
        });
    });
}, [socket, setPlayers]);


    const muteParticipants = ()=> {
      if (isHost) {
        socket.socket.emit(isMuted ? 'unMuteOtherParticipants': 'muteOtherParticipants',roomId, myId)
        setIsMuted(!isMuted)
      }
    };

    const hideParicipantsVideo = () => {
      if (isHost) {
        console.log('userTrying to stop the video for all participants')
        socket.socket.emit(isBlocked ? 'hideParticipantsVideo': 'showParticipantsVideo', roomId, myId)
        setIsBlocked(!isBlocked)
      }
    }

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
    

    

return { players, setPlayers, myPlayer, otherPlayers, toggleAudio, toggleVideo, muteParticipants, hideParicipantsVideo, isMuted, isBlocked }
}
