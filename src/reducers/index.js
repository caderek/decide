import { combineReducers } from 'redux'
import { reducers } from 'decide-shared'

const decideApp = combineReducers({
  ...reducers
})

export default decideApp
