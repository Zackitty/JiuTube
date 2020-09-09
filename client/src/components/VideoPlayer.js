import React from 'react';
import ReactPlayer from 'react-player'
import { streamUrl } from "../config"

const VideoPlayer = (props) => {
return (
  
  <div id="video_player_container">
        <ReactPlayer
          url={"https://383c7b8d0651.us-east-1.playback.live-video.net/api/video/v1/us-east-1.134398247571.channel.9NDVibtIqAIE.m3u8"}
          width="50%"
          height="50%"
          playing={true}
          loop={true}
        />
        <h1>hello</h1>
      </div>

        )
}

export default VideoPlayer;