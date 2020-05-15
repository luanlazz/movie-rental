import React from 'react'
// import {
//   Button,
//   CircularProgress,
//   Grid
// } from '@material-ui/core'
import {
  LoginContainer
  // TextField
} from 'ui'
// import { useUsers } from 'hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// const validate = values => {
//   const errors = {}

//   if (!values.firstName) {
//     errors.firstName = 'Required'
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'São no máximo 15 caracteres ou menos'
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required'
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'São no máximo 20 caracteres ou menos'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Endereço de email não válido'
//   }

//   return errors
// }

function RegisterUser () {
  // const { user, fetchingUsers, registerUser } = useUsers()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'São no máximo 15 caracteres ou menos')
        .required('Obrigatorio'),
      lastName: Yup.string()
        .max(20, 'São no máximo 20 caracteres ou menos')
        .required('Obrigatorio'),
      email: Yup.string()
        .email('Endereço de email invalido')
        .required('Obrigatorio')
    }),
    onSubmit: values => {
      console.log('submit', values)
    }
  })
  return (
    <LoginContainer>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='firstName'>Nome</label>
        <input name='firstName' {...formik.getFieldProps('firstName')} />
        {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

        <label htmlFor='lastName'>Sobrenome</label>
        <input name='lastName' {...formik.getFieldProps('lastName')} />
        {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

        <label htmlFor='email'>Email</label>
        <input name='email' {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <button type='submit'>Enviar</button>
      </form>

      {/* {[
        {
          label: 'Nome',
          xs: 12,
          name: 'name'
        },
        {
          label: 'Sobrenome',
          xs: 12,
          name: 'name'
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
          label: 'Digite novamente a senha',
          xs: 12,
          name: 'confPassword',
          type: 'password'
        }
      ].map((field) => (
        <TextField
          {...field}
          key={`register-${field.name}`}
          value={user[field.name]}
          onChange={handleFieldChangeUser}
          disabled={fetchingUsers}
        />
      ))}

      <Grid item xs={8}>
        {fetchingUsers && <CircularProgress />}
        {!fetchingUsers &&
          <Button
            variant='contained'
            onClick={registerUser}
            fullWidth
          >
            Registrar
          </Button>}
      </Grid> */}
    </LoginContainer>
  )
}

export default RegisterUser
