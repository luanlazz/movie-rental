import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from 'pages/header'
import { HOME } from 'routes'
import { LinearProgress } from '@material-ui/core'

const Catalogue = React.lazy(() => import('pages/catalogue'))

function Main () {
  return (
    <>
      <Header />

      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path={HOME} exact component={Catalogue} />
        </Switch>
      </Suspense>
    </>
  )
}

export default Main
