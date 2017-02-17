import {
  restoreFromSnapshot,
  RESTORE_FROM_SNAPSHOT
} from './'

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
