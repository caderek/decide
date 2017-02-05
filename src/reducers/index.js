/* flow */
import {
  ADD_TODO,
  REMOVE_TODO,
  RESTORE_FROM_SNAPSHOT
} from '../actions'
import fs from '../services/fs'
import path from 'path'

const snapshotPath = path.join(__dirname, '../../snapshot')

const initialState = fs.existsSync(snapshotPath)
  ? JSON.parse(fs.readFileSync(snapshotPath))
  : {
    todos: []
  }

function main (state = initialState, action) {
  switch (action.type) {
    case RESTORE_FROM_SNAPSHOT:
      return action.payload.state
    case ADD_TODO:
      return {
        ...state,
        ...{ todos: [...state.todos, action.payload] }
      }
    case REMOVE_TODO:
      return {
        ...state,
        ...{ todos: state.todos.filter(todo => todo.id !== action.payload.id) }
      }
    default:
      return state
  }
}

export default main
