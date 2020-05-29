import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Formik,
  Form as FormMaterial
} from 'formik'
import {
  CircularProgress,
  Grid
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {
  ContainerCenter,
  TextField
} from 'ui'
import ButtonsForm from './buttons'

function FormikHandler ({ initialValues, validation, submit, fields, message, page, fetching, success, completed, inputType, handleClose }) {
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

              <ButtonsForm
                inputType={inputType}
                fetching={fetching}
                success={success}
                handleClose={handleClose}
              />
            </Form>
          )
        }}
      </Formik>
    </ContainerCenter>
  )
}

FormikHandler.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  message: PropTypes.object,
  page: PropTypes.string,
  fetching: PropTypes.bool,
  success: PropTypes.bool,
  completed: PropTypes.number,
  inputType: PropTypes.string,
  handleClose: PropTypes.func
}

const Form = styled(FormMaterial)`
  && {
    min-width: 100%;
  }
`

export default FormikHandler
