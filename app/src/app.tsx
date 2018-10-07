import 'bootstrap/dist/css/bootstrap.css'
// styles
// import style from './assets/styles/main.scss'
// import font-awesome from 'font-awesome/css';
import 'font-awesome/css/font-awesome.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button } from 'reactstrap'
// components
import Arrows from './components/arrows'
import Camera from './components/camera'
import Distance from './components/distance'
import NavbarComponent from './components/navbar'
import Player from './components/player'
import RGB from './components/rgb'
import Speech from './components/speech'
// functions
import SpeechRecognition from './functions/speech-recognition'

const speechRecognition = new SpeechRecognition()

class Wrapper extends React.Component<{}, {}> {
  public render() {
    const styles = {
      container: {
        paddingTop: '20px',
      },
    }

    return (
      <div>
        <NavbarComponent/>
        <div style={styles.container} className="container">
          <div className="row">
            <div className="col">
              <Camera/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm col-lg-4 text-center">
              <Distance/>
              <Arrows/>
            </div>
            <div className="col-sm col-lg-4 text-center">
              <RGB/>
              <Speech/>
              <Player/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Wrapper/>, document.getElementById('root'))
