import styled from 'styled-components'
import { ReactComponent as HeaderLogo } from 'images/rental-movie-logo.svg'

const Logo = styled(HeaderLogo)`
  height: 60px;
  width: 250px;

  & path {
    fill: ${({ theme }) => theme.palette.common.white};
  }
`

export default Logo
