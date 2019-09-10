import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Table } from 'semantic-ui-react'
import styles from '../style/styles'
import { getUsers } from '../reducers/usersReducer'

const UserList = (props) => {
  const { users, getUsers } = props

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div>
      <h1>Users</h1>
      <Table striped celled style={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { users.map((user, i) =>
            <Table.Row key={i}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
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