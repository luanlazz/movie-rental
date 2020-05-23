import React, { useEffect } from 'react'
import t from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  loginUser,
  validateToken,
  setFetching
} from 'redux-flow/reducers/auth-user/action-creators'
import {
  FormikHelper
} from 'ui'
import * as Yup from 'yup'
import { HOME } from 'routes'

function AuthPage ({ authUser, onSubmit, validateToken, setFetching }) {
  useEffect(() => {
    console.log('effect valida token')

    const validate = async () => {
      await validateToken(authUser)
    }

    if (authUser.logged) {
      validate()
    }
  }, [authUser, validateToken])

  if (authUser.validateToken) {
    return <Redirect to={HOME} />
  }

  const submitForm = async (values) => {
    setFetching(true)
    await onSubmit(values)
    setFetching(false)
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validation = Yup.object({
    email: Yup.string()
      .email('Endereço de email invalido')
      .required('Obrigatorio'),
    password: Yup.string()
      .min(5, 'Senha deve conter ao menos 5 caracteres')
      .required('Obrigatório')
  })

  const fields = [
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
  ]

  return (
    <FormikHelper
      initialValues={initialValues}
      validation={validation}
      submit={async values => await submitForm(values)}
      fields={fields}
      message={{
        message: authUser.message,
        severity: 'error'
      }}
      page='signin'
      fetching={authUser.fetching}
    />
  )
}

AuthPage.propTypes = {
  authUser: t.object.isRequired,
  onSubmit: t.func.isRequired,
  validateToken: t.func.isRequired,
  setFetching: t.func.isRequired
}

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
