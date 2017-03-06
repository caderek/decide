import config from '../config'
import jsonwebtoken from 'jsonwebtoken'

const authentication = ([event, payload, jwt], next) => {
  if (event !== 'authenticate' && event !== 'snapshot') {
    try {
      jsonwebtoken.verify(jwt, config.secret)

      if (payload) {
        payload.user = jsonwebtoken.decode(jwt).user
      }
      next()
    } catch (e) {
      next(new Error('Unauthorized'))
    }
  } else {
    next()
  }
}

export default authentication
