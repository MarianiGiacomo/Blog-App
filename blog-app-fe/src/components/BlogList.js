import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from '../style/styles'

const BlogList = (props) => {
  const { blogs, login } = props

  if(props.filterBlogs){    
    if(!props.filterBlogs(blogs, login).length){
      return (
        <div>
          <h2>Your blogs</h2>
          <p>You don't have any blogs yet</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Your blogs</h2>
        <table style={styles.table}>
          <tbody>
            {props.filterBlogs(blogs, login).sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <tr key={i}>
                <td style={styles.tableList}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  if(!blogs.length){
    return (
      <div>
        <h2>All blogs</h2>
        <p>There are no blogs yet</p>
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

BlogList.propTypes = {
  login: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(BlogList)