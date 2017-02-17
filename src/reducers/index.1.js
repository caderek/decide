import {
  ADD_ISSUE,
  REMOVE_ISSUE,
  RESTORE_FROM_SNAPSHOT
} from '../actions/transformations'
import fs from '../services/fs'
import path from 'path'

const snapshotPath = path.join(__dirname, '../../snapshot')

const initialState = fs.existsSync(snapshotPath)
  ? JSON.parse(fs.readFileSync(snapshotPath))
  : { issues: {} }

function mainReducer (state = initialState, action) {
  switch (action.type) {
    case RESTORE_FROM_SNAPSHOT:
      return action.payload.snapshot
    case ADD_ISSUE:
      return {
        ...state,
        ...{ issues: { ...state.issues, ...{ [action.payload.id]: action.payload } } }
      }
    // case REMOVE_ISSUE:
    //   const issues = state.issues
    //   delete issues[action.payload.id]
    //   return {
    //     ...state,
    //     ...{ issues }
    //   }
    default:
      return state
  }
}

export default mainReducer
