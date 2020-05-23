import React, { useEffect, useState } from 'react'
import t from 'prop-types'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import {
  FormikHelper
} from 'ui'
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
    <FormikHelper
      initialValues={initialValues}
      validation={validation}
      submit={async values => await submitResetPassword(values)}
      fields={fields}
      message={message}
      page='reset-password'
      fetching={fetching}
      success={success}
    />
  )
}

ResetPassword.propTypes = {
  location: t.object.isRequired
}

export default ResetPassword
