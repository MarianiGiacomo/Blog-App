import React from 'react'

import styles from '../style/styles'


const Logout = () => {
  return (
    <>
      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </>
  )
}

const handleLogout = () => {
  window.localStorage.clear()
  window.location.reload()
}

export default Logout