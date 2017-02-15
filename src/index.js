import 'babel-polyfill'
import Koa from 'koa'
import restoreState from './restoreState'
import store from './store'
import createRouter from 'koa-router'
import createKoaBody from 'koa-body'
import fs from './services/fs'

const app = new Koa()
const koaBody = createKoaBody()

const router = createRouter()
  .post('/', koaBody, async function (ctx) {
    const result = await store.dispatch(ctx.request.body)
    ctx.body = result.payload || result
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

app
  .use(router.routes())
  .use(router.allowedMethods())

const PORT = 2001

restoreState(store)
  .then(() => {
    app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
  })

