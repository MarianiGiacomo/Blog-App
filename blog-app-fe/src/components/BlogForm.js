import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

import { initializeBlogs, createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import styles from '../style/styles'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const { login } = props

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!checkUrl(url.value)){
      props.setNotification({ error: 'Please use a valid URL as "https://www." or "http://www."' }, 3)
      return null
    }
    const newBlog = {
      'title': title.value,
      'author': author.value,
      'url': url.value
    }
    try {
      await props.createBlog(login.token, newBlog)
      props.setNotification({ message: `A new blog "${newBlog.title} by ${newBlog.author}" added` }, 3)
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not add the blog: ${exception.message}` }, 3)
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
        <button type='submit' style={styles.button}>create</button>
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

BlogForm.propTypes = {
  login: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
}

const checkUrl = (url) => {
  if(url.substring(0,11) === 'http://www.' | url.substring(0,12) === 'https://www.'){
    return true
  }
  return false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)