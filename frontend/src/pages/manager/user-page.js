import React, { useState, useEffect } from 'react'
import {
  IconButton,
  LinearProgress,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useUsers } from 'hooks'
import UserMaintance from './user-maintance'

function UserPage () {
  const { getUsers, fetching } = useUsers()
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(0)
  const [openUserModal, setOpenUserModal] = useState(false)

  useEffect(() => {
    const getUsersManager = async () => {
      const res = await getUsers()

      setUsers(res)
    }

    getUsersManager()
  }, [openUserModal])

  async function handleUpdate (userId) {
    setUserId(userId)
    handleOpenUserModal()
  }

  function handleDelete (userId) {
    console.log('delete user', userId)
  }

  const handleOpenUserModal = () => {
    setOpenUserModal(true)
  }

  const handleCloseUserModal = () => {
    setOpenUserModal(false)
  }

  return (
    <>
      {fetching && <LinearProgress />}

      <UserMaintance
        handleCloseUserModal={handleCloseUserModal}
        openUserModal={openUserModal}
        userId={userId}
      />

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

export default UserPage
