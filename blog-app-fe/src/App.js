import {
  React, useEffect, connect, Router, Route, PropTypes, setToken, setUser, Container,
  LoggedInContent, Notification, LoginNav, LoginPage, SignupPage
} from './imports'

const App = (props) => {
  const {
    setToken,
    setUser,
    login,
  } = props

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setUser(user)
    }
  }, [])

  if (login.token === '') {
    return (
      <Container>
        <Router>
          <Notification />
          <LoginNav />
          <header>
            <h1>Favorite Blogs</h1>
          </header>
          <Route exact path='/' render={() =>
            <main>
              <LoginPage />
            </main>
          }>
          </Route>
          <Route path='/signup' render={() =>
            <main>
              <SignupPage />
            </main>
          }>
          </Route>
        </Router>
      </Container>
    )
  }

  return (
    <Container >
      <LoggedInContent />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = {
  setToken,
  setUser,
}

App.propsTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)