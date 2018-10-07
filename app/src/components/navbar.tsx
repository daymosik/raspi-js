import * as React from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'

export interface NavbarComponentState {
  isOpen: boolean
}

export default class NavbarComponent extends React.Component<{}, NavbarComponentState> {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  public render() {
    return (
      <div>
        <Navbar color="faded" className="bg-inverse" expand={true}>
          <NavbarToggler right="true" onClick={this.toggle}/>
          <NavbarBrand href="/">raspiJS</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <NavLink target="_blank" href="https://github.com/daymosik/raspi-js">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }

  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
