import React from 'react'
import { connect } from 'react-redux'


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

const Notification = (props) => {

  const message = props.notification.message
  const error = props.notification.error

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)