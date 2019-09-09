import React from 'react'
import { connect } from 'react-redux'

import styles from '../style/styles'

const Notification = (props) => {

  const message = props.notification.message
  const error = props.notification.error

  const setStyle = () => {
    if (message){
      return styles.notificationMessage
    } else if (error){
      return styles.notificationError
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