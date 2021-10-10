import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSignIned } from 'services/authen.service'

const AuthenRoute = ({ component: Component, path, exact, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isSignIned() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/authen',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default AuthenRoute
