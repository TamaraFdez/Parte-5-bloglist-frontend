
const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const notificationStyle = {
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0',
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
    border: type === 'error' ? '1px solid red' : '1px solid green',
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
