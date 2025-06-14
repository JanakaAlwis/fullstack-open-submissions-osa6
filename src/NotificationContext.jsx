import React, { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const initialState = { message: '', type: '' }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR_NOTIFICATION':
      return { message: '', type: '' }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const showNotification = (message, type = 'info', duration = 5) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, duration * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification: state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
