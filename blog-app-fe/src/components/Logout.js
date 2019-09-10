import React from 'react'

import { Button } from 'semantic-ui-react'
import styles from '../style/styles'


const Logout = () => {
  return (
    <>
      <Button onClick={handleLogout} style={styles.button}>Logout</Button>
    </>
  )
}

const handleLogout = () => {
  window.localStorage.clear()
  window.location.reload()
}

export default Logout