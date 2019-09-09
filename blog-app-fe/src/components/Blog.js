import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { getBlogComments } from '../reducers/commentReducer'

import Toggable from './Togglable'
import CommentForm from './CommentForm'

const Blog = (props) => {
  const [removed, setRemoved] = useState(false)
  const { blog } = props

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
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes
      <button onClick={() => props.likeBlog(blog)}>Like</button><br/>
        added by {blog.user.name}
      {
        props.login.username === blog.user.username?
          <div><button onClick={() => removeBlog(blog)}>Remove</button></div>
          : <br />
      }
      <h3>Comments</h3>
      <Toggable buttonLabel='Add comment'>
        <CommentForm blog={blog}/>
      </Toggable>
      <ul>
        {
          props.comments.map((b,i) => 
            <li key={i}>{b.comment}<br/>by {b.user.name} {b.timeStamp}</li>
          )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)