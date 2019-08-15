import React from 'react'
import PropTypes from 'prop-types'
import sytles from '../style/styles'

const BlogForm = ({
  handleSubmit,
  title,
  author,
  url,
}) => {
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

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm