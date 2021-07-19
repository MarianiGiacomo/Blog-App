import { React, Button } from '../../imports'

const Logout = () => {
  return (
    <>
      <Button onClick={handleLogout} >Logout</Button>
    </>
  )
}

const handleLogout = () => {
  window.localStorage.clear()
	window.location.href = window.location.origin
}

export default Logout