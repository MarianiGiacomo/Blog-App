import { React, PropTypes, useState, useEffect, populateWithBlogs, connect, Redirect, emptyObj,
  List } from '../../imports'

const User = (props) => {
  const [user, setUser] = useState({})
  const { users, blogs, match } = props

  useEffect(() => {
    if(users.length && blogs.length) {
      const pUsers = populateWithBlogs(users, blogs)
      const fUser = pUsers.find(u => u.id === match.params.id)
      setUser(fUser)
    }
  },[users, blogs])

  if(user === undefined) {
    return <Redirect to='/users'/>
  }
  else if(emptyObj(user)) {
    return (
      <main>
        <div className="loader"></div>
        <p>Fetching user...</p>
      </main>
    )
  }
  else {
    return (
      <main>
        <h1>{user.name}</h1>
        <h2>Blogs</h2>
        <List divided relaxed>
          {
            user.blogs.length
              ? user.blogs.map((b,i) =>
                <List.Item key={i} >
                  <p>{b.title}</p>
                  <p>by {b.author}</p>
                  <a href={b.url}>{b.url}</a>
                </List.Item>
              )
              : <List.Item><p>No blogs yet</p></List.Item>
          }
        </List>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
  }
}

User.propTypes = {
  users: PropTypes.array.isRequired,
  blogs: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps, null
)(User)