import React, { useState, useEffect } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  Backdrop,
  Modal,
  Paper,
  Grid
} from '@material-ui/core'
import {
  FormikHelper
} from 'ui'
import * as Yup from 'yup'
import { useSpring, animated } from 'react-spring/web.cjs'
import { useUsers } from 'hooks'

/* eslint-disable react/prop-types */
const Fade = React.forwardRef(function Fade (props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})
/* eslint-enable react/prop-types */

function UserMaintance ({ handleCloseUserModal, openUserModal, userId }) {
  const { fetching, getUser, saveUser, error } = useUsers()
  const [message, setMessage] = useState({
    msg: '',
    severity: ''
  })
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
    admin: ''
  })

  useEffect(() => {
    setMessage({
      ...error
    })
  }, [error])

  useEffect(() => {
    const getUserMaintance = async () => {
      const res = await getUser(userId)

      if (res) {
        setUser(res)
      }
    }

    getUserMaintance()
  }, [userId])

  const handleSaveUser = async (values) => {
    const res = await saveUser(values)

    if (res) {
      console.log('resposta save', res)
    }
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
    <UserModal
      open={openUserModal}
      onClose={handleCloseUserModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={openUserModal}>
        <Grid container>
          <Paper elevation={2}>
            <FormikHelper
              initialValues={user}
              validation={validation}
              submit={async values => await handleSaveUser(values)}
              fields={fields}
              message={message}
              page='maintance-user'
              fetching={fetching}
            />
          </Paper>
        </Grid>
      </Fade>
    </UserModal>
  )
}

UserMaintance.propTypes = {
  handleCloseUserModal: t.func.isRequired,
  openUserModal: t.bool.isRequired,
  userId: t.number
}

const UserModal = styled(Modal).attrs({

})`
  && {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`
// const CommonButton = styled(Button)`
//   && {
//     color: ${({ theme }) => theme.palette.common.white};
//   }
// `

// const CancelButton = styled(CommonButton)`
//   && {
//     background-color: red;
//   }
// `

// const ConfirmButton = styled(CommonButton)`
//   && {
//     background-color: green;
//   }
// `

export default UserMaintance
