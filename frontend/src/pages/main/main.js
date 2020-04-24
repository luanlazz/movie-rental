import React, { Suspense, useState } from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  LinearProgress,
  Grid,
  withStyles
} from '@material-ui/core'
import Header from 'pages/header'
import AsideMenu from 'pages/asideMenu'
import { HOME } from 'routes'

const Catalogue = React.lazy(() => import('pages/catalogue'))

function Main () {
  const [asideMenu, setAsideMenu] = useState(true)

  function handleAsideMenu (e) {
    setAsideMenu(!asideMenu)
  }

  return (
    <>
      <Header handleAsideMenu={handleAsideMenu} />

      <GridContainer>
        {!!asideMenu && <AsideMenu />}

        <Spacer />

        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={HOME} exact component={Catalogue} />
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

const GridContainer = styled(Grid).attrs({
  container: true
})`
  && {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }
`

export default Main
