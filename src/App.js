import logo from './logo.svg';
import './App.css';
import YouTube, { YouTubeProps } from 'react-youtube';
import React from 'react';
import { listenForPlaybackTime, saveCurrentPlaybackTime } from './helpers/player';
import { styles } from './helpers/styles';

const AUDIO_DISABLED = 'audio_disabled'
const VIDEO_RESUME = 'video_resume'
const VIDEO_RESTART = 'video_restart'
const PLACEHOLDER_IMG_AUDIO_DISABLED = '/disegnoascolta.png'
const PLACEHOLDER_IMG_AUDIO_RESUME_RESTART = '/disegnoplay.png'
const PLACEHOLDER_IMG_PAUSE = '/disegnocontinua.png'


const played = localStorage.getItem('played')

function App() {

  const [player, setPlayer] = React.useState(null)
  const [placeholderVisible, setPlaceholderVisible] = React.useState(true)
  const [placeholderResumeStartVisible, setPlaceholderResumeStartVisible] = React.useState(true)
  const [placeholderPause, setPlaceHolderPause] = React.useState(false)

  /**
   * Saves player in state when it is ready
   *
   * @param {*} event
   */
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.mute();
    setPlayer(event.target)
    listenForPlaybackTime(player)
  }

  /**
   * On Placeholder click handler
   *
   * @param {*} type
   */
  const onPlaceholderClick = (type) => {
    var seek = 0
    player.unMute()
    setPlaceholderVisible(false)
    setInterval(() => saveCurrentPlaybackTime(player), 1000)

    switch (type) {
      case VIDEO_RESUME:
        player.playVideo()
        setPlaceholderResumeStartVisible(false)
        setPlaceHolderPause(false)
        seek = played
        break;
      case VIDEO_RESTART:
        setPlaceholderResumeStartVisible(false)
        break;
    }

    player.seekTo(seek)
  }

  /**
   * Start/pause video
   */
  const toggleVideo = () => {
    const isPlaying = player.getPlayerState()==1
    if(isPlaying){
      player.pauseVideo()
    }else {
      player.playVideo()
    }
    setPlaceholderVisible(isPlaying)
    setPlaceHolderPause(isPlaying)
  }

  return (
    <div style={styles.container}>
      {/**
       * Video YT iframe
       */}
      <YouTube videoId="IDVIDEO" style={styles.player.iframe} onStateChange={() => listenForPlaybackTime(player)}  onReady={onPlayerReady} opts={
        {
          height: '390',
          width: '100%',
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            fs: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.href
          },
        }
      } />

      <div style={styles.player.layer} onClick={toggleVideo}>
      </div>

      {/**
       * Placeholder when video starts
       */}
      {placeholderVisible && <img style={{ ...styles.placeholder.audioDisabled, ...styles.placeholder.absolute }} onClick={() => {
        if (!played || !placeholderPause) onPlaceholderClick(AUDIO_DISABLED)
        else if(placeholderPause) onPlaceholderClick(VIDEO_RESUME)
      }} src={process.env.PUBLIC_URL+(!played ? PLACEHOLDER_IMG_AUDIO_DISABLED : (placeholderPause ? PLACEHOLDER_IMG_PAUSE : PLACEHOLDER_IMG_AUDIO_RESUME_RESTART))} />}

      {/*
      Clicks handler for restarting/resuming video
      */}
      {played && placeholderResumeStartVisible && !placeholderPause && <div style={{ ...styles.placeholder.absolute, ...styles.placeholder.resume }} onClick={() => {
        onPlaceholderClick(VIDEO_RESUME)
      }}>

      </div>}
      {played && placeholderResumeStartVisible && !placeholderPause && <div style={{ ...styles.placeholder.absolute, ...styles.placeholder.resume, ...styles.placeholder.restart }} onClick={() => {
        onPlaceholderClick(VIDEO_RESTART)
      }}>

      </div>}
    </div>
  );
}

export default App;
