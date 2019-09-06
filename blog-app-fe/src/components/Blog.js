import React from 'react'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const { blog } = props

  const removeBlog = (blog) => {
    if(!window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author}?`)) {
      return null
    }
    try {
      props.removeBlog(props.login.token, blog)
      props.setNotification({ message: `Blog ${blog.title} by ${blog.author} removed` }, 5)
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not remove the blog: ${exception.message}` }, 5)
    }
  }

  if(blog === undefined){
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes
      <button onClick={() => props.likeBlog(blog)}>Like</button><br/>
      added by {blog.user.name}
      {
        props.login.username === blog.user.username?
          <div><button onClick={() => removeBlog(blog)}>Remove</button></div>
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