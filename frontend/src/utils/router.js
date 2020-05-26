import React, { Suspense } from 'react'
import { LinearProgress } from '@material-ui/core'
import { Router as ReactRouter, Switch, Route } from 'react-router'
import history from './history'
import PrivateRoute from './privateRoute'
import { HOME, AUTH_PAGE } from 'routes'
import Main from 'pages/main'
import AuthPage from 'pages/authPage'

// const AuthPage = lazy(() => import('pages/authPage'))
// const Main = lazy(() => import('pages/main'))

const Router = () => (
  <Suspense fallback={<LinearProgress />}>
    <ReactRouter history={history}>
      <Switch>
        <PrivateRoute
          path={HOME}
          component={Main}
        />
        <Route
          path={AUTH_PAGE}
          component={AuthPage}
        />
      </Switch>
    </ReactRouter>
  </Suspense>
)

export default Router
