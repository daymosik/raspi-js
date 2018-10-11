import AuthService from '@services/auth'
import * as React from 'react'
import { Link } from 'react-router-dom'

export enum NavigationPath {
  Home = '/',
  Login = '/login',
  Arrows = '/arrows',
  Speech = '/speech',
  Remotes = '/remotes',
}

export interface NavbarComponentState {
  isOpen: boolean
}

export interface NavigationButtonProps {
  onClick: () => void
}

export const NavigationButton: React.SFC<NavigationButtonProps> = (props) => (
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
    <span className="navbar-toggler-icon"/>
  </button>
)

interface NavigationListItemProps {
  name: string
  path?: string
  onClick?: () => void
}

const NavigationListItem: React.SFC<NavigationListItemProps> = (props) => (
  <li className="nav-item">
    {props.path && <Link className="nav-link" to={props.path}>{props.name}</Link>}
    {props.onClick && <a className="nav-link" onClick={props.onClick}>{props.name}</a>}
  </li>
)

export interface NavigationMenuProps {
  authorized: boolean
  mobileMenuOpen: boolean
  hideMobileMenu: () => void
}

export const NavigationMenu: React.SFC<NavigationMenuProps> = (props) => (
  <div
    className={`collapse navbar-collapse pull-right ${props.mobileMenuOpen ? 'show' : ''}`}
    id="navbarSupportedContent"
    onClick={props.hideMobileMenu}
  >
    <ul className="navbar-nav mr-auto">
      <NavigationListItem path={NavigationPath.Home} name={'Home'}/>
      <NavigationListItem path={NavigationPath.Arrows} name={'Arrows'}/>
      <NavigationListItem path={NavigationPath.Speech} name={'Speech'}/>
      <NavigationListItem path={NavigationPath.Remotes} name={'Remotes'}/>
    </ul>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a target="_blank" className="nav-link" href="https://github.com/daymosik/raspi-js">Github</a>
      </li>
      {!props.authorized && <NavigationListItem path={NavigationPath.Login} name={'Login'}/>}
      {/*tslint:disable-next-line jsx-no-lambda*/}
      {props.authorized && <NavigationListItem onClick={() => AuthService.logout()} name={'Logout'}/>}
    </ul>
  </div>
)

export default class NavbarComponent extends React.Component<{}, NavbarComponentState> {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavigationButton onClick={this.toggle}/>

          <Link className="navbar-brand" to={NavigationPath.Home}>
            <img src={require('../assets/images/logo-horizontal.png')} height="40px"/>
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

  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
