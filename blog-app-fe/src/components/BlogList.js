import React from 'react'
import { connect } from 'react-redux'

import Blog from '../components/Blog'

const BlogList = (props) => {
  const { filterBlogs } = props

  if(filterBlogs) {
    return (
      <div>
        <h2>Your blogs</h2>
        {
          filterBlogs(props.blogs, props.login).length === 0?
            <p>You don't have any blogs yet</p>
            :filterBlogs(props.blogs, props.login).sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Blog
                key={i}
                blog={blog}
                owner={blog.user.username === props.login.username}
              />
            )
        }
      </div>
    )
  }

  return (
    <div>
      <h2>All blogs</h2>
      {
        props.blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
          <Blog
            key={i}
            blog={blog}
            owner={blog.user.username === props.login.username}
          />)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login,
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogList)