import * as React from 'react'
import { Link } from 'react-router-dom'

import AuthService from '@services/auth'

export enum NavigationPath {
  Home = '/',
  RemoteControl = '/remote-control',
  Login = '/login',
  Arrows = '/arrows',
  Components = '/components',
  Remotes = '/remotes',
}

export interface NavbarComponentState {
  isOpen: boolean
}

export interface NavigationButtonProps {
  onClick: () => void
}

export const NavigationButton = (props: NavigationButtonProps): JSX.Element => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
    onClick={props.onClick}
  >
    <span className="navbar-toggler-icon" />
  </button>
)

interface NavigationListItemProps {
  name: JSX.Element | string
  title?: string
  path?: string
  onClick?: () => void
}

const NavigationListItem = (props: NavigationListItemProps): JSX.Element => (
  <li className="nav-item">
    {props.path && (
      <Link className="nav-link" to={props.path} title={props.title}>
        {props.name}
      </Link>
    )}
    {props.onClick && (
      <a className="nav-link" onClick={props.onClick} title={props.title}>
        {props.name}
      </a>
    )}
  </li>
)

export interface NavigationMenuProps {
  authorized: boolean
  mobileMenuOpen: boolean
  hideMobileMenu: () => void
}

export const NavigationMenu = (props: NavigationMenuProps): JSX.Element => (
  <div
    className={`collapse navbar-collapse pull-right ${props.mobileMenuOpen ? 'show' : ''}`}
    id="navbarSupportedContent"
    onClick={props.hideMobileMenu}
  >
    <ul className="navbar-nav mr-auto">
      <NavigationListItem path={NavigationPath.RemoteControl} name={'Remote Control'} />
      <NavigationListItem path={NavigationPath.Arrows} name={'Arrows'} />
      <NavigationListItem path={NavigationPath.Components} name={'Components'} />
      <NavigationListItem path={NavigationPath.Remotes} name={'Remotes'} />
    </ul>
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <a
          target="_blank"
          className="nav-link"
          href="https://github.com/daymosik/raspi-js"
          rel="noreferrer"
          title="Github"
        >
          <i className="fa-brands fa-github fa-lg" />
        </a>
      </li>
      {!props.authorized && (
        <NavigationListItem
          path={NavigationPath.Login}
          name={<i className="fa-solid fa-right-to-bracket fa-lg" />}
          title={'LogIn'}
        />
      )}
      {props.authorized && (
        <NavigationListItem
          onClick={AuthService.logout}
          name={<i className="fa-solid fa-right-from-bracket fa-lg" />}
          title={'Logout'}
        />
      )}
    </ul>
  </div>
)

export default class NavbarComponent extends React.Component<unknown, NavbarComponentState> {
  constructor(props: unknown) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  public render(): JSX.Element {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavigationButton onClick={this.toggle} />

          <Link className="navbar-brand" to={NavigationPath.Home}>
            <img src={require('../assets/images/raspi-logo-1.png')} height="40px" alt="" />
          </Link>

          <NavigationMenu
            authorized={AuthService.isAuthenticated}
            mobileMenuOpen={this.state.isOpen}
            hideMobileMenu={this.toggle}
          />
        </div>
      </nav>
    )
  }

  public toggle = (): void => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
