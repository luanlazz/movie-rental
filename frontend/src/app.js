import React, { Suspense } from 'react'
import t from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { HOME, LOGIN } from 'routes'
import { connect } from 'react-redux'

const Main = React.lazy(() => import('pages/main'))
const Login = React.lazy(() => import('pages/login'))

function App ({ location, authUser }) {
  if (authUser.validateToken && location.pathname === LOGIN) {
    return <Redirect to={HOME} />
  }

  if (!authUser.validateToken && location.pathname !== LOGIN) {
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
  location: t.object.isRequired,
  authUser: t.object.isRequired
}

const mapStateToProps = state => ({
  authUser: state.authUser
})

export default connect(mapStateToProps, null)(App)
