import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers'
import eventStore from './middlewares/eventStore'
import idGenerator from './middlewares/idGenerator'
import actionsRouter from './middlewares/actionsRouter'

const store = createStore(mainReducer, applyMiddleware(idGenerator, eventStore, actionsRouter))

export default store
