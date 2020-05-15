import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  Backdrop,
  Button,
  Grid,
  Modal,
  Paper,
  CircularProgress
} from '@material-ui/core'
import {
  H4,
  TextField
} from 'ui'
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

function UserMaintance ({ handleCloseUserModal, openUserModal, handleSaveUser }) {
  const { user, fetchingUsers, handleFieldChangeUser } = useUsers()

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
        <Paper elevation={2}>
          <GridContainer>

            <Grid item xs={12}>
              <H4>Atualização de cadastro</H4>
            </Grid>

            {fetchingUsers && <CircularProgress color='inherit' />}

            {[
              {
                label: 'Nome',
                xs: 12,
                name: 'name'
              },
              {
                label: 'E-mail',
                xs: 12,
                name: 'email',
                type: 'email'
              }
            ].map((field) => (
              <TextField
                {...field}
                key={field.name}
                value={user[field.name]}
                onChange={handleFieldChangeUser}
                disabled={fetchingUsers}
              />
            ))}

            <Grid item>
              <GridButtons>
                <CancelButton
                  variant='contained'
                  onClick={handleCloseUserModal}
                >
                  Cancelar
                </CancelButton>

                <ConfirmButton
                  variant='contained'
                  onClick={handleSaveUser}
                >
                  Confirmar
                </ConfirmButton>
              </GridButtons>
            </Grid>

          </GridContainer>
        </Paper>
      </Fade>
    </UserModal>
  )
}

UserMaintance.propTypes = {
  handleCloseUserModal: t.func.isRequired,
  openUserModal: t.bool.isRequired,
  handleSaveUser: t.func.isRequired
}

const UserModal = styled(Modal).attrs({

})`
  && {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`

const GridContainer = styled(Grid).attrs({
  container: true,
  justify: 'center',
  align: 'center',
  spacing: 2
})`
  && {
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

const GridButtons = styled(Grid).attrs({
  container: true
})`
  && {
    display: flex;
    justify-content: space-around;
  }
`

const CommonButton = styled(Button)`
  && {
    color: ${({ theme }) => theme.palette.common.white};
  }
`

const CancelButton = styled(CommonButton)`
  && {
    background-color: red;
  }
`

const ConfirmButton = styled(CommonButton)`
  && {
    background-color: green;
  }
`

export default UserMaintance
