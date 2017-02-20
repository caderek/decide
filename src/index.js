import 'babel-polyfill'
import restoreState from './restoreState'
import store from './store'
import fs from './services/fs'
import socketIO from 'socket.io'
import jsonwebtoken from 'jsonwebtoken'
import verifyUser from './users/verifyUser'

const PORT = 2007
const io = socketIO()
const secret = 'aezakmi'

io.on('connection', (client) => {
  console.log(`Client connected, connection id: ${client.id}`)

  client
    .on('authenticate', ({ user, password }) => {
      const isUserVerified = verifyUser(user, password)

      if (isUserVerified) {
        const jwt = jsonwebtoken.sign({
          user
        }, secret)

        client.emit('authenticated', jwt)

        client
          .use(([event, payload, jwt], next) => {
            try {
              jsonwebtoken.verify(jwt, secret)

              if (payload) {
                payload.user = jsonwebtoken.decode(jwt).user
              }
              next()
            } catch (e) {
              next(new Error('Unauthorized'))
            }
          })
          .on('get-initial-state', () => {
            console.log('received!')
            client.emit('action', {
              type: 'INIT_STATE',
              payload: store.getState()
            })
          })
          .on('action', (action) => {
            store.dispatch(action)
              .then((result) => {
                console.log(result)
                io.emit('action', result)
              })
          })
      } else {
        console.log('Unauthorized')
        client.emit('server-error', 'Unauthorized')
      }
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
