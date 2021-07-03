import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import styles from '../../style/styles'

const SignupForm = (props) => {
	const { handleSignup, username, name, password } = { ...props }

  return (
    <>
    <h2>Create new test user</h2>
      <strong>The created user will be automatically removed within 24 hours</strong>
      <Form onSubmit={handleSignup} className='login-form'>
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
              label="Name"
              id='name'
              type={name.type}
              value={name.value}
              onChange={name.onChange}
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
        <Form.Button type='submit' style={styles.button}>Create</Form.Button>
      </Form>
    </>
  )
}

SignupForm.propTypes = {
	handleSignup: PropTypes.func.isRequired,
	username: PropTypes.object.isRequired,
	name: PropTypes.object.isRequired,
	password: PropTypes.object.isRequired
}

export default SignupForm