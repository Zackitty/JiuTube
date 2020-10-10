import React from 'react'
import videojs from 'video.js'
import awsvideoconfig from '../../aws-video-exports'
import 'video.js/dist/video-js.css'
import './JiuTubePlayer.css';
class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props)
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player id="VideoPlayer__Div" >
          <video  ref={(node) => { this.videoNode = node; }} id="VideoPlayer" className="video-js" />
        </div>
      </div>
    );
  }
}

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: awsvideoconfig.awsOutputLiveLL,
  }]
}

const  JiuTubePlayer  = () => {
  return (
    <div className="VideoPlayer__Container">
      <div>
      <iframe className="VideoPlayer"
    src="https://player.twitch.tv/?channel=zackittyjiujitsu&parent=localhost"
    height="<height>"
    width="<width>"
    frameborder="<frameborder>"
    scrolling="<scrolling>"
    allowfullscreen="<allowfullscreen>">
</iframe>  
      </div>
    </div>
  );
}



export default JiuTubePlayer