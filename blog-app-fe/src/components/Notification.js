import React from 'react'

const styleError = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const styleMessage = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const Notification = ({ message, error }) => {

  const setStyle = () => {
    if (message){
      return styleMessage
    } else if (error){
      return styleError
    }
    return null
  }


  if (!message && !error) {
    return null
  }

  return (
    <div className="notification" style={setStyle()}>
      {message? message : error}
    </div>
  )
}

export default Notification