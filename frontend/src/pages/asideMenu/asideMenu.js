import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Link as MaterialLink } from 'react-router-dom'
import {
  Grid,
  Typography
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CloudIcon from '@material-ui/icons/Cloud'
import UserPhotoImg from 'images/user-photo.jpg'
import { HOME, SUBSCRIPTIONS } from 'routes'

function AsideMenu () {
  return (
    <SideMenuBar>

      <Spacer />

      <GridContainer>

        <AccountContainer>
          <UserPhoto>
            <img src={UserPhotoImg} alt='User profile' />
          </UserPhoto>

          <UserActions>
            <Typography>Olá, Maria</Typography>
            <AccountCircle />
            <CloudIcon />
            <ExitToAppIcon />
          </UserActions>
        </AccountContainer>

        <ActionsContainer>

          <LinkMenu to={HOME}>
            Catalogo
          </LinkMenu>

          <LinkMenu to={SUBSCRIPTIONS}>
            Assinaturas
          </LinkMenu>

        </ActionsContainer>

      </GridContainer>
    </SideMenuBar>
  )
}

const SideMenuBar = styled.aside`
&& {
  display: flex;
  flex-direction: column;
  width: 220px;
  background-color:  ${({ theme }) => theme.palette.primary.light};
}
`

const Spacer = styled.div`
  && {
    display: block;
    height: 2rem;
  }
`

const GridContainer = styled(Grid).attrs({
  container: true,
  spacing: 2
})`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  width: 100%;
`

const AccountContainer = styled(Grid).attrs({
  container: true
})`
  && {
    display: flex;
  }
`

const UserPhoto = styled(Grid).attrs({
  item: true
})`
  && {
    align-itens: center;
    display: flex;
    flex-direction: column;
    height: 5rem;
    margin-left: 1rem;
    overflow: hidden;
    width: 5rem;
  }

  img {
    border-radius: 50%;
    max-height: 100%;
  }
`

const UserActions = styled(Grid).attrs({
  item: true
})`
  && {
    display: block;
    margin: auto auto auto 5px;
  }
`

const ActionsContainer = styled(Grid).attrs({
  container: true
})`
  && {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
`

function LinkMenu ({ children, ...props }) {
  return (
    <GridItemMenu>
      <Link {...props}>
        <Typography variant='h5'>
          {children}
        </Typography>
      </Link>
    </GridItemMenu>
  )
}

LinkMenu.propTypes = {
  children: t.node
}

const Link = styled(MaterialLink)`
  && {
    color: ${({ theme }) => theme.palette.common.white};
    justify-content: center;
    text-align: center;
    text-decoration: none;
  }
`

const GridItemMenu = styled(Grid).attrs({
  item: true
})`
  && {
    height: 3rem;
    width: 100%;

    :hover {
      background-color: ${({ theme }) => theme.palette.secondary.light};
      color: ${({ theme }) => theme.palette.common.black};
    }
  }
`

export default AsideMenu
