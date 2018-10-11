import { NavigationPath } from '@components/navbar'
import AuthService from '@services/auth'
import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

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
