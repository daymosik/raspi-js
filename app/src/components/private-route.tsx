import { NavigationPath } from '@components/navbar'
import AuthService from '@services/auth'
import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

// TODO
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }): JSX.Element => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isAuthenticated ? <Component {...props} /> : <Redirect to={NavigationPath.Login} />
    }
  />
)

export default PrivateRoute
