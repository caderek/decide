import fs from '../services/fs'
import { RESTORE_FROM_SNAPSHOT } from '../actions'

const eventStore = store => next => action => {
  if (!action.timestamp && action.type !== RESTORE_FROM_SNAPSHOT) {
    const event = Object.assign({}, action, { timestamp: Date.now() })

    fs
      .appendFileAsync('store', `${JSON.stringify(event)}\n`)
  }

  return next(action)
}

export default eventStore
