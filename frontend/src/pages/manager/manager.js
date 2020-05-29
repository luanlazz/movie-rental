import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as MaterialLink, Route, Switch } from 'react-router-dom'
import {
  Box,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core'
import {
  ContentTitle
} from 'ui'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import MovieIcon from '@material-ui/icons/Movie'
import CategoryIcon from '@material-ui/icons/Category'
import { MANAGER_USERS, MANAGER_FILMS, MANAGER_CATEGORIES } from 'routes'

const UserPage = lazy(() => import('./users/user-page'))

function Manager () {
  return (
    <>
      <Grid container>
        <ContentTitle title='Painel de Gerenciamento' />

        <ManagerContainer>

          <GridButtons>

            <ButtonMaintance
              to={MANAGER_USERS}
              description='Usuários'
            >
              <PersonPinIcon fontSize='large' />
            </ButtonMaintance>

            <ButtonMaintance
              to={MANAGER_FILMS}
              description='Filmes'
            >
              <MovieIcon fontSize='large' />
            </ButtonMaintance>

            <ButtonMaintance
              to={MANAGER_CATEGORIES}
              description='Categorias'
            >
              <CategoryIcon fontSize='large' />
            </ButtonMaintance>

          </GridButtons>

          <Suspense fallback={<LinearProgress />}>
            <Switch>
              <Route path={MANAGER_USERS} component={UserPage} />
            </Switch>
          </Suspense>

        </ManagerContainer>
      </Grid>
    </>
  )
}

const ManagerContainer = styled(Grid).attrs({
  container: true
})`
  && {
    max-width: 80vw;
    margin: auto;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

const GridButtons = styled(Grid).attrs({
  container: true
})`
  && {
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

function ButtonMaintance ({ children, description, ...props }) {
  return (
    <Grid item>
      <Link {...props}>
        <BoxPainel>
          {children}
          <Typography>{description}</Typography>
        </BoxPainel>
      </Link>
    </Grid>
  )
}

ButtonMaintance.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired
}

const Link = styled(MaterialLink)`
  && {
    text-decoration: none;
  }
`

const BoxPainel = styled(Box)`
  && {
    align-items: center;
    background-color: ${({ theme }) => theme.palette.grey[500]};
    border-radius: 10%;
    color: ${({ theme }) => theme.palette.common.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 5rem;
    transition: 500ms;
    width: 5rem;
  }

  :hover {
    transform: scale(1.1);
  }
`

export default Manager
