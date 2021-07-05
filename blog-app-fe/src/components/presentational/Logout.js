import { React, Button, styles } from '../../imports'

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