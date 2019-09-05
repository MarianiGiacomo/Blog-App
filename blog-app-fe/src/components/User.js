import React from 'react'

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

export default User