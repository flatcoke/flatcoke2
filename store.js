import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'reducers'

const bindMiddleware = middleware =>
  composeWithDevTools(applyMiddleware(...middleware))

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([thunkMiddleware])
  )
  return store
}

export default configureStore
