import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (!message) {
    return null
  }

  return <Alert variant="primary">{message}</Alert>
}

export default Notification
