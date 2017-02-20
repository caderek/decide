import users from './users'

function verifyUser (user, password) {
  return users[user] && users[user].password === password
}

export default verifyUser
