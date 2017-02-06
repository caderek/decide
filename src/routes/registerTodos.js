import createRouter from 'koa-router'
import createKoaBody from 'koa-body'
import {
  addTodo,
  removeTodo
} from '../actions'
import fs from '../services/fs'

const koaBody = createKoaBody()

function registerTodos (store) {
  return createRouter()
    .get('/todos', async function (ctx) {
      ctx.body = store.getState().todos
    })
    .get('/todos/:id', async function (ctx) {
      ctx.body = store.getState().todos.find(todo => todo.id === ctx.params.id)
    })
    .post('/todos', koaBody, async function (ctx) {
      const action = addTodo(ctx.request.body.title, ctx.request.body.description)

      store.dispatch(action)

      ctx.status = 201
      ctx.body = action.payload
    })
    .delete('/todos/:id', async function (ctx) {
      store.dispatch(removeTodo(ctx.params.id))
      ctx.status = 200
    })
    .get('/snapshot', async function (ctx) {
      console.time('Snapshot')
      const snapshot = JSON.stringify({
        ...store.getState(),
        ...{ timestamp: Date.now() }
      })

      ctx.status = await fs
        .writeFileAsync('snapshot', snapshot)
        .then(() => 200)
      console.timeEnd('Snapshot')
    })
}

export default registerTodos
