import fsRaw from 'fs'
import Promise from 'bluebird'

const fs = Promise.promisifyAll(fsRaw)

export default fs
