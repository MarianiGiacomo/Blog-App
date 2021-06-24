import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useField } from '../hooks'
import userService from '../services/users'
import { initializeBlogs } from '../reducers/blogReducer'
import { setToken, setUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Form, Button, Input } from 'semantic-ui-react'
import styles from '../style/styles'

const SignupForm = (props) => {
  const username = useField('text')
  const name = useField('text')
  const password = useField('password')

  const handleSignup = async (event) => {
    event.preventDefault()    
    const credentials = {
      username: username.value,
      name: name.value,
      password: password.value,
    }
    try {
      const newUser = await userService.createUser(credentials)
      props.setNotification( { message: `User with username ${username.value} created`}, 5) 
    } catch (exception) {
      props.setNotification({ error: `Could not create user:\n${exception}`}, 5)
      console.log(exception)
    }
  }

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

const mapDispatchToProps =   {
  initializeBlogs,
  setNotification,
  setToken,
  setUser,
}

SignupForm.propTypes = {
  initializeBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(SignupForm)