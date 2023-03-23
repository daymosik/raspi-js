// styles
import './assets/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import AuthService from '@services/auth'

import NavbarComponent, { NavigationPath } from '@components/navbar'
import PrivateRoute from '@components/private-route'
import YamahaRemote from '@components/yamaha-remote'

// import './functions/speech-recognition'

import RemoteControlView from '@modules/remote-control'
import LoginView from '@modules/login/login'
import { ArrowsView } from '@modules/arrows'
import { HomeView } from '@modules/home'
import { SpeechView } from '@modules/speech'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAppAuth = getAuth(firebaseApp)

export interface AppState {
  initialized: boolean
}

class App extends React.Component<unknown, AppState> {
  public constructor(props) {
    super(props)

    this.state = {
      initialized: false,
    }
  }

  public componentDidMount(): void {
    onAuthStateChanged(firebaseAppAuth, (user) => {
      if (user) {
        AuthService.isAuthenticated = true
      }
      this.setState({ initialized: true })
    })
  }

  public render(): JSX.Element | null {
    const styles = {
      container: {
        paddingTop: '20px',
      },
    }

    // TODO: loader insteadof null
    return !this.state.initialized ? null : (
      <HashRouter basename="/">
        <div className="wrapper">
          <NavbarComponent />
          <div style={styles.container} className="container">
            <Switch>
              <Route path={NavigationPath.Login} component={LoginView} />
              <Route exact={true} path={NavigationPath.Home} component={HomeView} />

              <PrivateRoute path={NavigationPath.RemoteControl} component={RemoteControlView} />
              <PrivateRoute path={NavigationPath.Arrows} component={ArrowsView} />
              <PrivateRoute path={NavigationPath.Speech} component={SpeechView} />
              <PrivateRoute path={NavigationPath.Remotes} component={YamahaRemote} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))