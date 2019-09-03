import React, { useState } from 'react'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import styles from '../style/styles'


const Blog = (props) => {
  const [show, setShow] = useState(false)  
  const { blog, owner } = props

  const removeBlog = async (blog) => {
    if(!window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author}?`)) {
      return null
    }
    try {
      await props.removeBlog(props.login.token, blog.id)
      props.setNotification({ message: `Blog ${blog.title} by ${blog.author} removed` })
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not remove the blog: ${exception.message}` })
    }
  }

  if (!show) {
    return (
      <div style={styles.blog}>
        <div onClick={() => setShow(true)}>
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }

  return (
    <div style={styles.blog}>
      <div onClick={() => setShow(false)}>
        {blog.title} by {blog.author}
      </div>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes
      <button onClick={() => props.likeBlog(blog.id, { ...blog, 'likes': blog.likes+1 })} style={styles.button}>Like</button><br/>
      added by {blog.user.name}
      {
        owner?
          <div><button onClick={() => removeBlog(blog)} style={styles.button}>Remove</button></div>
          : <br />
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)