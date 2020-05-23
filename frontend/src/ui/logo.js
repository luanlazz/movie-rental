import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

function Logo () {
  return (
    <LogoApp>
      React Rental Movies
    </LogoApp>
  )
}

const LogoApp = styled(Typography)`
  && {
    animation: neon 2s infinite alternate;
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size : 3rem;
    font-family: 'Pacifico', cursive;
    line-height: 5rem;
    text-shadow: -0.2rem -0.2rem 1rem #FF0000;
    text-shadow: 0.2rem 0.2rem 1rem #FF0000;
  }

  @keyframes neon {
    0%, 19%, 21%, 23%, 25%, 34%, 54%, 56%, 74%, 100% {
      text-shadow: 0px 0px 1rem rgba(255,255,255, 0.3);
    }

    22%, 35% {
      text-shadow: none;
    }
  }
`

export default Logo
