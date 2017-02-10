import mainSelector from '../selectors'

const actionsRouter = store => next => action => {
  if (action.payload === undefined) {
    return mainSelector(action)
  } else {
    return next(action)
  }
}

export default actionsRouter
