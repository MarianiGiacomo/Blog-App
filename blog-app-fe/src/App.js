import {
	React, useEffect, connect, Router, Route, Redirect, PropTypes, initializeBlogs, setNotification,
	setToken, setUser, getUsers, Container, filterBlogs, Nav, UserList, BlogList, Notification,
	LoginNav, LoginPage, SignupPage, BlogForm, Blog, Togglable, User
} from './imports'

const App = (props) => {
  const {
    initializeBlogs,
    getUsers,
    setToken,
    setUser,
    login,
    users,
    blogs,
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
          <Route exact path='/' render={() =>
            <main>
              <h1>Blogs</h1>
              <Togglable buttonLabel='New blog'>
                <BlogForm />
              </Togglable>
              <div>
                <BlogList filterBlogs={filterBlogs}/>
                <BlogList />
              </div>
            </main>
          }/>
          <Route path='/blogs/:id' render={({ match }) =>
            <main>
              <Blog blog={blogs.find(b => b.id === match.params.id)} />
            </main>
          } />
          <Route exact path='(/blogs)' render={() => <Redirect to='/'/>} />
          <Route exact path='(/blogs/)' render={() => <Redirect to='/'/>} />
          <Route path='/users/:id' render={({ match }) =>
            <main>
              <User user={users.find(u => u.id === match.params.id)}/>
            </main>
           } />
          <Route exact path='/users/)' render={() => <Redirect to='/users'/>} />
          <Route exact path='/users' render={() => 
            <main>
              <UserList />
            </main>
          } />
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login,
    users: state.users,
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
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)