import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { getBlogComments } from '../reducers/commentReducer'

import Toggable from './Togglable'
import CommentForm from './CommentForm'

const Blog = (props) => {
  const [removed, setRemoved] = useState(false)
  const { blog, comments, login } = props

  const removeBlog = (blog) => {
    if(!window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author}?`)) {
      return null
    }
    try {
      props.removeBlog(props.login.token, blog)
      setRemoved(true)
      props.setNotification({ message: `Blog ${blog.title} by ${blog.author} removed` }, 3)
    } catch (exception) {
      console.log(exception.message)
      props.setNotification({ error: `Could not remove the blog: ${exception.message}` }, 3)
    }
  }

  if(blog === undefined | removed){
    return <Redirect to='/'/>
  }

  props.getBlogComments(blog)
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url} target='_blank' rel='noopener noreferrer' >{blog.url}</a><br/>
      {blog.likes} likes
      <button onClick={() => props.likeBlog(blog)}>Like</button><br/>
        added by {blog.user.name}
      {
        login.username === blog.user.username?
          <div><button onClick={() => removeBlog(blog)}>Remove</button></div>
          : <br />
      }
      <h3>Comments</h3>
      <Toggable buttonLabel='Add comment'>
        <CommentForm blog={blog}/>
      </Toggable>
      <ul>
        {
          comments.length?
            comments.map((b,i) => 
              <li key={i}>{b.comment}<br/>by {b.user.name} - {b.timeStamp}</li>
            )
            :<p>No comments yet</p>
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    comments: state.comments
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification,
  getBlogComments,
}

Blog.propTypes = {
  login: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getBlogComments: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)