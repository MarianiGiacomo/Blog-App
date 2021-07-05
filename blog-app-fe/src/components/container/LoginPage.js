import { React, PropTypes, connect, LoginForm, useField, initializeBlogs, setToken, setUser,
setNotification, loginService, getCredentials } from '../../imports'

function LoginPage(props) {
  const username = useField('text', 'username')
	const password = useField('password', 'password')
  
	const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(getCredentials(username, password))
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
