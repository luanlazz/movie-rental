import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import {
  Paper,
  Grid,
  TextField as MaterialTextField,
  Typography,
  Button
} from '@material-ui/core'

function Login () {
  return (
    <Container>
      <Grid container justify='center'>
        <Grid item xs={12} md={6}>
          <Paper elevation={2}>
            <GridContainer>

              <Grid item xs={12}>
                <Typography variant='h2' align='center'>
                  Login
                </Typography>
              </Grid>

              <TextField label='E-mail' xs={12} />
              <TextField label='Senha' type='password' xs={12} />

              <Grid item xs={8}>
                <Button
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Entrar
                </Button>
              </Grid>

            </GridContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(4)}px;
`

const GridContainer = styled(Grid).attrs({
  container: true,
  justify: 'center',
  align: 'center',
  spacing: 2
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`

function TextField ({ xs, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        fullWidth
        variant='outlined'
        {...props}
      />
    </Grid>
  )
}

TextField.propTypes = {
  xs: t.number
}

export default Login
