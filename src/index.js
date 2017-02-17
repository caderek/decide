import 'babel-polyfill'
import restoreState from './restoreState'
import store from './store'
import fs from './services/fs'
import socketIO from 'socket.io'

const PORT = 2007
const io = socketIO()

io.on('connection', (client) => {
  console.log(`Client connected, connection id: ${client.id}`)

  // client.emit('action', /* action sending initial state for client */)

  client
    .on('action', (action) => {
      store.dispatch(action)
        .then((result) => {
          console.log(result)
          client.emit('action', result)
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
