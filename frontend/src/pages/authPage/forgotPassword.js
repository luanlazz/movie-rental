import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FormikHelper } from 'ui'
import * as Yup from 'yup'
import { useUsers } from 'hooks'
import {
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { SIGN_IN } from 'routes'
import { ButtonHandle, NavLinkHandle } from 'components'

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
        initialValues={initialValues}
        validation={validation}
        submit={async values => handleSubmitForgotPassword(values)}
        fields={fields}
        page='forgot-password'
      />

      <Grid container alignItems='center'>
        {fetching && <CircularProgress />}
        <ButtonHandle
          variant='contained'
          className='submit'
          disabled={fetching || success}
        >
          Resetar senha
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

export default ForgotPassword
