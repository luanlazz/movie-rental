import React, { useState, useEffect } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
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
  HeaderContent
} from 'ui'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useUsers } from 'hooks'

import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import HelpIcon from '@material-ui/icons/Help'

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
          <Typography>{children}</Typography>
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
  const { users, getUsers, fetchingUsers } = useUsers()
  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log('getting users')
    getUsers()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function handleUpdate (userId) {
    console.log('change user', userId)
  }

  function handleDelete (userId) {
    console.log('delete user', userId)
  }

  return (
    <Content>
      <HeaderContent title='Painel de Gerenciamento' />

      <ManagerContainer>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='on'
            indicatorColor='primary'
            textColor='primary'
            aria-label='scrollable force tabs example'
          >
            <Tab label='Usuários' icon={<PhoneIcon />} {...a11yProps(0)} />
            <Tab label='Item Two' icon={<FavoriteIcon />} {...a11yProps(1)} />
            <Tab label='Item Three' icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label='Item Four' icon={<HelpIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>

          {fetchingUsers && <LinearProgress />}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map(user => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>l{user.email}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => { handleUpdate(user.userId) }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => { handleDelete(user.userId) }}
                      >
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
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </ManagerContainer>
    </Content>
  )
}

const Content = styled(Grid).attrs({
  container: true
})`
`

const ManagerContainer = styled(Grid).attrs({
  container: true
})`
  && {
    justify-content: space-evenly;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default Manager
