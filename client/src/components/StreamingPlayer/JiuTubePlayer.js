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

function JiuTubePlayer() {
  return (
    <div className="VideoPlayer__Container">
      <div>
        <VideoPlayer { ...videoJsOptions } />
      </div>
    </div>
  );
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default JiuTubePlayer