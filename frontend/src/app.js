import React, { Suspense } from 'react'
import t from 'prop-types'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import {
  HOME,
  AUTH_PAGE,
  RESET_PASSWORD
} from 'routes'

const AuthPage = React.lazy(() => import('pages/authPage'))
const ResetPassword = React.lazy(() => import('pages/authPage/resetPassword'))
const Main = React.lazy(() => import('pages/main'))

function App ({ location, authUser }) {
  if (authUser.validateToken && location.pathname === AUTH_PAGE && location.pathname !== RESET_PASSWORD) {
    return <Redirect to={HOME} />
  }

  if (!authUser.validateToken && location.pathname !== AUTH_PAGE && location.pathname !== RESET_PASSWORD) {
    return <Redirect to={AUTH_PAGE} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={AUTH_PAGE} component={AuthPage} />
        <Route path={RESET_PASSWORD} component={ResetPassword} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  )
}

App.propTypes = {
  location: t.object.isRequired,
  authUser: t.object.isRequired
}

const mapStateToProps = state => ({
  authUser: state.authUser
})

export default connect(mapStateToProps, null)(App)
