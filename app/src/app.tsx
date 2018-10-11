import 'bootstrap/dist/css/bootstrap.css'
// styles
// import style from './assets/styles/main.scss'
// import font-awesome from 'font-awesome/css';
import 'font-awesome/css/font-awesome.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Button } from 'reactstrap'
// components
import Arrows from './components/arrows'
import Camera from './components/camera'
import Distance from './components/distance'
import NavbarComponent from './components/navbar'
import Player from './components/player'
import RGB from './components/rgb'
import Speech from './components/speech'
import YamahaRemote from './components/yamaha-remote'
// functions
import SpeechRecognition from './functions/speech-recognition'

const speechRecognition = new SpeechRecognition()

export enum NavigationPath {
  Home = '/',
  Arrows = '/arrows',
  Speech = '/speech',
  Remotes = '/remotes',
}

const SpeechView = () => (
  <div>
    <RGB/>
    <Speech/>
    <Player/>
  </div>
)

const ArrowsView = () => (
  <div>
    <Distance/>
    <Arrows/>
  </div>
)

class Wrapper extends React.Component<{}, {}> {
  public render() {
    const styles = {
      container: {
        paddingTop: '20px',
      },
    }

    return (
      <HashRouter basename="/">
        <div className="wrapper">
          <NavbarComponent/>
          <div style={styles.container} className="container">
            <Switch>
              <Route exact={true} path={NavigationPath.Home} component={Camera}/>
              <Route path={NavigationPath.Arrows} component={ArrowsView}/>
              <Route path={NavigationPath.Speech} component={SpeechView}/>
              <Route path={NavigationPath.Remotes} component={YamahaRemote}/>
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<Wrapper/>, document.getElementById('root'))
