import React, { useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Avatar as MaterialAvatar,
  Grid,
  Typography,
  IconButton as MaterialIconButton
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import UserPhotoImg from 'images/user-photo.jpg'
import { HOME, SUBSCRIPTIONS, INVENTARY, MANAGER, PERFIL } from 'routes'
import { useAuth } from 'hooks'

function AsideMenu ({ open }) {
  const { userInfo, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState(null)

  function handleCurrentPage (value) {
    setCurrentPage(value)
  }

  return (
    <SideMenuBar>

      <Spacer />

      <GridContainer>

        <AccountContainer>
          <Avatar src={UserPhotoImg} alt='User profile' />

          <UserInfoAndActions>
            <UserName>
              <Typography align='left' variant='h5'>
                Olá, {userInfo.name}
              </Typography>
            </UserName>

            <Grid item>
              {[
                {
                  value: 'account',
                  component: Link,
                  to: PERFIL,
                  children: <AccountCircle fontSize='small' />
                },
                {
                  value: 'manager',
                  component: Link,
                  to: MANAGER,
                  children: <SettingsIcon fontSize='small' />
                },
                {
                  value: 'exit',
                  onClick: logout,
                  children: <ExitToAppIcon fontSize='small' />
                }
              ].map((button) => (
                <IconButton
                  {...button}
                  key={button.value}
                  selected={(currentPage === button.value).toString()}
                  onClick={() => {
                    handleCurrentPage(button.value)
                  }}
                >
                  {button.children}
                </IconButton>
              ))}
            </Grid>
          </UserInfoAndActions>
        </AccountContainer>

        <MenuLinksContainer>
          {[
            {
              value: 'shop',
              to: HOME,
              children: 'Loja'
            },
            {
              value: 'inventary',
              to: INVENTARY,
              children: 'Meus filmes'
            },
            {
              value: 'subscriptions',
              to: SUBSCRIPTIONS,
              children: 'Assinaturas'
            }
          ].map((component) => (
            <LinkMenu
              {...component}
              key={component.value}
              selected={(currentPage === component.value).toString()}
              onClick={() => {
                handleCurrentPage(component.value)
              }}
            >
              {component.children}
            </LinkMenu>
          ))}
        </MenuLinksContainer>

      </GridContainer>

    </SideMenuBar>
  )
}

AsideMenu.propTypes = {
  open: t.bool.isRequired
}

const SideMenuBar = styled.aside`
  && {
    background-color: ${({ theme }) => theme.palette.primary.light};
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 300px;
    min-height: 100%;
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
    color: ${({ theme }) => theme.palette.common.white};
    display: inline-flex;
    flex-wrap: nowrap;
  }
`

const Avatar = styled(MaterialAvatar)`
  && {
    height: 80px;
    width: 80px;
    margin-left: 1rem;
  }
`

const UserInfoAndActions = styled(Grid).attrs({
  container: true
})`
  && {
    display: block;
  }
`

const UserName = styled(Grid).attrs({
  item: true
})`
  && {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`

const IconButton = styled(MaterialIconButton)`
  && {
    color: ${({ selected, theme }) => (selected === 'true'
      ? theme.palette.secondary.light
      : theme.palette.common.white
    )};

    :hover {
      color: ${({ theme }) => theme.palette.secondary.light};
    }
  }
`

const MenuLinksContainer = styled(Grid).attrs({
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
    <LinkItem {...props}>
      <Grid item>
        <Typography variant='h5'>
          {children}
        </Typography>
      </Grid>
    </LinkItem>
  )
}

LinkMenu.propTypes = {
  children: t.node
}

const LinkItem = styled(Link)`
  && {
    color: ${({ selected, theme }) => (selected === 'true'
      ? theme.palette.secondary.light
      : theme.palette.common.white
    )};
    margin: auto;
    text-align: center;
    text-decoration: none;
    width: 100%;

    :hover {
      color: ${({ theme }) => theme.palette.secondary.light};
    }
  }
`

export default AsideMenu
