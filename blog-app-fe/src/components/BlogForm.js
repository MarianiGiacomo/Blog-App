import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'
import styles from '../style/styles'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const { login } = props

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!checkUrl(url.value)){
      props.setNotification({ error: 'Please use a valid URL as "https://" or "http://"' }, 3)
      return null
    }
    const newBlog = {
      'title': title.value,
      'author': author.value,
      'url': url.value
    }
    try {
      await props.createBlog(login.token, newBlog)
      title.setValue('')
      author.setValue('')
      url.setValue('')
      props.setNotification({ message: `A new blog "${newBlog.title} by ${newBlog.author}" added` }, 3)
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not add the blog: ${exception.message}` }, 3)
    }
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type={title.type}
            value={title.value}
            onChange={title.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor='author'>Author:</label>
          <input
            id='author'
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor='url'>URL:</label>
          <input
            id='url'
            type={url.type}
            value={url.value}
            onChange={url.onChange}
          />
        </Form.Field>
        <Button type='submit' style={styles.button}>Save</Button>
      </Form>
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
  if(url.substring(0,7) === 'http://' | url.substring(0,8) === 'https://'){
    return true
  }
  return false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)