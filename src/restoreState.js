import fs from './services/fs'
import readline from 'readline'
import { restoreFromSnapshot } from './actions'

function restoreState (store) {
  return new Promise((resolve) => {
    let snapshot = { timestamp: 0 }

    if (fs.existsSync('snapshot')) {
      snapshot = JSON.parse(fs.readFileSync('snapshot'))
      store.dispatch(restoreFromSnapshot(snapshot))
    }


    const rl = readline.createInterface({
      input: fs.createReadStream('store'),
      output: process.stdout,
      terminal: false
    })

    console.time('Restore')
    rl
      .on('line', (line) => {
        const action = JSON.parse(line)

        if (action.timestamp > snapshot.timestamp) {
          store.dispatch(action)
        }
      })
      .on('close', () => {
        console.timeEnd('Restore')
        resolve()
      })
  })
}

export default restoreState
