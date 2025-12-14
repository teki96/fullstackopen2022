import axios from "axios"
const baseUrl = "http://localhost:3001/api/login"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  const user = response.data
  if (user) {
    return user
  } else {
    throw new Error("wrong username or password")
  }
}

export default { login }
