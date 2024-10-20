import React, { useState } from 'react'

const useVideoPlayer = () => {
    const [videoPlayers, setVideoPlayers] = useState({})

  return {videoPlayers, setVideoPlayers}
}

export default useVideoPlayer;