import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Backdrop,
  Fade,
  Modal,
  Paper
} from '@material-ui/core'
import { FormikHelper } from 'ui'
import * as Yup from 'yup'
import { useUsers } from 'hooks'
import { H4 } from 'components'

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
    admin: Yup.boolean()
      .required('Obrigatório')
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
      label: 'Admin',
      xs: 12,
      name: 'admin'
    }
  ]

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

export default UserMaintance
