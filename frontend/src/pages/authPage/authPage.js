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
import backgroundImage from 'images/movies.jpg'

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

      <BackgroundComponent src={backgroundImage} alt='background image' />

      <Grid container justify='center' align='center'>
        <Grid item xs={12}>
          <Logo />
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={2}>

            <AppBar position='static'>
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
  && {
    background-color: transparent;
    flex: 1;
    margin: 0;
  }
`

const BackgroundComponent = styled.img`
  position: absolute;
  z-index: -1;
`

export default AuthPage
