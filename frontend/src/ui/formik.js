import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  Formik,
  Form as FormMaterial
} from 'formik'
import {
  Button,
  CircularProgress,
  Grid
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
  ContainerCenter,
  TextField
} from 'ui'

function FormikHandler ({ initialValues, validation, submit, fields, message, page, fetching, success, completed }) {
  return (
    <ContainerCenter>
      <Formik
        initialValues={{
          ...initialValues
        }}
        validationSchema={validation}
        onSubmit={(values) => submit(values)}
        enableReinitialize
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
              <Grid container alignItems='center'>
                <Grid item xs={!success ? 12 : 10}>
                  {!!message.msg && (
                    <Alert severity={message.severity}>
                      {message.msg}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={2}>
                  {success && page === 'reset-password' && <CircularProgress variant='static' value={completed} />}
                </Grid>
              </Grid>

              {fields.map((field) => (
                <TextField
                  {...field}
                  key={`${page}-${field.name}`}
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
                {fetching && <CircularProgress />}
                {!fetching && !success &&
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
    </ContainerCenter>
  )
}

FormikHandler.propTypes = {
  initialValues: t.object.isRequired,
  validation: t.object.isRequired,
  submit: t.func.isRequired,
  fields: t.array.isRequired,
  message: t.object,
  page: t.string,
  fetching: t.bool,
  success: t.bool,
  completed: t.number
}

const Form = styled(FormMaterial)`
  && {
    min-width: 100%;
  }
`

export default FormikHandler
