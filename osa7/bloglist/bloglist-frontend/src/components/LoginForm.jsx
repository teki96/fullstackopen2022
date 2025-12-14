import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/loginReducer"

const LoginForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  })

  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUserCredentials({ ...userCredentials, username: event.target.value })
  }

  const handlePasswordChange = (event) => {
    setUserCredentials({ ...userCredentials, password: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(userCredentials))
    setUserCredentials({ username: "", password: "" })
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            type="text"
            value={userCredentials.username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            value={userCredentials.password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
