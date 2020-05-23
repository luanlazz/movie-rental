import React, { Suspense, useState } from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  LinearProgress,
  Snackbar
} from '@material-ui/core'
import Header from 'pages/header'
import SideMenu from 'pages/sideMenu'
import { HOME, SUBSCRIPTIONS, INVENTARY, MANAGER, PERFIL } from 'routes'
import Alert from '@material-ui/lab/Alert'

const Catalogue = React.lazy(() => import('pages/catalogue'))
const Subscription = React.lazy(() => import('pages/subscription'))
const Perfil = React.lazy(() => import('pages/perfil'))
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

      <SideMenu
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
      />

      <MainContainer>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open
        >
          <Alert severity='success'>
            Mensagem teste
          </Alert>
        </Snackbar>

        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={HOME} exact component={Catalogue} />
            <Route path={INVENTARY} component={Inventary} />
            <Route path={SUBSCRIPTIONS} component={Subscription} />
            <Route path={PERFIL} component={Perfil} />
            <Route path={MANAGER} component={Manager} />
          </Switch>
        </Suspense>

      </MainContainer>
    </>
  )
}

const MainContainer = styled.main`
  background-color: ${({ theme }) => theme.palette.grey[300]};
  display: block;
  flex-grow: 1;
`

export default Main
