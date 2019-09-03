
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setToken, setUser } from './reducers/loginReducer'
import styles from './style/styles'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = (props) => {

  const fetchInitialData = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log('Loggedin user', loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setToken(user.token)
      props.setUser(user)
      props.initializeBlogs()
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  if (props.login.token === null) {
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
      <Notification />
      <h2>Blogs</h2>
      <div>
        <p> { props.login.name } logged in
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </p>
      </div>
      <Togglable buttonLabel='New blog'>
        <BlogForm />
      </Togglable>
      <BlogList filterBlogs={filterBlogs}/>
      <BlogList />
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
    login: state.login
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setToken,
  setUser,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
