import { React, PropTypes, connect, LoginForm, useField, initializeBlogs, setToken, setUser,
  setNotification, loginService, getFieldsValues } from '../../imports'

function LoginPage(props) {
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const { setToken, setUser, setNotification } = props

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(getFieldsValues(username, password))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
    } catch (exception) {
      username.setValue('')
      password.setValue('')
      setNotification({ error: `Login failed: ${exception.message}` }, 5)
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
  setNotification,
  setToken,
  setUser,
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(LoginPage)
