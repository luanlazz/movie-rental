import React, { Suspense } from 'react'
import t from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { useAuth } from 'hooks'
import { HOME, LOGIN } from 'routes'

const Main = React.lazy(() => import('pages/main'))
const Login = React.lazy(() => import('pages/login'))

function App ({ location }) {
  const { userInfo } = useAuth()

  if (userInfo.isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }

  if (!userInfo.isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  )
}

App.propTypes = {
  location: t.object.isRequired
}

export default App
