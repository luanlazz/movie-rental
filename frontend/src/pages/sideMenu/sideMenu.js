import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
                  component: NavLink,
                  to: PERFIL,
                  children: <AccountCircle fontSize='small' />
                },
                {
                  value: 'manager',
                  component: NavLink,
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
                  onClick={() => button.onClick && button.onClick()}
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
  authUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
}

const ToggleButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Content = styled.div`
  background: ${({ theme }) => theme.palette.grey[800]};
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
    <LinkItem
      {...props}
      isActive={(match, location) => {
        if (!match) {
          return false
        }
        return match.isExact && match.path && location.pathname
      }}
    >
      <Grid item>
        <Typography variant='h5'>
          {children}
        </Typography>
      </Grid>
    </LinkItem>
  )
}

LinkMenu.propTypes = {
  children: PropTypes.node
}

const activeClassName = 'nav-item-active'

const LinkItem = styled(NavLink).attrs({ activeClassName })`
  && {
    color: ${({ theme }) => theme.palette.common.white};
    margin: auto;
    text-align: center;
    text-decoration: none;
    transition: 500ms;
    width: 100%;

    :hover {
      color: ${({ theme }) => theme.palette.primary.light};
      transform: scale(1.1);
    }
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.palette.primary.light};
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
