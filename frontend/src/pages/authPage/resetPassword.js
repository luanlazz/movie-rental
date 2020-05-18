import React, { useEffect, useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import {
  Button,
  Grid,
  Paper,
  CircularProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
  Formik,
  Form as FormMaterial
} from 'formik'
import * as Yup from 'yup'
import {
  LoginContainer,
  Logo,
  TextField
} from 'ui'
import { useUsers } from 'hooks'
import { AUTH_PAGE } from 'routes'

function ResetPassword ({ location }) {
  const { fetchingUsers, resetPassword, errorMessage } = useUsers()
  const [message, setMessage] = useState({
    message: '',
    severity: ''
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setMessage({
      message: errorMessage,
      severity: 'error'
    })
  }, [errorMessage])

  if (success) {
    return <Redirect to={AUTH_PAGE} />
  }

  const handleSubmitResetPassword = async (values) => {
    const urlParams = new URLSearchParams(location.search)
    const email = urlParams.get('email')
    const token = urlParams.get('token')

    const payload = {
      ...values,
      token,
      email
    }

    await resetPassword(payload)
      .then(res => {
        if (res) {
          setMessage({
            message: 'Senha alterada com sucesso, por favor aguarde, vamos lhe redirecionar ao login',
            severity: 'success'
          })
          setTimeout(() => {
            setSuccess(true)
          }, 2000)
        }
      })
      .catch(res => {
        console.log('error:', res)
      })
  }

  return (
    <Container>
      <Grid container justify='center' align='center'>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={2}>
            <LoginContainer>
              <Formik
                initialValues={{
                  password: '',
                  confPassword: ''
                }}
                validationSchema={Yup.object({
                  password: Yup.string()
                    .min(5, 'Senha deve conter ao menos 5 caracteres')
                    .required('Obrigatório'),
                  confPassword: Yup.string()
                    .min(5, 'Senha deve conter ao menos 5 caracteres')
                    .required('Obrigatório')
                })}
                onSubmit={async (values) => {
                  await handleSubmitResetPassword(values)
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
                        {!!message.message && (
                          <Alert severity={message.severity}>
                            {message.message}
                          </Alert>
                        )}
                      </Grid>

                      {[
                        {
                          label: 'Nova senha',
                          xs: 12,
                          name: 'password',
                          type: 'password'
                        },
                        {
                          label: 'Digite novamente a senha',
                          xs: 12,
                          name: 'confPassword',
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
                        {fetchingUsers && <CircularProgress />}
                        {!fetchingUsers &&
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

ResetPassword.propTypes = {
  location: t.object.isRequired
}

const Container = styled.div`
  background: rgb(2,0,36);
  background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(101,0,0,1) 68%, rgba(139,7,7,1) 83%, rgba(194,3,3,1) 100%);
  flex: 1;
  margin: 0;
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Form = styled(FormMaterial)`
  && {
    min-width: 100%;
  }
`

export default ResetPassword
