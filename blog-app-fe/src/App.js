import {
  React, useEffect, connect, Router, Route, Redirect, PropTypes, initializeBlogs, setNotification,
  setToken, setUser, getUsers, Container, Nav, UserList, Notification, LoginNav, LoginPage,
  SignupPage, BlogsPage, Blog, User
} from './imports'

const App = (props) => {
  const {
    initializeBlogs,
    getUsers,
    setToken,
    setUser,
    login,
  } = props

  useEffect(() => {
    initializeBlogs()
    getUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setUser(user)
    }
  }, [
    initializeBlogs,
    getUsers,
    setToken,
    setUser,
  ])

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
      <div className='loggedin-content'>
        <Router>
          <Nav username={login.username} />
          <Notification />
          <Route exact path='/' render={() => <BlogsPage /> }/>
          <Route path='/blogs/:id' render={({ match }) => <Blog match={match} />} />
          <Route exact path='(/blogs)' render={() => <Redirect to='/'/>} />
          <Route exact path='(/blogs/)' render={() => <Redirect to='/'/>} />
          <Route path='/users/:id' render={({ match }) => <User match={match} />} />
          <Route exact path='/users/)' render={() => <Redirect to='/users'/>} />
          <Route exact path='/users' render={() => <UserList />
          } />
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setToken,
  setUser,
  setNotification,
  getUsers,
}

App.propsTypes = {
  initializeBlogs: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)