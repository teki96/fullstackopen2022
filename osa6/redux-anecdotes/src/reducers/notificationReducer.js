import { createSlice } from '@reduxjs/toolkit'


export const showNotification = (content, duration) => {
    return dispatch => {
        dispatch(notificationSlice.actions.setNotification(content))
        setTimeout(() => {
            dispatch(notificationSlice.actions.clearNotification())
        }, duration * 1000)
    }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to the Anecdote app!',
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer