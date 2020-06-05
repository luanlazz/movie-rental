import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  IconButton,
  LinearProgress,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Grid
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { useUsers } from 'hooks'
import { openSnackbar } from 'redux-flow/reducers/snackbars/action-creators'
import { ModalConfirm, ButtonHandle } from 'components'
import UserMaintance from './user-maintance'

function UserPage ({ openSnackbarUser }) {
  const { getUsers, saveUser, deleteUser, fetching } = useUsers()
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(0)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [openUserConfirm, setOpenUserConfirm] = useState(false)

  useEffect(() => {
    const getUsersManager = async () => {
      const res = await getUsers()

      if (res) setUsers(res)
    }

    getUsersManager()
  }, [openUserModal, openUserConfirm])

  async function handleUpdate (userId) {
    setUserId(userId)
    handleOpenUserModal()
  }

  async function handleNewUser () {
    handleOpenUserModal()
  }

  const handleSaveUser = async (values) => {
    const res = await saveUser(values)

    if (res) {
      openSnackbarUser('Alterações salvas com sucesso!', 'success')
      handleCloseUserModal()
    }
  }

  const handleDelete = async (userId) => {
    setUserId(userId)
    handleOpenUserConfirm()
  }

  const handleConfirmDelete = async () => {
    const res = await deleteUser(userId)

    if (res) {
      openSnackbarUser('Usuário removido com sucesso!', 'success')
      handleCloseUserConfirm()
    }
  }

  const handleOpenUserModal = () => {
    setOpenUserModal(true)
  }

  const handleCloseUserModal = () => {
    setOpenUserModal(false)
  }

  const handleOpenUserConfirm = () => {
    setOpenUserConfirm(true)
  }

  const handleCloseUserConfirm = () => {
    setOpenUserConfirm(false)
  }

  return (
    <>
      {fetching && <LinearProgress />}

      <UserMaintance
        handleCloseUserModal={handleCloseUserModal}
        openUserModal={openUserModal}
        userId={userId}
        handleSaveUser={handleSaveUser}
      />

      <ModalConfirm
        openUserConfirm={openUserConfirm}
        handleCloseUserConfirm={handleCloseUserConfirm}
        handleConfirmDelete={handleConfirmDelete}
        fetching={fetching}
      />

      <GridPageActions>
        <Grid item>
          <ButtonHandle
            variant='contained'
            className='success'
            onClick={handleNewUser}
          >
            <AddIcon />Adicionar usuário
          </ButtonHandle>
        </Grid>
      </GridPageActions>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { handleUpdate(user.userId) }}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => { handleDelete(user.userId) }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

UserPage.propTypes = {
  openSnackbarUser: PropTypes.func.isRequired
}

const GridPageActions = styled(Grid).attrs({
  container: true
})`
  && {
    padding-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`

const mapDispatchToProps = (dispatch) => ({
  openSnackbarUser: (message, severity) => {
    dispatch(openSnackbar(message, severity))
  }
})

export default connect(null, mapDispatchToProps)(UserPage)
