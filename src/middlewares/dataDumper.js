const dataDumper = store => next => action => {
  if (action.payload === undefined) {
    return store.getState().todos
  } else {
    return next(action)
  }
}

export default dataDumper
