import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import {
  loginUser,
  validateToken,
  setFetching
} from 'redux-flow/reducers/auth-user/action-creators'
import { openSnackbar } from 'redux-flow/reducers/snackbars/action-creators'
import { FormikHelper } from 'ui'
import { H4, H6 } from 'components'
import * as Yup from 'yup'
import { SIGN_UP, FORGOT_PASSWORD, HOME } from 'routes'
import { Grid } from '@material-ui/core'

function SignIn ({ authUser, onSubmit, validateToken, setFetching, openSnackbarSignin }) {
  useEffect(() => {
    const validate = async () => {
      const res = await validateToken(authUser)

      if (res) {
        openSnackbarSignin('Logado com suceso!', 'success')
      }
    }

    if (authUser.logged) {
      validate()
    }
  }, [authUser, validateToken])

  const submitForm = async (values) => {
    setFetching(true)
    await onSubmit(values)
    setFetching(false)
  }

  if (authUser.validateToken) {
    return <Redirect to={HOME} />
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validation = Yup.object({
    email: Yup.string()
      .email('Endereço de email invalido')
      .required('Obrigatorio'),
    password: Yup.string()
      .min(5, 'Senha deve conter ao menos 5 caracteres')
      .required('Obrigatório')
  })

  const fields = [
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
  ]

  return (
    <>
      <Grid container justify='center'>
        <H4>Login</H4>
      </Grid>

      <FormikHelper
        initialValues={initialValues}
        validation={validation}
        submit={async values => await submitForm(values)}
        fields={fields}
        message={{
          msg: authUser.message,
          severity: 'error'
        }}
        page='signin'
        fetching={authUser.fetching}
        inputType='submit'
      />

      <NavLink to={SIGN_UP}>
        <H6>Ainda não tem uma conta? Registre-se aqui</H6>
      </NavLink>

      <NavLink to={FORGOT_PASSWORD}>
        <H6>Esqueceu sua senha? clique aqui</H6>
      </NavLink>
    </>
  )
}

SignIn.propTypes = {
  authUser: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  openSnackbarSignin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  authUser: state.authUser
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (user) => {
    await dispatch(loginUser(user))
  },
  validateToken: async (user) => {
    const res = await dispatch(validateToken(user))
    return res
  },
  setFetching: (value) => {
    dispatch(setFetching(value))
  },
  openSnackbarSignin: (message, severity) => {
    dispatch(openSnackbar(message, severity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
