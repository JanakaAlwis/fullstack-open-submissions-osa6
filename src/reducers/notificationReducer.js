import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

let timeoutId

export const { setNotification, clearNotification } = notificationSlice.actions

// 6.19 Improved notification action creator with timeout param (seconds)
export const showNotification = (message, duration = 5) => {
  return dispatch => {
    dispatch(setNotification(message))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
