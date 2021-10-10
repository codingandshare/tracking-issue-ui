import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthenRoute from './AuthenRoute'
import { isSignIned } from 'services/authen.service'
const AppPage = lazy(() => import('./AppPage'))
const AuthenPage = lazy(() => import('./AuthenPage'))

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" render={() => (isSignIned() ? <Redirect to={'/app/'} /> : <Redirect to="/authen" />)} />
          <AuthenRoute path="/app" component={AppPage} />
          <Route path="/authen" component={AuthenPage} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default AppRouter
