import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Formik,
  Form as FormMaterial
} from 'formik'
import { TextField } from 'ui'

function FormikHandler ({ innerRef, initialValues, validation, submit, fields, page }) {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{ ...initialValues }}
      validationSchema={validation}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        const res = await submit(values)

        if (res) resetForm()

        setSubmitting(false)
      }}
      enableReinitialize
    >
      {/* eslint-disable */}
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur
        } = props
        {/* eslint-enable */ }

        return (
          <Form>
            {fields.map((field) => (
              <TextField
                {...field}
                key={`${page}-${field.name}`}
                label={field.label}
                name={field.name}
                value={values[field.name]}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={(errors[field.name] && touched[field.name]) && errors[field.name]}
                error={(errors[field.name] && touched[field.name])}
                margin='normal'
              />
            ))}
          </Form>
        )
      }}
    </Formik>
  )
}

FormikHandler.propTypes = {
  innerRef: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  page: PropTypes.string.isRequired
}

const Form = styled(FormMaterial)`
  && {
    min-width: 100%;
  }
`

export default FormikHandler
