import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from '../style/styles'

const BlogList = (props) => {
  const { filterBlogs, blogs, login } = props

  if(filterBlogs) {
    console.log(blogs)
    
    if(filterBlogs(blogs, login).length === 0){
      return (
        <p>You don't have any blogs yet</p>
      )
    }
    return (
      <div>
        <h2>Your blogs</h2>
        <table style={styles.table}>
          <tbody>
            {filterBlogs(blogs, login).sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <tr key={i}>
                <td style={styles.tableList}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>All blogs</h2>
      <table style={styles.table}>
        <tbody>
          {
            blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <tr key={i}>
                <td style={styles.tableList}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              </tr>
            )}
        </tbody>
      </table>
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