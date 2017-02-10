import fs from '../services/fs'
import { RESTORE_FROM_SNAPSHOT } from '../actions/transformations'

const eventStore = store => next => action => {
  const event = action.timestamp
    ? action
    : Object.assign({}, action, { timestamp: Date.now() })

  const addToStoreIfNotAlready = action.timestamp || action.type === RESTORE_FROM_SNAPSHOT
    ? Promise.resolve()
    : fs.appendFileAsync('store', `${JSON.stringify(event)}\n`)

  return addToStoreIfNotAlready
    .then(() => next(action))
}

export default eventStore
