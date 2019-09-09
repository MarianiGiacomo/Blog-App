import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from '../style/styles'
import { getUsers } from '../reducers/usersReducer'

const UserList = (props) => {
  const { users, getUsers } = props

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div>
      <h2>Users</h2>
      <table style={styles.table}>
        <tbody>
          <tr><th>Name</th><th>Blogs created</th></tr>
          { users.map((user, i) =>
            <tr key={i}>
              <td style={styles.tableList}><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td style={styles.tableList}>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList)