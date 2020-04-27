import React, { useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import {
  Paper,
  Grid,
  TextField as MaterialTextField,
  Button,
  CircularProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Logo } from 'ui'
import { useAuth } from 'hooks'
import { HOME } from 'routes'

function Login () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { userInfo, login, errorMessage, fetchingUser } = useAuth()

  function handleFieldChange (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function onSubmit () {
    login(user)
  }

  if (userInfo.isUserLoggedIn) {
    return <Redirect to={HOME} />
  }

  return (
    <Container>
      <Grid container justify='center' align='center'>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={2}>
            <GridContainer>

              <Grid item>
                {!!errorMessage &&
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>}
              </Grid>

              {[
                {
                  label: 'E-mail',
                  xs: 12,
                  name: 'email',
                  type: 'email'
                },
                {
                  label: 'Senha',
                  xs: 12,
                  name: 'password',
                  type: 'password'
                }
              ].map((field) => (
                <TextField
                  {...field}
                  key={field.name}
                  value={user[field.name]}
                  onChange={handleFieldChange}
                  disabled={fetchingUser}
                />
              ))}

              <Grid item xs={8}>
                {fetchingUser && <CircularProgress />}
                {!fetchingUser &&
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={onSubmit}
                    fullWidth
                  >
                    Entrar
                  </Button>}
              </Grid>

            </GridContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  background: rgb(2,0,36);
  background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(101,0,0,1) 68%, rgba(139,7,7,1) 83%, rgba(194,3,3,1) 100%);
  flex: 1;
  margin: 0;
  padding: ${({ theme }) => theme.spacing(4)}px;
`

const GridContainer = styled(Grid).attrs({
  container: true,
  justify: 'center',
  align: 'center',
  spacing: 2
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

function TextField ({ xs, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        variant='standard'
        fullWidth
        {...props}
      />
    </Grid>
  )
}

TextField.propTypes = {
  xs: t.number
}

export default Login
