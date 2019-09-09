import React from 'react'
import PropTypes from 'prop-types'

const User = (props) => {

  if(props.user === undefined) {
    return (
      null
    )
  }

  return (
    <>
        <h2>{props.user.name}</h2>
    </>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User