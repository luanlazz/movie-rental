import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  Grid
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
  Formik,
  Form as FormMaterial
} from 'formik'
import * as Yup from 'yup'
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
  if (authUser.logged) {
    const validate = async () => {
      await validateToken(authUser)
    }

    validate()
  }

  if (authUser.validateToken) {
    return <Redirect to={HOME} />
  }

  const submitForm = async (values) => {
    setFetching(true)
    await onSubmit(values)
    setFetching(false)
  }

  return (
    <LoginContainer>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Endereço de email invalido')
            .required('Obrigatorio'),
          password: Yup.string()
            .min(5, 'Senha deve conter ao menos 5 caracteres')
            .required('Obrigatório')
        })}
        onSubmit={async (values) => {
          await submitForm(values)
        }}
      >
        {/* eslint-disable */}
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = props
          {/* eslint-enable */ }
          return (
            <Form onSubmit={handleSubmit}>
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
                  key={`signin-${field.name}`}
                  label={field.label}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={(errors[field.name] && touched[field.name]) && errors[field.name]}
                  error={(errors[field.name] && touched[field.name])}
                  margin='normal'
                />
              ))}

              <Grid item xs={8}>
                {authUser.fetching && <CircularProgress />}
                {!authUser.fetching &&
                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                  >
                    Enviar
                  </Button>}
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </LoginContainer>
  )
}

AuthPage.propTypes = {
  authUser: t.object.isRequired,
  onSubmit: t.func.isRequired,
  validateToken: t.func.isRequired,
  setFetching: t.func.isRequired
}

const Form = styled(FormMaterial)`
  && {
    min-width: 100%;
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
    await dispatch(validateToken(user))
  },
  setFetching: (value) => {
    dispatch(setFetching(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
