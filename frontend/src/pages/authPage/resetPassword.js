import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {
  CircularProgress,
  Grid,
  Button
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { FormikHelper } from 'ui'
import * as Yup from 'yup'
import { useUsers } from 'hooks'
import { AUTH_PAGE } from 'routes'

function ResetPassword ({ location }) {
  const { fetching, resetPassword, error } = useUsers()
  const [success, setSuccess] = useState(false)
  const [completed, setCompleted] = useState(0)
  const [message, setMessage] = useState({
    msg: '',
    severity: ''
  })

  useEffect(() => {
    setMessage({
      ...error
    })
  }, [error])

  useEffect(() => {
    if (success) {
      const progress = () => {
        setCompleted(prevCompleted => prevCompleted >= 100 ? 100 : prevCompleted + 10)
      }

      setMessage({
        msg: 'Senha alterada com sucesso, por favor aguarde, vamos lhe redirecionar ao login',
        severity: 'success'
      })

      const timer = setInterval(progress, 500)
      return () => {
        clearInterval(timer)
      }
    }
  }, [success])

  if (completed === 100) {
    return <Redirect to={AUTH_PAGE} />
  }

  const submitResetPassword = async (values) => {
    const urlParams = new URLSearchParams(location.search)
    const email = urlParams.get('email')
    const token = urlParams.get('token')

    const payload = {
      ...values,
      token,
      email
    }

    const res = await resetPassword(payload)

    if (res) setSuccess(res)
  }

  const initialValues = {
    password: '',
    confPassword: ''
  }

  const validation = Yup.object({
    password: Yup.string()
      .min(5, 'Senha deve conter ao menos 5 caracteres')
      .required('Obrigatório'),
    confPassword: Yup.string()
      .min(5, 'Senha deve conter ao menos 5 caracteres')
      .required('Obrigatório')
  })

  const fields = [
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
  ]

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={!success ? 12 : 10}>
          {!!message.msg && (
            <Alert severity={message.severity}>
              {message.msg}
            </Alert>
          )}
        </Grid>
        <Grid item xs={2}>
          {success && <CircularProgress variant='static' value={completed} />}
        </Grid>
      </Grid>

      <FormikHelper
        initialValues={initialValues}
        validation={validation}
        submit={async values => await submitResetPassword(values)}
        fields={fields}
        page='reset-password'
      />

      {!fetching && !success &&
        <Grid container xs={8}>
          {fetching && <CircularProgress />}
          <Button
            type='submit'
            variant='contained'
            fullWidth
          >
            Confirmar nova senha
          </Button>
        </Grid>}
    </>
  )
}

ResetPassword.propTypes = {
  location: PropTypes.object.isRequired
}

export default ResetPassword
