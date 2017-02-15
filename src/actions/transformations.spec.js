import {
  restoreFromSnapshot,
  RESTORE_FROM_SNAPSHOT,
  addTodo,
  ADD_TODO,
  removeTodo,
  REMOVE_TODO
} from './transformations'

test('restoreFromSnapshot produces correct action', () => {
  const snapshot = { foo: 'bar' }
  const expected = {
    type: RESTORE_FROM_SNAPSHOT,
    payload: {
      snapshot
    }
  }
  const actual = restoreFromSnapshot(snapshot)

  expect(actual).toEqual(expected)
})

test('addTodo produces correct action', () => {
  const title = 'foo'
  const description = 'bar'
  const expected = {
    type: ADD_TODO,
    payload: {
      id: null,
      title,
      description
    }
  }
  const actual = addTodo(title, description)

  expect(actual).toEqual(expected)
})

test('removeTodo produces correct action', () => {
  const id = 'foo'
  const expected = {
    type: REMOVE_TODO,
    payload: {
      id
    }
  }
  const actual = removeTodo(id)

  expect(actual).toEqual(expected)
})
