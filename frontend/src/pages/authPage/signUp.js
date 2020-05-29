import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { FormikHelper } from 'ui'
import { H4 } from 'components'
import { useUsers } from 'hooks'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { SIGN_IN } from 'routes'

function RegisterUser () {
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
      <Grid container justify='center'>
        <H4>Cadastro</H4>
      </Grid>

      <FormikHelper
        initialValues={initialValues}
        validation={validation}
        submit={async values => await saveNewUser(values)}
        fields={fields}
        message={message}
        page='signup'
        fetching={fetching}
        inputType='submit'
      />

      <Link to={SIGN_IN}>
        Voltar paga login
      </Link>
    </>
  )
}

export default RegisterUser
