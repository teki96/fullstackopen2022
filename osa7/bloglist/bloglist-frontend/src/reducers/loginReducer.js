import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch(logIn(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }
}

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logIn: (_state, action) => {
      return action.payload
    },
    logOut: () => {
      return null
    },
  },
})

export const { logIn, logOut } = loginSlice.actions

export default loginSlice.reducer
