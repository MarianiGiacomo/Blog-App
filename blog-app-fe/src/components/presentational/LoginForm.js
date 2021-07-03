import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import styles from '../../style/styles'

const LoginForm = (props) => {
	const { handleLogin, username, password } = { ...props }

  return (
    <>
    <h2>Login</h2>
      <Form onSubmit={handleLogin} className='login-form'>
        <Form.Group>
          <Form.Input
              required
              label="Username"
              id='username'
              type={username.type}
              value={username.value}
              onChange={username.onChange}
          />
          <Form.Input
              required
              label="Password"
              id='password'
              type={password.type}
              value={password.value}
              onChange={password.onChange}
          />
        </Form.Group>
        <Form.Button type='submit' style={styles.button}>Login</Form.Button>
      </Form>
    </>
  )
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.object.isRequired,
	password: PropTypes.object.isRequired
}

export default LoginForm