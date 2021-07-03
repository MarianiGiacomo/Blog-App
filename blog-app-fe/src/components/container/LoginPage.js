import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoginForm from '../presentational/LoginForm'
import { useField } from '../../hooks'
import { initializeBlogs } from '../../reducers/blogReducer'
import { setToken, setUser } from '../../reducers/loginReducer'
import { setNotification } from '../../reducers/notificationReducer'
import loginService from '../../services/login'

function LoginPage(props) {
  const username = useField('text')
	const password = useField('password')

	const credentials = () => {
		return { 
			username: username.value,
			password: password.value,
		}
	}

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(credentials())
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      props.setToken(user.token)
      props.setUser(user)
      props.initializeBlogs()
    } catch (exception) {
      username.setValue('')
      password.setValue('')
      console.log('exception', exception)
      props.setNotification({ error: 'wrong credentials' }, 5)
    }
  }

	return (
		<>
			<main>
				<LoginForm handleLogin={handleLogin} username={username} password={password}/>
			</main>
		</>
	)
}

const mapDispatchToProps =   {
  initializeBlogs,
  setNotification,
  setToken,
  setUser,
}

LoginPage.propTypes = {
  initializeBlogs: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default connect(
	null,
	mapDispatchToProps	
)(LoginPage)
