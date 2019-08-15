
import React, { useState, useEffect } from 'react'
import styles from './style/styles'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField, useResource } from './hooks'

const App = () => {
  const [userBlogs, setUserBlogs] = useState([])
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const name = useField('text')
  const number = useField('text')
  const [blogs, blogService] = useResource('/api/blogs')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const fetchInitialData = async () => {
    const fetchedBlogs = await blogService.getAll()
    const fetchedPersons = await personService.getAll()
    personService.setInitial(fetchedPersons)
    blogService.setInitial(fetchedBlogs)
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      const blogsToShow = fetchedBlogs.filter(blog =>
        blog.user.username === user.username
      )
      setUserBlogs(blogsToShow)
    }
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create(user, { name: name.value, number: number.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value,
    }
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      fetchInitialData()
    } catch (exception) {
      console.log('exception', exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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
      await blogService.create(user, newBlog)
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      fetchInitialData()
    } catch (exception) {
      console.log(exception.message)
      setErrorMessage(`Could not add the blog: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
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
      await blogService.remove(user, blog.id)
      setMessage(`Blog ${blog.title} by ${blog.author} removed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      fetchInitialData()
    } catch (exception) {
      console.log(exception.message)
      setErrorMessage(`Could not remove the blog: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} error={errorMessage}/>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div className='loggedin-content'>
      <Notification message={message} error={errorMessage}/>
      <h2>Blogs</h2>
      <div>
        <p>{user.name} logged in
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
          userBlogs.length === 0?
            <p>You don&apost have any blogs yet</p>
            :userBlogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Blog
                key={i}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                owner={blog.user.username === user.username}
              />
            )}
      </div>
      <div>
        <h2>All blogs</h2>
        {
          blogs.length === 0?
            <p>You don&apost have any blogs yet</p>
            :blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Blog
                key={i}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                owner={blog.user.username === user.username}
              />
            )}
      </div>
      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
