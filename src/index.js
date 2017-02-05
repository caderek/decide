/* @flow */
import 'babel-polyfill'
import Koa from 'koa'
import { createStore, applyMiddleware } from 'redux'
import main from './reducers'
import eventStore from './middlewares/eventStore'
import restoreState from './restoreState'
import registerTodos from './routes/registerTodos'

const app = new Koa()
const store = createStore(main, applyMiddleware(eventStore))
const todos = registerTodos(store)

app
  .use(todos.routes())
  .use(todos.allowedMethods())

restoreState(store)
  .then(() => {
    app.listen(2001, () => console.log('App listening on http://localhost:2001'))
  })

