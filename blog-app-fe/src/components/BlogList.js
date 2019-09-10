import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

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
        <Table striped celled style={styles.table}>
          <Table.Body>
            {props.filterBlogs(blogs, login).sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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
      <Table striped celled style={styles.table}>
        <Table.Body>
          {
            blogs.sort((a, b) => a.likes - b.likes).map((blog, i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>
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