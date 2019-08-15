import React, { useState } from 'react'
import styles from '../style/styles'

const Blog = ({ blog, updateBlog, removeBlog, owner }) => {
  const [show, setShow] = useState(false)


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
      <button onClick={() => updateBlog({ ...blog, 'likes': blog.likes+1 })} style={styles.button}>Like</button><br/>
      added by {blog.user.name}
      {
        owner?
          <div><button onClick={() => removeBlog(blog)} style={styles.button}>Remove</button></div>
          : <br />
      }
    </div>
  )
}

export default Blog