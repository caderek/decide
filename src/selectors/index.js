import store from '../store'
import {
  LIST_TODOS,
  GET_TODO
} from '../actions/selections'

function mainSelector (action) {
  const state = store.getState()

  switch (action.type) {
    case LIST_TODOS:
      return state.todos
    case GET_TODO:
      return state.todos[action.query.id]
  }
}

export default mainSelector
