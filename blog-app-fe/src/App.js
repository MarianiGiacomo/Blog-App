
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { 
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'

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

const App = (props) => {

  const userById = (id) => props.users.find(u => u.id === id)

  const blogById = (id) => props.blogs.find(b => b.id === id)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setToken(user.token)
      props.setUser(user)
      props.initializeBlogs()
      props.getUsers()
    }
  }, [])

  if (props.login.token === '') {
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
        <Notification />
        <h2>Blogs</h2>
        <div>
          <p> { props.login.name } logged in
            <Logout />
          </p>
        </div>
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
  return blogs.filter(blog =>
    blog.user.username === user.username
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
