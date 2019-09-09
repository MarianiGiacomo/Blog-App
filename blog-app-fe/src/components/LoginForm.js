import React from 'react'
import { connect } from 'react-redux'

import { useField } from '../hooks'
import loginService from '../services/login'
import { initializeBlogs } from '../reducers/blogReducer'
import { setToken, setUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import styles from '../style/styles'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value,
    }
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      props.setToken(user.token)
      props.setUser(user)
      props.initializeBlogs()
    } catch (exception) {
      console.log('exception', exception)
      setNotification({ error: 'wrong credentials' }, 5)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div>
        username
          <input {...username} />
        </div>
        <div>
        password
          <input {...password} />
        </div>
        <button type='submit' style={styles.button}>Login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps =   {
  initializeBlogs,
  setNotification,
  setToken,
  setUser,
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)