import React, { lazy, Suspense, useState } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { Snackbar } from 'ui'
import Header from 'pages/header'
import SideMenu from 'pages/sideMenu'
import { HOME, SUBSCRIPTIONS, INVENTARY, MANAGER, PERFIL } from 'routes'

const Catalogue = lazy(() => import('pages/catalogue'))
const Subscription = lazy(() => import('pages/subscription'))
const Perfil = lazy(() => import('pages/perfil'))
const Manager = lazy(() => import('pages/manager'))
const Inventary = lazy(() => import('pages/inventary'))

function Main () {
  const [drawerOpen, setDrawerOpen] = useState(true)

  function handleDrawerOpen () {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <Header handleDrawerOpen={handleDrawerOpen} />

      <SideMenu
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
      />

      <Snackbar />

      <MainContainer>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={INVENTARY} component={Inventary} />
            <Route path={SUBSCRIPTIONS} component={Subscription} />
            <Route path={PERFIL} component={Perfil} />
            <Route path={MANAGER} component={Manager} />
            <Route path={HOME} exact component={Catalogue} />
          </Switch>
        </Suspense>
      </MainContainer>
    </>
  )
}

const MainContainer = styled.main`
  background-color: ${({ theme }) => theme.palette.grey[300]};
  display: block;
  min-height: 100vh;
`

export default Main
