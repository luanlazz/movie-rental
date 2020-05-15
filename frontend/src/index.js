import React from 'react'
import { render } from 'react-dom'
import Root from './root'
import App from './app'
import * as serviceWorker from './serviceWorker'

import ErrorBoundary from './error'

const renderApp = (NextApp) => {
  render(
    <ErrorBoundary>
      {(hasError) => (
        <Root hasError={hasError} App={NextApp} />
      )}
    </ErrorBoundary>,
    document.getElementById('root')
  )
}

renderApp(App)

serviceWorker.unregister()

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}
