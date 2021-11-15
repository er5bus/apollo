/**
 * Create the store with dynamic reducers
 */

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer,  } from 'redux-persist'

// reducers
import rootReducer from './reducers'

// middleware
import apiMiddleware from './middleware/api'


let composeEnhancers = compose

// If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
  /* eslint-disable no-underscore-dangle */
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  }
}

const middlewares = [thunkMiddleware, apiMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = composeEnhancers(...enhancers)

const persistConfig = {
  key: 'persistedStore',
  storage,
  debug: true
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store
export const store = createStore(persistedReducer, composedEnhancers)
export const persistor = persistStore(store)

// Make reducers hot reloadable, see http://mxs.is/googmo
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // This fetch the new state of the above reducers.
  const nextRootReducer = require('./reducers').default
  store.replaceReducer(
    persistReducer(persistConfig, nextRootReducer)
  )
}

