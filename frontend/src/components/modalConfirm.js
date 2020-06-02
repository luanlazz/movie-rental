import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
  Backdrop,
  Fade,
  Grid,
  Modal,
  Paper,
  CircularProgress
} from '@material-ui/core'
import ButtonHandle from './button'
import { H4 } from './title'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2)
  }
}))

function ModalConfirm ({ openUserConfirm, handleCloseUserConfirm, handleConfirmDelete, fetching }) {
  const classes = useStyles()

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openUserConfirm}
        onClose={handleCloseUserConfirm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openUserConfirm}>
          <Paper className={classes.paper}>
            <H4>Gostaria de confirma a exclusão do usuário?</H4>

            <GridButtons>
              <GridButton item xs={6}>
                <ButtonHandle
                  variant='contained'
                  className='danger'
                  onClick={() => handleCloseUserConfirm()}
                  fullWidth
                >
                  Cancelar
                </ButtonHandle>
              </GridButton>

              <GridButton item xs={6}>
                {fetching && <CircularProgress />}
                <ButtonHandle
                  variant='contained'
                  className='success'
                  onClick={handleConfirmDelete}
                  fullWidth
                >
                  Confirmar
                </ButtonHandle>
              </GridButton>
            </GridButtons>
          </Paper>
        </Fade>
      </Modal>
    </div>
  )
}

ModalConfirm.propTypes = {
  openUserConfirm: PropTypes.bool.isRequired,
  handleCloseUserConfirm: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
  fetching: PropTypes.bool
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

export default ModalConfirm
