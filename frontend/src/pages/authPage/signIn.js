import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  loginUser,
  validateToken,
  setFetching
} from 'redux-flow/reducers/auth-user/action-creators'
import { openSnackbar } from 'redux-flow/reducers/snackbars/action-creators'
import { FormikHelper } from 'ui'
import * as Yup from 'yup'
import { SIGN_UP, FORGOT_PASSWORD, HOME } from 'routes'
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import ButtonHandle from 'components/button'
import { NavLinkHandle } from 'components'

function SignIn ({ authUser, onSubmit, validateToken, setFetching, openSnackbarSignin }) {
  const formRef = React.useRef(null)

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

  const handleSubmitForm = async (values) => {
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

  const submitFormRemotely = () => {
    if (formRef.current) formRef.current.submitForm()
  }

  // const resetFormRemotely = () => {
  //   if (formRef.current) formRef.current.resetForm()
  // }

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          {!!authUser.message && (
            <Alert severity='error'>
              {authUser.message}
            </Alert>
          )}
        </Grid>
      </Grid>

      <FormikHelper
        initialValues={initialValues}
        validation={validation}
        submit={async values => await handleSubmitForm(values)}
        fields={fields}
        page='signin'
        innerRef={formRef}
      />

      <Grid container alignItems='center'>
        {authUser.fetching && <CircularProgress />}
        <ButtonHandle
          onClick={submitFormRemotely}
          variant='contained'
          className='submit'
          disabled={authUser.fetching}
        >
          Entrar
        </ButtonHandle>

        <ButtonsText>
          ou
        </ButtonsText>

        <ButtonHandle variant='text'>
          <NavLinkHandle to={SIGN_UP}>
            Registrar
          </NavLinkHandle>
        </ButtonHandle>
      </Grid>

      <Grid container>
        <Button variant='text'>
          <NavLinkHandle to={FORGOT_PASSWORD}>
            Recuperar Senha
          </NavLinkHandle>
        </Button>
      </Grid>
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

const ButtonsText = styled(Typography)`
  && {
    padding: 10px;
  }
`

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
