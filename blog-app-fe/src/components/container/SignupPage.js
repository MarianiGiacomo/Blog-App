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
	
	const handleSignup = async (event) => {
    event.preventDefault()    
    try {
      const newUser = await userService.createUser(credentials(username, name, password))
      props.setNotification({ message: `User with username ${newUser.username} created`}, 5) 
    } catch (exception) {
      props.setNotification({ error: `Could not create user: ${exception}`}, 5)
    }
  }

	return (
		<>
			<h2>Sign up</h2>
			<p>
				&#10071;<strong>The created user will be automatically removed within 24 hours</strong>
			</p>
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
