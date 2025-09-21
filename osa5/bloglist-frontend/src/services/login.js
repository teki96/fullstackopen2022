import axios from 'axios'
const baseUrl = 'http://localhost:3001/login'

const login = async credentials => {
  const response = await axios.get(baseUrl)
  const users = response.data
  const user = users.find(user => user.username === credentials.username)
  if(user) {
    return user
  } else {
    throw new Error('wrong username or password')
  }
}

export default { login }