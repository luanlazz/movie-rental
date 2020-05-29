import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, CircularProgress } from '@material-ui/core'
import { ButtonDanger, ButtonSubmit, ButtonSuccess } from 'components'

function ButtonsForm ({ inputType, fetching, success, handleClose }) {
  return (
    <GridButtons>
      {inputType === 'submit' &&
        !fetching && !success &&
          <GridButton item xs={8}>
            {fetching && <CircularProgress />}
            <ButtonSubmit
              type='submit'
              variant='contained'
              fullWidth
            >
              Enviar
            </ButtonSubmit>
          </GridButton>}

      {inputType === 'crud' &&
        !fetching && !success &&
          <>
            <GridButton item xs={6}>
              <ButtonDanger
                type='reset'
                variant='contained'
                onClick={() => handleClose()}
                fullWidth
              >
                Cancelar
              </ButtonDanger>
            </GridButton>

            <GridButton item xs={6}>
              {fetching && <CircularProgress />}
              <ButtonSuccess
                type='submit'
                variant='contained'
                fullWidth
              >
                Confirmar
              </ButtonSuccess>
            </GridButton>
          </>}
    </GridButtons>
  )
}

ButtonsForm.propTypes = {
  inputType: PropTypes.string.isRequired,
  fetching: PropTypes.bool,
  success: PropTypes.bool,
  handleClose: PropTypes.func
}

const GridButtons = styled(Grid).attrs({
  container: true
})`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
  }
`

const GridButton = styled(Grid).attrs({

})`
  && {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default ButtonsForm
