import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { AUTH_PAGE, HOME } from 'routes'
import PrivateRoute from 'utils/privateRoute'
import AuthPage from 'pages/authPage'
import Main from 'pages/main'

function App () {
  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path={AUTH_PAGE} component={AuthPage} />
          <PrivateRoute path={HOME} component={Main} />
        </Switch>
      </Suspense>
    </>
  )
}

export default App
