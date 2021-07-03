import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setToken, setUser } from './reducers/loginReducer'
import { getUsers } from './reducers/usersReducer'
import { Container } from 'semantic-ui-react'
import Nav from './components/Nav'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Notification from './components/presentational/Notification'
import LoginNav from './components/presentational/LoginNav'
import LoginPage from './components/container/LoginPage'
import SignupPage from './components/container/SignupPage'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import User from './components/User'

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

  const userById = (id) => users.find(u => u.id === id)

  const blogById = (id) => blogs.find(b => b.id === id)

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

	const navButtons = [
		{
			text: 'Login',
			onClick: () => console.log('hide')
		},
		{
			text: 'Signup',
			onClick: () => console.log('hide')
		}
	]

  if (login.token === '') {
    return (
      <Container>
				<Router>
					<Notification />
					<LoginNav buttons={navButtons}/>
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
              <Blog blog={blogById(match.params.id)} />
            </main>
          } />
          <Route exact path='(/blogs)' render={() => <Redirect to='/'/>} />
          <Route exact path='(/blogs/)' render={() => <Redirect to='/'/>} />
          <Route path='/users/:id' render={({ match }) =>
            <main>
              <User user={userById(match.params.id)}/>
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

const filterBlogs = (blogs, user) => {
  return blogs.filter(blog => {
    return blog.user.username === user.username
  }
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