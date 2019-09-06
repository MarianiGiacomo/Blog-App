import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from '../style/styles'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table style={styles.table}>
        <tbody>
          <tr><th>Name</th><th>Blogs created</th></tr>
          { props.users.map((user, i) =>
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

export default connect(
  mapStateToProps,
  null
)(Users)