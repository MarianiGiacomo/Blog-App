import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useField } from '../../hooks'
import SignupForm from '../presentational/SignupForm'
import { initializeBlogs } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { setToken, setUser } from '../../reducers/loginReducer'


const SignupPage = props => {
  const username = useField('text')
	const name = useField('name')
	const password = useField('password')
	
	const credentials = () => {
		return { 
			username: username.value,
			name: name.value,
			password: password.value,
		}
	}

	const handleSignup = async (event) => {
    event.preventDefault()    
    try {
      const newUser = await userService.createUser(credentials())
      props.setNotification({ message: `User with username ${newUser.username} created`}, 5) 
    } catch (exception) {
      props.setNotification({ error: `Could not create user: ${exception}`}, 5)
    }
  }

	return (
		<>
			<SignupForm handleSignup={handleSignup} username={username} name={name} password={password}/>
		</>
	)
}

const mapDispatchToProps =   {
  initializeBlogs,
  setNotification,
  setToken,
  setUser,
}

SignupPage.propTypes = {
  initializeBlogs: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default connect(
	null,
	mapDispatchToProps
)(SignupPage)
