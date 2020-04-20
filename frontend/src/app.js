import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { LOGIN } from './routes'
import { LinearProgress } from '@material-ui/core'

const Main = React.lazy(() => import('pages/main'))
const Login = React.lazy(() => import('pages/login'))

function App () {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  )
}

export default App
