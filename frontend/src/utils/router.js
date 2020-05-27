import React, { Suspense } from 'react'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route } from 'react-router'
import PrivateRoute from './privateRoute'
import { HOME, AUTH_PAGE } from 'routes'
import AuthPage from 'pages/authPage'
import Main from 'pages/main'

const Router = () => (
  <Suspense fallback={<LinearProgress />}>
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
  </Suspense>
)

export default Router
