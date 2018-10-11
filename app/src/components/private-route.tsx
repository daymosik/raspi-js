import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { NavigationPath } from '../app'
import AuthService from '../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      // tslint:disable-next-line jsx-no-lambda
      (props) => (
        AuthService.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={NavigationPath.Login}/>
      )}
  />
)

export default PrivateRoute
