import fs from './services/fs'
import readline from 'readline'


function restoreState (store) {
  return new Promise((resolve) => {
    if (fs.existsSync('store')) {
      const rl = readline.createInterface({
        input: fs.createReadStream('store'),
        output: process.stdout,
        terminal: false
      })

      console.time('Restore')
      rl
        .on('line', (line) => {
          const action = JSON.parse(line)

          if (!store.timestamp || action.timestamp > store.timestamp) {
            store.dispatch(action)
          }
        })
        .on('close', () => {
          console.timeEnd('Restore')
          resolve()
        })
    } else {
      resolve()
    }
  })
}

export default restoreState
