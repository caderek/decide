import fs from './services/fs'
import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers'
import eventStore from './middlewares/eventStore'
import idGenerator from './middlewares/idGenerator'
import { composeWithDevTools } from 'remote-redux-devtools'

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
const initialState = getInitialState()

const store = createStore(mainReducer, initialState, composeEnhancers(
  applyMiddleware(idGenerator, eventStore)
))

export function getInitialState () {
  return fs.existsSync('snapshot')
    ? JSON.parse(fs.readFileSync('snapshot'))
    : {}
}

export default store
