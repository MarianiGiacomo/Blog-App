import { React,connect, Link, PropTypes, Table, styles, populateWithBlogs } from '../../imports'

const UserList = (props) => {
  const { users, blogs } = props

  return (
    <main>
      <h1>Users</h1>
      <Table striped celled style={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { populateWithBlogs(users, blogs).map((user, i) =>
            <Table.Row key={i}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  null
)(UserList)