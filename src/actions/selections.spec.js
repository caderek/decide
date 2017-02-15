import { getTodo, GET_TODO } from './selections'

test('getTodo produces correct action', () => {
  const id = 'foo'
  const expected = {
    type: GET_TODO,
    query: {
      id
    }
  }
  const actual = getTodo(id)

  expect(actual).toEqual(expected)
})
