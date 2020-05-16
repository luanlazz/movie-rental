import React from 'react'
import styled from 'styled-components'
import {
  Button,
  CircularProgress,
  Grid
} from '@material-ui/core'
import {
  LoginContainer,
  TextField
} from 'ui'
import { useUsers } from 'hooks'
import {
  Formik,
  Form as FormMaterial
} from 'formik'
import * as Yup from 'yup'

function RegisterUser () {
  const { fetchingUsers, saveUser } = useUsers()

  return (
    <LoginContainer>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confPassword: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'São no máximo 15 caracteres ou menos')
            .required('Obrigatorio'),
          lastName: Yup.string()
            .max(20, 'São no máximo 20 caracteres ou menos')
            .required('Obrigatorio'),
          email: Yup.string()
            .email('Endereço de email invalido')
            .required('Obrigatorio'),
          password: Yup.string()
            .min(5, 'Senha deve conter ao menos 5 caracteres')
            .required('Obrigatório'),
          confPassword: Yup.string()
            .min(5, 'Senha deve conter ao menos 5 caracteres')
            .required('Obrigatório')
        })}
        onSubmit={async (values) => {
          await saveUser(values)
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
              {[
                {
                  label: 'Nome',
                  xs: 12,
                  name: 'firstName'
                },
                {
                  label: 'Sobrenome',
                  xs: 12,
                  name: 'lastName'
                },
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
                },
                {
                  label: 'Confirme a senha',
                  xs: 12,
                  name: 'confPassword',
                  type: 'password'
                }
              ].map((field) => (
                <TextField
                  {...field}
                  key={`register-${field.name}`}
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
    display: block;
    min-width: 100%;
  }
`

export default RegisterUser
