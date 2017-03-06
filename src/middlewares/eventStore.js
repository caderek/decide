import fs from '../services/fs'
import { RESTORE_FROM_SNAPSHOT } from '../actions'

const eventsStream = fs.createWriteStream('store', { flags: 'a' })

const addToLog = (event) => {
  return new Promise((resolve) => {
    eventsStream.write(event, resolve)
  })
}

eventsStream.on('error', (error) => {
  console.log(error)
})

eventsStream.on('drain', () => {
  console.log('drained!')
})

const eventStore = store => next => action => {
  const event = action.timestamp
    ? action
    : Object.assign({}, action, { timestamp: Date.now() })

  const addToStoreIfNotAlready = action.timestamp || action.type === RESTORE_FROM_SNAPSHOT
    ? Promise.resolve()
    : addToLog(`${JSON.stringify(event)}\n`)

  return addToStoreIfNotAlready
    .then(() => next(action))
}

export default eventStore
