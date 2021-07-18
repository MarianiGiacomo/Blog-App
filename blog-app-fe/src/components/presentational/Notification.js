import { React, connect, Modal, styles } from '../../imports'

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
		<Modal
			open={error || message ? true : false}
		>
			<div className="notification" style={setStyle()}>
				{message? message : error}
			</div>
		</Modal>
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