import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import sytles from '../style/styles'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      'title': title.value,
      'author': author.value,
      'url': url.value
    }
    try {
      await props.createBlog(props.login.token, newBlog)
      props.setNotification({ message: `A new blog ${newBlog.title} by ${newBlog.author} added` }, 5)
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not add the blog: ${exception.message}` }, 5)
    }
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            {...title}
          />
        </div>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            id='author'
            {...author}
          />
        </div>
        <div>
          <label htmlFor='url'>URL:</label>
          <input
            id='url'
            {...url}
          />
        </div>
        <button type='submit' style={sytles.button}>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)