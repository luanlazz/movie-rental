import React, { useState } from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Avatar as MaterialAvatar,
  Drawer,
  Grid,
  Typography,
  IconButton as MaterialIconButton
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import UserPhotoImg from 'images/user-photo.jpg'
import {
  logoutUser
} from 'redux-flow/reducers/auth-user/action-creators'
import { HOME, SUBSCRIPTIONS, INVENTARY, MANAGER, PERFIL } from 'routes'

function SideMenu ({ authUser, logout, open, handleDrawerOpen }) {
  const [currentPage, setCurrentPage] = useState('shop')

  function handleCurrentPage (value) {
    setCurrentPage(value)
  }

  return (
    <Drawer
      open={open}
      anchor='left'
      onClose={handleDrawerOpen}
    >
      <Content>
        <Spacer />

        <ToggleButton>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </ToggleButton>

        <Spacer />

        <AccountContainer>
          <Avatar src={UserPhotoImg} alt='User profile' />

          <UserInfoAndActions>
            <UserName>
              <Typography align='left' variant='h5'>
                Olá, {authUser.user.firstName}
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
                  selected={(currentPage === button.value)}
                  onClick={() => {
                    if (button.onClick) {
                      button.onClick()
                    } else {
                      handleCurrentPage(button.value)
                    }
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
              selected={(currentPage === component.value)}
              onClick={() => {
                handleCurrentPage(component.value)
              }}
            >
              {component.children}
            </LinkMenu>
          ))}
        </MenuLinksContainer>
      </Content>
    </Drawer>
  )
}

SideMenu.propTypes = {
  authUser: t.object.isRequired,
  logout: t.func.isRequired,
  open: t.bool.isRequired,
  handleDrawerOpen: t.func.isRequired
}

const ToggleButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Content = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.light};
  min-height: 100%;
`

const Spacer = styled.div`
  && {
    display: block;
    height: 1rem;
  }
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
    color: ${({ selected, theme }) => (selected
      ? theme.palette.secondary.light
      : theme.palette.common.white
    )};
    transform: ${({ selected }) => (selected ? 'scale(1.2)' : 'scale(1.0)')};
    transition: 500ms;

    :hover {
      color: ${({ theme }) => theme.palette.secondary.light};
      transform: scale(1.2);
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
    color: ${({ selected, theme }) => (selected
      ? theme.palette.secondary.light
      : theme.palette.common.white
    )};
    margin: auto;
    text-align: center;
    text-decoration: none;
    transition: 500ms;
    transform: ${({ selected }) => (selected ? 'scale(1.1)' : 'scale(1.0)')};
    width: 100%;

    :hover {
      color: ${({ theme }) => theme.palette.secondary.light};
      transform: scale(1.1);
    }
  }
`

const mapStateToProps = state => ({
  authUser: state.authUser
})

const mapDispatchToProps = (dispatch) => ({
  logout: async () => {
    await dispatch(logoutUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
