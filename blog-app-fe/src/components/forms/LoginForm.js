import { React, PropTypes, Form } from '../../imports'

const LoginForm = (props) => {
  const { handleLogin, username, password } = { ...props }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleLogin} className='login-form'>
        <Form.Group>
          <Form.Input
            required
            label="Username"
            id='username'
            name={username.name}
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            required
            label="Password"
            id='password'
            name={password.name}
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Group>
        <Form.Button type='submit'>Login</Form.Button>
      </Form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm