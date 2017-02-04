import socket from './socket'
import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
// components
import Arrows from './components/arrows';
import Distance from './components/distance';
import NavbarComponent from './components/navbar';
import RGB from './components/rgb';
import Speech from './components/speech';
import Player from './components/player';
import Camera from './components/camera';
// functions
import SpeechRecognition from './functions/speech-recognition';
// styles
// import style from './assets/styles/main.scss'
// import font-awesome from 'font-awesome/css';
require('font-awesome/css/font-awesome.css');

const speechRecognition = new SpeechRecognition();

class Wrapper extends React.Component {
  render() {
    const styles = {
      container: {
        paddingTop: '20px'
      }
    };

    return (
      <div>
        <NavbarComponent />
        <div style={styles.container} className="container">
          <div className="row">
            <div className="col">
              <Camera />
            </div>
          </div>
          <div className="row">
            <div className="col-sm col-lg-4 text-center">
              <Distance />
              <Arrows />
            </div>
            <div className="col-sm col-lg-4 text-center">
              <RGB />
              <Speech />
              <Player />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));
