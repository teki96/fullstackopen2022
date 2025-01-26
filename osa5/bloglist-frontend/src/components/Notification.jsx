const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const notificationStyle = {
      color : type === 'error' ? 'red' : 'green',
      fontSize: '20px',
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
  
  export default Notification