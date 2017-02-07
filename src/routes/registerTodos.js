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
      ctx.body = store.getState().todos.length
    })
    .get('/todos/:id', async function (ctx) {
      ctx.body = store.getState().todos.find(todo => todo.id === ctx.params.id)
    })
    .post('/', koaBody, async function (ctx) {
      const result = store.dispatch(ctx.request.body)

      ctx.body = result.payload === undefined ? result : result.payload
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
