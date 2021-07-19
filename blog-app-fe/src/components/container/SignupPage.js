import { React, PropTypes, connect, useField, SignupForm, setNotification, getFieldsValues,
  userService } from '../../imports'

const SignupPage = props => {
  const username = useField('text', 'username')
  const name = useField('name', 'name')
  const password = useField('password', 'password')
  const { setNotification } = props

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      const newUser = await userService.createUser(getFieldsValues(username, name, password))
      setNotification({ message: `User with username ${newUser.username} created` }, 5)
    } catch (exception) {
      setNotification({ error: `Could not create user: ${exception.message}` }, 5)
    }
  }

  return (
    <div className="card">
      <h2>Sign up</h2>
      <p>
				&#10071;<strong>The created user will be automatically removed within 24 hours</strong>
      </p>
      <SignupForm handleSignup={handleSignup} username={username} name={name} password={password}/>
    </div>
  )
}

const mapDispatchToProps =   {
  setNotification,
}

SignupPage.propTypes = {
  setNotification: PropTypes.func.isRequired,
}

export default connect(
  null,
  mapDispatchToProps
)(SignupPage)
