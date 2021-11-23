// styles
// import style from './assets/styles/main.scss'
// import font-awesome from 'font-awesome/css';
import Arrows from '@components/arrows'
import Camera from '@components/camera'
import Distance from '@components/distance'
import NavbarComponent, { NavigationPath } from '@components/navbar'
import Player from '@components/player'
import PrivateRoute from '@components/private-route'
import RGB from '@components/rgb'
import SevenSegmentLedView from '@components/seven-segment-led'
import Speech from '@components/speech'
import YamahaRemote from '@components/yamaha-remote'
// import './functions/speech-recognition'
import LoginView from '@modules/login'
import AuthService from '@services/auth'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Button } from 'reactstrap'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration)
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user: firebase.User) => {
  if (user) {
    AuthService.isAuthenticated = true
    window.location.href = '/#'
  }
})

const SpeechView = () => (
  <div className="container pt-5">
    <div className="row">
      <div className="col">
        <RGB/>
      </div>
      <div className="col">
        <Speech/>
        <Player/>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <SevenSegmentLedView/>
      </div>
    </div>
  </div>
)

const ArrowsView = () => (
  <div>
    <Distance/>
    <Arrows/>
  </div>
)

const HomeView = () => (
  <div className="container pt-5">
    <div className="text-center">
      <img src={require('./assets/images/logo-vertical.png')}/>
    </div>
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
              <Route path={NavigationPath.Login} component={LoginView}/>
              <Route exact={true} path={NavigationPath.Home} component={HomeView}/>

              <PrivateRoute path={NavigationPath.Camera} component={Camera}/>
              <PrivateRoute path={NavigationPath.Arrows} component={ArrowsView}/>
              <PrivateRoute path={NavigationPath.Speech} component={SpeechView}/>
              <PrivateRoute path={NavigationPath.Remotes} component={YamahaRemote}/>
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<Wrapper/>, document.getElementById('root'))
