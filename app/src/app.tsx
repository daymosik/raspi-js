import 'bootstrap/dist/css/bootstrap.css'
import firebase = require('firebase/app')
import 'firebase/auth'
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
import PrivateRoute from './components/private-route'
import RGB from './components/rgb'
import Speech from './components/speech'
import YamahaRemote from './components/yamaha-remote'
// functions
// import './functions/speech-recognition'
import LoginView from './modules/login'
import AuthService from './services/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user: firebase.User) => {
  if (user) {
    AuthService.isAuthenticated = true
    window.location.href = '/#'
  }
})

export enum NavigationPath {
  Home = '/',
  Login = '/login',
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
              <Route path={NavigationPath.Login} component={LoginView}/>

              <PrivateRoute exact={true} path={NavigationPath.Home} component={Camera}/>
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
