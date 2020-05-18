import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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
  Formik,
  Form as FormMaterial
} from 'formik'
import * as Yup from 'yup'
import { useUsers } from 'hooks'

function ForgotPassword () {
  const { fetchingUsers, forgotPassword, errorMessage } = useUsers()
  const [message, setMessage] = useState({
    message: '',
    severity: ''
  })

  useEffect(() => {
    setMessage({
      message: errorMessage,
      severity: 'error'
    })
  }, [errorMessage])

  const handleSubmitForgotPassword = async (values) => {
    await forgotPassword(values)
      .then(res => {
        if (res) {
          setMessage({
            message: 'Link para recuperar sua senha enviada para seu e-mail',
            severity: 'success'
          })
        }
      })
      .catch(res => {
        console.log('error:', res)
      })
  }

  return (
    <LoginContainer>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Endereço de email invalido')
            .required('Obrigatorio')
        })}
        onSubmit={async (values) => {
          handleSubmitForgotPassword(values)
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
                  label: 'E-mail',
                  xs: 12,
                  name: 'email',
                  type: 'email'
                }
              ].map((field) => (
                <TextField
                  {...field}
                  key={`forgot-password-${field.name}`}
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
  )
}

const Form = styled(FormMaterial)`
  && {
    min-width: 100%;
  }
`

export default ForgotPassword
