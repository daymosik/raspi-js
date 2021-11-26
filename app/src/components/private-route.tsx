import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { NavigationPath } from '@components/navbar'
import AuthService from '@services/auth'

// TODO
// eslint-disable-next-line react/prop-types,@typescript-eslint/explicit-module-boundary-types
const PrivateRoute = ({ component: Component, ...rest }): JSX.Element => (
  <Route
    {...rest}
    render={(props): JSX.Element =>
      AuthService.isAuthenticated ? <Component {...props} /> : <Redirect to={NavigationPath.Login} />
    }
  />
)

export default PrivateRoute
