import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  AppBar,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core'
import {
  Logo
} from 'ui'
import SignIn from './signIn'
import ForgotPassword from './forgotPassword'
import SignUp from './signUp'

function AuthPage () {
  const [value, setValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel ({ children, value, index, ...other }) {
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
    children: t.node.isRequired,
    value: t.number.isRequired,
    index: t.number.isRequired
  }

  function a11yProps (index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
    }
  }

  return (
    <Container>
      <Grid container justify='center' align='center'>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={2}>

            <AppBar position='static' fullWidth>
              <Tabs value={value} onChange={handleChangeTab} variant='fullWidth'>
                <Tab label='Entrar' {...a11yProps(0)} />
                <Tab label='Criar nova conta' {...a11yProps(1)} />
                <Tab label='Esqueceu a senha?' {...a11yProps(2)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <SignIn />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <SignUp />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <ForgotPassword />
            </TabPanel>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  background: rgb(2,0,36);
  background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(101,0,0,1) 68%, rgba(139,7,7,1) 83%, rgba(194,3,3,1) 100%);
  flex: 1;
  margin: 0;
  padding: ${({ theme }) => theme.spacing(3)}px;
`

export default AuthPage
