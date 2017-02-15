import {
  ADD_TODO,
  REMOVE_TODO,
  RESTORE_FROM_SNAPSHOT
} from '../actions/transformations'
import fs from '../services/fs'
import path from 'path'

const snapshotPath = path.join(__dirname, '../../snapshot')

const initialState = fs.existsSync(snapshotPath)
  ? JSON.parse(fs.readFileSync(snapshotPath))
  : { todos: {} }

function mainReducer (state = initialState, action) {
  switch (action.type) {
    case RESTORE_FROM_SNAPSHOT:
      return action.payload.snapshot
    case ADD_TODO:
      return {
        ...state,
        ...{ todos: { ...state.todos, ...{ [action.payload.id]: action.payload } } }
      }
    // case REMOVE_TODO:
    //   const todos = state.todos
    //   delete todos[action.payload.id]
    //   return {
    //     ...state,
    //     ...{ todos }
    //   }
    default:
      return state
  }
}

export default mainReducer
