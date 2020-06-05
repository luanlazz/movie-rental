import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import {
  Grid,
  Paper as MaterialPaper,
  LinearProgress
} from '@material-ui/core'
import { ContainerCenter } from 'ui'
import { SIGN_UP, FORGOT_PASSWORD, RESET_PASSWORD, SIGN_IN } from 'routes'

const SignIn = lazy(() => import('./signIn'))
const SignUp = lazy(() => import('./signUp'))
const ForgotPassword = lazy(() => import('./forgotPassword'))
const ResetPassword = lazy(() => import('./resetPassword'))

const SignInImage = lazy(() => import('images/popcorn1'))
const SignUpImage = lazy(() => import('images/popcorn2'))

function AuthPage () {
  return (
    <AuthContainer>
      <Paper>
        <PaperContainer>
          <AuthImage xs={12} sm={3}>
            <ContainerCenter>
              <Switch>
                <Route path={SIGN_IN} exact component={SignInImage} />
                <Route component={SignUpImage} />
              </Switch>

            </ContainerCenter>
          </AuthImage>

          <AuthInput xs={12} sm={9}>
            <ContainerCenter>

              <Suspense fallback={<LinearProgress />}>
                <Switch>
                  <Route path={SIGN_UP} component={SignUp} />
                  <Route path={RESET_PASSWORD} component={ResetPassword} />
                  <Route path={FORGOT_PASSWORD} component={ForgotPassword} />
                  <Route component={SignIn} />
                </Switch>
              </Suspense>

            </ContainerCenter>
          </AuthInput>
        </PaperContainer>
      </Paper>
    </AuthContainer>
  )
}

const AuthContainer = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.palette.grey[800]};
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100%;
`

const Paper = styled(MaterialPaper)`
  && {
    border-radius: 12px;
    max-width: 800px;
  }
`

const PaperContainer = styled(Grid).attrs({
  container: true
})`
  && {
    display: flex;
  }
`

const AuthImage = styled(Grid).attrs({
  item: true
})`
  && {
    display: flex;
  }
`

const AuthInput = styled(Grid).attrs({
  item: true
})`
  && {
    background: ${({ theme }) => theme.palette.grey[200]};
    border-radius: 0 12px 12px 0;
    display: flex;
  }
`

export default AuthPage
