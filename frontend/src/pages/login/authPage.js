import React, { useState } from 'react'
import t from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  Grid
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
  LoginContainer,
  TextField
} from 'ui'
import {
  loginUser,
  validateToken,
  setFetching
} from 'redux-flow/reducers/auth-user/action-creators'
import { HOME } from 'routes'

function AuthPage ({ authUser, onSubmit, validateToken, setFetching }) {
  const [user, setUser] = useState({})

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const submitForm = async () => {
    setFetching(true)
    await onSubmit(user)
    setFetching(false)
  }

  if (authUser.logged) {
    const validate = async () => {
      await validateToken(authUser)
    }

    validate()
  }

  if (authUser.validateToken) {
    return <Redirect to={HOME} />
  }

  return (
    <LoginContainer>
      <Grid item>
        {!!authUser.message && (
          <Alert severity='error'>
            {authUser.message}
          </Alert>
        )}
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
          key={`auth-${field.name}`}
          value={user[field.name]}
          onChange={handleFieldChange}
        />
      ))}

      <Grid item xs={8}>
        {authUser.fetching && <CircularProgress />}
        {!authUser.fetching &&
          <Button
            variant='contained'
            onClick={submitForm}
            fullWidth
          >
            Entrar
          </Button>}
      </Grid>
    </LoginContainer>
  )
}

AuthPage.propTypes = {
  authUser: t.object.isRequired,
  onSubmit: t.func.isRequired,
  validateToken: t.func.isRequired,
  setFetching: t.func.isRequired
}

const mapStateToProps = state => ({
  authUser: state.authUser
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (user) => {
    await dispatch(loginUser(user))
  },
  validateToken: async (user) => {
    await dispatch(validateToken(user))
  },
  setFetching: (value) => {
    dispatch(setFetching(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
