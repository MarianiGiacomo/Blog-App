import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// TODO: login and set token from reducer
import loginService from '../services/login'
import { setToken, setUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import sytles from '../style/styles'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      props.setToken(user.token)
      props.setUser(user)
      // fetchInitialData()
    } catch (exception) {
      console.log('exception', exception)
      setNotification({ error: 'wrong credentials' })
      setTimeout(() => {
        setNotification({ error: '' })      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div>
        username
          <input name='username' />
        </div>
        <div>
        password
          <input name='password' />
        </div>
        <button type='submit' style={sytles.button}>Login</button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   // handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.object.isRequired,
//   password: PropTypes.object.isRequired,
// }


export default connect(
  null,
  { 
    setNotification, 
    setToken, 
    setUser,
  }
)(LoginForm)