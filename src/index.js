import 'babel-polyfill'
import restoreState from './restoreState'
import store from './store'
import fs from './services/fs'
import socketIO from 'socket.io'
import jsonwebtoken from 'jsonwebtoken'
import verifyUser from './users/verifyUser'
import authentication from './socket-middlewares/authentication'
import config from './config'

const PORT = 2007
const io = socketIO()

io.on('connection', (client) => {
  console.log(`Client connected, connection id: ${client.id}`)

  client
    .use(authentication)
    .on('authenticate', ({ user, password }) => {
      const isUserVerified = verifyUser(user, password)

      if (isUserVerified) {
        const jwt = jsonwebtoken.sign({
          user
        }, config.secret)

        client.emit('authenticated', jwt)
      } else {
        client.emit('server-error', 'Unauthorized')
      }
    })
    .on('get-initial-state', () => {
      client.emit('action', {
        type: 'INIT_STATE',
        payload: store.getState()
      })
    })
    .on('action', (action) => {
      store.dispatch(action)
        .then((result) => {
          io.emit('action', result)
        })
    })
    .on('snapshot', function () {
      console.time('Snapshot')
      const snapshot = JSON.stringify({
        ...store.getState(),
        ...{ timestamp: Date.now() }
      })

      fs
        .writeFileAsync('snapshot', snapshot)
        .then(() => console.timeEnd('Snapshot'))
    })
})

restoreState(store)
  .then(() => {
    io.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
  })
