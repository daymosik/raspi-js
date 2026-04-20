import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { NavigationPath } from '@components/navbar'
import AuthService from '@services/auth'

// TODO
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const PrivateRoute = ({ component: Component, ...rest }: any): React.ReactElement => (
  <Route
    {...rest}
    render={(props): React.ReactElement =>
      AuthService.isAuthenticated ? <Component {...props} /> : <Redirect to={NavigationPath.Login} />
    }
  />
)

export default PrivateRoute
