import React, { useState, useEffect } from 'react'
import { FormikHelper, H4 } from 'ui'
import * as Yup from 'yup'
import { useUsers } from 'hooks'
import { Grid } from '@material-ui/core'

function ForgotPassword () {
  const { fetching, forgotPassword, error } = useUsers()
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState({
    msg: '',
    severity: ''
  })

  useEffect(() => {
    setMessage({
      ...error
    })
  }, [error])

  const handleSubmitForgotPassword = async (values) => {
    const res = await forgotPassword(values)

    if (res) {
      setMessage({
        msg: 'Link para recuperar sua senha enviada para seu e-mail',
        severity: 'success'
      })
      setSuccess(true)
    }
  }

  const initialValues = {
    email: ''
  }

  const validation = Yup.object({
    email: Yup.string()
      .email('Endereço de email invalido')
      .required('Obrigatorio')
  })

  const fields = [
    {
      label: 'E-mail',
      xs: 12,
      name: 'email',
      type: 'email'
    }
  ]

  return (
    <>
      <Grid container justify='center'>
        <H4>Recuperar senha</H4>
      </Grid>

      <FormikHelper
        initialValues={initialValues}
        validation={validation}
        submit={async values => handleSubmitForgotPassword(values)}
        fields={fields}
        message={message}
        page='forgot-password'
        fetching={fetching}
        success={success}
      />

    </>
  )
}

export default ForgotPassword
