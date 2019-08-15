import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blog'>
    <div className='blog-body'>
      {blog.title} by {blog.author}
    </div>
    <div className='blog-likes'>
      blog has {blog.likes} likes
      <button onClick={onClick}>likes</button>
    </div>
  </div>
)

export default SimpleBlog