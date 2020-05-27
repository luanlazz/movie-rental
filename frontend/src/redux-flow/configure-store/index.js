import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export const history = createBrowserHistory()

export default ({ initialState } = {}) => {
  const enhancer = compose(applyMiddleware(thunk), applyMiddleware(routerMiddleware(history)), logger())
  const store = createStore(rootReducer(history), initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

const logger = () => window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (x) => x
