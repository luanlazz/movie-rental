import React from 'react'
import PropTypes from 'prop-types'
import { AppContainer } from 'react-hot-loader'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router'
import configureStore, { history } from 'redux-flow/configure-store'
import { MovieProvider, UsersProvider } from 'contexts'

const store = configureStore()

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#c20303',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: '#fff'
    },
    secondary: {
      // light: will be calculated from palette.secondary.main,
      main: '#303030'
      // dark: will be calculated from palette.secondary.main,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    danger: {
      main: '#ff4444',
      dark: '#cc0000'
    },
    button: {
      primary: {
        main: '#4285F4',
        dark: '#0d47a1'
      },
      secondary: {
        main: '#aa66cc',
        dark: '#9933CC'
      },
      default: {
        main: '#2BBBAD',
        dark: '#00695c'
      }
    },
    info: {
      main: '#33b5e5',
      dark: '#0099cc'
    },
    success: {
      main: '#00C851',
      dark: '#007E33'
    },
    warning: {
      main: '#ffbb33',
      dark: '#FF8800'
    },
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
})

console.log('theme: ', theme)

const Root = ({ App }) => {
  return (
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <MovieProvider>
            <UsersProvider>

              <CssBaseline />
              <GlobalStyle />

              <Provider store={store}>
                <ConnectedRouter history={history}>
                  <Route component={App} />
                </ConnectedRouter>
              </Provider>

            </UsersProvider>
          </MovieProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </AppContainer>
  )
}

Root.propTypes = {
  App: PropTypes.func
}

const GlobalStyle = createGlobalStyle`
  #root {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
`

export default Root
