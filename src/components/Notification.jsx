import React from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification.message) {
    return null
  }

  const style = {
    padding: 10,
    border: 'solid 2px',
    borderRadius: 5,
    marginBottom: 10,
    color: notification.type === 'error' ? 'red' : 'green',
    backgroundColor: '#f0f0f0',
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
