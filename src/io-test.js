import socketIO from 'socket.io'

const io = socketIO(2007)

io.on('connection', (client) => {
  console.log(`Client connected, connection id: ${client.id}`)

  client.on('action', function (data) {
    console.log('Event received:', data)
  })
})
