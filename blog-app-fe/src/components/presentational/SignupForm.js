import { React, PropTypes, Form, styles } from '../../imports'

const SignupForm = (props) => {
	const { handleSignup, username, name, password } = { ...props }

  return (
    <>
      <Form onSubmit={handleSignup} className='login-form'>
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
              label="Name"
              id='name'
							name={name.name}
              type={name.type}
              value={name.value}
              onChange={name.onChange}
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
        <Form.Button type='submit' style={styles.button}>Create</Form.Button>
      </Form>
    </>
  )
}

SignupForm.propTypes = {
	handleSignup: PropTypes.func.isRequired,
	username: PropTypes.object.isRequired,
	name: PropTypes.object.isRequired,
	password: PropTypes.object.isRequired
}

export default SignupForm