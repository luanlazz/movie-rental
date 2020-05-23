import React, { useState, useEffect } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Box,
  Grid,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  TableCell,
  IconButton,
  LinearProgress
} from '@material-ui/core'
import {
  ContentTitle,
  H3
} from 'ui'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useUsers } from 'hooks'
import UserMaintance from './user-maintance'

import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: t.node,
  index: t.any.isRequired,
  value: t.any.isRequired
}

function a11yProps (index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  }
}

function Manager () {
  const { getUsers, fetching } = useUsers()
  const [users, setUsers] = useState([])
  const [value, setValue] = useState(0)
  const [userId, setUserId] = useState(0)
  const [openUserModal, setOpenUserModal] = useState(false)

  useEffect(() => {
    const getUsersManager = async () => {
      const docs = await getUsers()

      setUsers(docs)
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid container>
        <ContentTitle title='Painel de Gerenciamento' />

        <UserMaintance
          handleCloseUserModal={handleCloseUserModal}
          openUserModal={openUserModal}
          userId={userId}
        />

        <ManagerContainer>
          <AppBar position='static' color='inherit'>
            <Tabs
              value={value}
              onChange={handleChange}
              variant='standard'
              scrollButtons='on'
              indicatorColor='primary'
              textColor='primary'
              aria-label='scrollable force tabs'
            >
              <Tab label='Usuários' icon={<PersonPinIcon />} {...a11yProps(0)} />
              <Tab label='Filmes' icon={<FavoriteIcon />} {...a11yProps(1)} />
              <Tab label='Categorias' icon={<PersonPinIcon />} {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>

            {fetching && <LinearProgress />}

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
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container>
              <H3>teste</H3>
            </Grid>

          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container>
              <H3>teste</H3>
            </Grid>

          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container>
              <H3>teste</H3>
            </Grid>

          </TabPanel>
        </ManagerContainer>
      </Grid>
    </>
  )
}

Manager.propTypes = {
  theme: t.object
}

const ManagerContainer = styled(Grid).attrs({
  container: true
})`
  && {
    justify-content: space-evenly;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default Manager
