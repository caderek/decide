import uuid from 'uuid/v4'

const idGenerator = store => next => action => {
  if (action.payload.id === null) {
    action.payload.id = uuid()
  }

  return next(action)
}

export default idGenerator
