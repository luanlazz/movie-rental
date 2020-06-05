import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
  Backdrop,
  Fade,
  Modal,
  Paper,
  Grid,
  CircularProgress
} from '@material-ui/core'
import { FormikHelper } from 'ui'
import * as Yup from 'yup'
import { useUsers } from 'hooks'
import { H4, ButtonHandle } from 'components'

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

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confPassword: '',
  admin: ''
}

function UserMaintance ({ handleCloseUserModal, openUserModal, userId, handleSaveUser }) {
  const formRef = useRef(null)
  const { fetching, getUser, error } = useUsers()
  const [message, setMessage] = useState({
    msg: '',
    severity: ''
  })
  const [user, setUser] = useState(initialState)
  const classes = useStyles()

  useEffect(() => {
    setMessage({
      ...error
    })
  }, [error])

  useEffect(() => {
    const getUserMaintance = async () => {
      const res = await getUser(userId)

      if (res) setUser(res)
    }

    getUserMaintance()
  }, [userId, openUserModal])

  const handleCancelMaintance = () => {
    setUser(initialState)
    handleCloseUserModal()
  }

  const validation = Yup.object({
    firstName: Yup.string()
      .max(15, 'São no máximo 15 caracteres ou menos')
      .required('Obrigatorio'),
    lastName: Yup.string()
      .max(20, 'São no máximo 20 caracteres ou menos')
      .required('Obrigatorio'),
    email: Yup.string()
      .email('Endereço de email invalido')
      .required('Obrigatorio'),
    password: Yup.string()
      .min(5, 'Senha deve conter ao menos 5 caracteres')
      .required('Obrigatório'),
    confPassword: Yup.string()
      .min(5, 'Senha deve conter ao menos 5 caracteres')
      .required('Obrigatório'),
    admin: Yup.boolean()
  })

  const fields = [
    {
      label: 'Nome',
      xs: 12,
      name: 'firstName'
    },
    {
      label: 'Sobrenome',
      xs: 12,
      name: 'lastName'
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
      label: 'Confirme a senha',
      xs: 12,
      name: 'confPassword',
      type: 'password'
    },
    {
      label: 'Admin',
      xs: 12,
      name: 'admin'
    }
  ]

  const submitFormRemotely = () => {
    if (formRef.current) formRef.current.submitForm()
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openUserModal}
        onClose={handleCloseUserModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openUserModal}>
          <Paper className={classes.paper}>
            <H4>Alteração de dados</H4>

            <FormikHelper
              innerRef={formRef}
              initialValues={user}
              validation={validation}
              submit={async values => await handleSaveUser(values)}
              fields={fields}
              message={message}
              page='maintance-user'
              fetching={fetching}
              inputType='crud'
              handleClose={handleCancelMaintance}
            />

            <GridActionsForm>
              {fetching && <CircularProgress />}
              <ButtonHandle
                onClick={handleCancelMaintance}
                variant='text'
                className='danger'
                disabled={fetching}
              >
                Cancelar
              </ButtonHandle>

              <ButtonHandle
                onClick={submitFormRemotely}
                variant='contained'
                className='submit'
                disabled={fetching}
              >
                Confirmar
              </ButtonHandle>
            </GridActionsForm>
          </Paper>
        </Fade>
      </Modal>
    </div>
  )
}

UserMaintance.propTypes = {
  handleCloseUserModal: PropTypes.func.isRequired,
  openUserModal: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  handleSaveUser: PropTypes.func
}

const GridActionsForm = styled(Grid).attrs({
  container: true
})`
  && {
    display: inline-flex;
    justify-content: space-around;
  }
`

export default UserMaintance
