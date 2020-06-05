import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Grid, CircularProgress, Typography } from '@material-ui/core'
import { FormikHelper } from 'ui'
import { useUsers } from 'hooks'
import * as Yup from 'yup'
import { SIGN_IN } from 'routes'
import Alert from '@material-ui/lab/Alert'
import { ButtonHandle, NavLinkHandle } from 'components'

function RegisterUser () {
  const formRef = useRef(null)
  const { fetching, saveUser, error } = useUsers()
  const [message, setMessage] = useState({
    msg: '',
    severity: ''
  })

  useEffect(() => {
    setMessage({
      ...error
    })
  }, [error])

  const saveNewUser = async (values) => {
    const res = await saveUser(values)

    if (res) {
      setMessage({
        msg: 'Cadastro realizado com sucesso, favor verifique seu e-mail',
        severity: 'success'
      })
    }
  }

  const submitFormRemotely = () => {
    if (formRef.current) formRef.current.submitForm()
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: ''
  }

  const validation = Yup.object({
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
  })

  const fields = [
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
  ]

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          {!!message.msg && (
            <Alert severity={message.severity}>
              {message.msg}
            </Alert>
          )}
        </Grid>
      </Grid>

      <FormikHelper
        innerRef={formRef}
        initialValues={initialValues}
        validation={validation}
        submit={async values => await saveNewUser(values)}
        fields={fields}
        page='signup'
      />

      <Grid container alignItems='center'>
        {fetching && <CircularProgress />}
        <ButtonHandle
          onClick={submitFormRemotely}
          variant='contained'
          className='submit'
          disabled={fetching}
        >
          Cadastrar
        </ButtonHandle>

        <ButtonsText>
          ou
        </ButtonsText>

        <ButtonHandle variant='text'>
          <NavLinkHandle to={SIGN_IN}>
            login
          </NavLinkHandle>
        </ButtonHandle>
      </Grid>
    </>
  )
}

const ButtonsText = styled(Typography)`
  && {
    padding: 10px;
  }
`

export default RegisterUser
