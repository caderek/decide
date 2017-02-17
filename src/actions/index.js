export const RESTORE_FROM_SNAPSHOT = 'RESTORE_FROM_SNAPSHOT'

export const restoreFromSnapshot = (snapshot) => ({
  type: RESTORE_FROM_SNAPSHOT,
  payload: {
    snapshot
  }
})
