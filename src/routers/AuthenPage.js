import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
const Login = lazy(() => import('pages/Login'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword'))

const AuthenPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route
          exact
          path="/authen"
          render={() => {
            return <Redirect to="/authen/login" />
          }}
        />
        <Route path="/authen/login" component={Login} />
        <Route path="/authen/forgot-password" component={ForgotPassword} />
      </Switch>
    </Suspense>
  )
}

export default AuthenPage
