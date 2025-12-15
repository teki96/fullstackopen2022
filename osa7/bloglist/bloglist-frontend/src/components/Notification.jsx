import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }

  const notificationStyle = {
    fontSize: '20px',
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
