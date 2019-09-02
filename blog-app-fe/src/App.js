
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setToken, setUser } from './reducers/loginReducer'
import styles from './style/styles'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField, useResource } from './hooks'

const App = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const [blogs, blogService] = useResource('/api/blogs')

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

  const filterBlogs = (blogs, user) => {
    return blogs.filter(blog =>
      blog.user.username === user.username
    )
  }

  useEffect(() => {    
    fetchInitialData()
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      'title': title.value,
      'author': author.value,
      'url': url.value
    }
    try {
      await blogService.create(props.user, newBlog)
      props.setNotification({ message: `A new blog ${newBlog.title} by ${newBlog.author} added` })
      setTimeout(() => {
        props.setNotification(null)
      }, 5000)

      fetchInitialData()
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not add the blog: ${exception.message}` })
      setTimeout(() => {
        props.setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, blog)
      fetchInitialData()
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blog) => {
    if(!window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author}?`)) {
      return null
    }
    try {
      await blogService.remove(props.user, blog.id)
      props.setNotification({ message: `Blog ${blog.title} by ${blog.author} removed` })
      setTimeout(() => {
        props.setNotification(null)
      }, 5000)
      fetchInitialData()
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not remove the blog: ${exception.message}` })
      setTimeout(() => {
        props.setNotification(null)
      }, 5000)
    }
  }

  if (props.user === undefined) {
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
        <p> { props.user.name } logged in
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </p>
      </div>
      <div>
        <Togglable buttonLabel='New blog'>
          <BlogForm
            handleSubmit={createBlog}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
      </div>
      <div>
        <h2>Your blogs</h2>
        {
          filterBlogs(props.blogs, props.user).length === 0?
            <p>You don't have any blogs yet</p>
            :filterBlogs(props.blogs, props.user).sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Blog
                key={i}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                owner={blog.user.username === props.user.username}
              />
            )}
      </div>
      <div>
        <h2>All blogs</h2>
        {
          blogs.length === 0?
            <p>You don't have any blogs yet</p>
            :blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Blog
                key={i}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                owner={blog.user.username === props.user.username}
              />
            )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login.user
  }
}

export default connect(
  mapStateToProps,
  { 
    initializeBlogs, 
    setToken,
    setUser,
    setNotification,
  }
)(App)
