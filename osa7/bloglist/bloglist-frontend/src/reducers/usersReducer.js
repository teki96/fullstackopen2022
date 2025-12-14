import { createSlice } from "@reduxjs/toolkit"
import usersService from "../services/users"

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (_state, action) => {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
