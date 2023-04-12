import './assets/styles/main.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import AuthService from '@services/auth'

import NavbarComponent, { NavigationPath } from '@components/navbar'
import PrivateRoute from '@components/private-route'

import speechRecognition from './functions/speech-recognition'

import RemoteControlView from '@modules/remote-control'
import LoginView from '@modules/login'
import { ArrowsView } from '@modules/arrows'
import { HomeView } from '@modules/home'
import { ComponentsView } from '@modules/components'
import { RemotesView } from '@modules/remotes'

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

    speechRecognition.init()
  }

  public render(): JSX.Element | null {
    // TODO: loader insteadof null
    return !this.state.initialized ? null : (
      <HashRouter basename="/">
        {/*TODO*/}
        {/*<div className="wrapper gradient-custom h-100">*/}
        <div className="wrapper gradient-custom h-100">
          <NavbarComponent />
          <div className="container py-4 ">
            <Switch>
              <Route path={NavigationPath.Login} component={LoginView} />
              <Route exact={true} path={NavigationPath.Home} component={HomeView} />

              <PrivateRoute path={NavigationPath.RemoteControl} component={RemoteControlView} />
              <PrivateRoute path={NavigationPath.Arrows} component={ArrowsView} />
              <PrivateRoute path={NavigationPath.Components} component={ComponentsView} />
              <PrivateRoute path={NavigationPath.Remotes} component={RemotesView} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
