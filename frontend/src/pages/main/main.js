import React, { Suspense, useState } from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  LinearProgress,
  withStyles
} from '@material-ui/core'
import Header from 'pages/header'
import AsideMenu from 'pages/asideMenu'
import { HOME, SUBSCRIPTIONS, INVENTARY, MANAGER } from 'routes'

const Catalogue = React.lazy(() => import('pages/catalogue'))
const Subscription = React.lazy(() => import('pages/subscription'))
const Manager = React.lazy(() => import('pages/manager'))
const Inventary = React.lazy(() => import('pages/inventary'))

function Main () {
  const [drawerOpen, setDrawerOpen] = useState(true)

  function handleDrawerOpen () {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <Header handleDrawerOpen={handleDrawerOpen} />

      <GridContainer>
        {drawerOpen && <AsideMenu open={drawerOpen} />}

        <Spacer />

        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={HOME} exact component={Catalogue} />
            <Route path={INVENTARY} component={Inventary} />
            <Route path={SUBSCRIPTIONS} component={Subscription} />
            <Route path={MANAGER} component={Manager} />
          </Switch>
        </Suspense>

      </GridContainer>
    </>
  )
}

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

const GridContainer = styled.main`
  display: flex;
  flex-grow: 1;
`

export default Main
