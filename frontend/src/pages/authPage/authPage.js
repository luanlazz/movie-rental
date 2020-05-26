import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import {
  Grid,
  Paper,
  LinearProgress
} from '@material-ui/core'
import {
  Logo
} from 'ui'
import { SIGN_UP, FORGOT_PASSWORD, RESET_PASSWORD } from 'routes'
import backgroundImage from 'images/movies.jpg'

const SignIn = lazy(() => import('./signIn'))
const SignUp = lazy(() => import('./signUp'))
const ForgotPassword = lazy(() => import('./forgotPassword'))
const ResetPassword = lazy(() => import('./resetPassword'))

function AuthPage () {
  return (
    <Container>

      <BackgroundComponent src={backgroundImage} alt='background image' />

      <Grid container justify='center' align='center'>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={2}>

            <Suspense fallback={<LinearProgress />}>
              <Switch>
                <Route path={SIGN_UP} component={SignUp} />
                <Route path={RESET_PASSWORD} component={ResetPassword} />
                <Route path={FORGOT_PASSWORD} component={ForgotPassword} />
                <Route component={SignIn} />
              </Switch>
            </Suspense>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  && {
    flex: 1;
    margin: 0;
  }
`

const BackgroundComponent = styled.img`
  position: absolute;
  z-index: -1;
`

export default AuthPage
