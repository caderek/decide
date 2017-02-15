import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers'
import eventStore from './middlewares/eventStore'
import idGenerator from './middlewares/idGenerator'
import actionsRouter from './middlewares/actionsRouter'
import { composeWithDevTools } from 'remote-redux-devtools'
import remotedev from 'remotedev-server'
remotedev({ hostname: 'localhost', port: 8000 })

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })

const store = createStore(mainReducer, composeEnhancers(
  applyMiddleware(idGenerator, eventStore, actionsRouter)
))

export default store
