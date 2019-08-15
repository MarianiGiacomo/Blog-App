import React from 'react'
import PropTypes from 'prop-types'
import sytles from '../style/styles'

const LoginForm = ({
  handleLogin,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div>
        username
          <input
            {...username}
          />
        </div>
        <div>
        password
          <input
            {...password}
          />
        </div>
        <button type='submit' style={sytles.button}>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm