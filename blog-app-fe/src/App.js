
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Redirect, Link
} from 'react-router-dom'
import PropTypes from 'prop-types'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setToken, setUser } from './reducers/loginReducer'
import { getUsers } from './reducers/usersReducer'

import Logout from './components/Logout'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import User from './components/User'
import styles from './style/styles'

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

  if (login.token === '') {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='loggedin-content'>
      <Router>
        <ul style={styles.navUl}>
          <li style={styles.navLi}><Link to={'/'}>Blogs</Link></li>
          <li style={styles.navLi}><Link to={'/users'}>Users</Link></li>
          <li style={styles.navLi}>{login.name} logged in</li>
          <li style={styles.navLi}><Logout /></li>
        </ul>
        <Notification />
        <h2>Blogs</h2>
        <Route exact path='/' render={() =>
          <div>
            <Togglable buttonLabel='New blog'>
              <BlogForm />
            </Togglable>
            <BlogList filterBlogs={filterBlogs}/>
            <BlogList />
          </div>
        }/>
        <Route path='/blogs/:id' render={({ match }) =>
          <Blog blog={blogById(match.params.id)} />} />
        <Route exact path='(/blogs)' render={() => <Redirect to='/'/>} />
        <Route exact path='(/blogs/)' render={() => <Redirect to='/'/>} />
        <Route path='/users/:id' render={({ match }) =>
          <User user={userById(match.params.id)}/>} />
        <Route exact path='/users/)' render={() => <Redirect to='/users'/>} />
        <Route exact path='/users' render={() => <UserList />} />
      </Router>
    </div>
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
