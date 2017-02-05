import uuid from 'uuid/v4'

export const RESTORE_FROM_SNAPSHOT = 'RESTORE_FROM_SNAPSHOT'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

export const restoreFromSnapshot = (state) => ({
  type: RESTORE_FROM_SNAPSHOT,
  payload: {
    state
  }
})

export const addTodo = (title, description) => ({
  type: ADD_TODO,
  payload: {
    id: uuid(),
    title,
    description
  }
})

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: {
    id
  }
})
