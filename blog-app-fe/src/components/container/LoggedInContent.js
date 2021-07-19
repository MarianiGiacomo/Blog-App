import { React, PropTypes, connect, Router, Route, Notification, BlogsPage, Blog, Redirect,
  User, UserList, initializeBlogs, setNotification, getUsers, useEffect, Nav, useState  } from '../../imports'

function LoggedInContent(props) {
  const [loading, setLoading] = useState(true)
  const {
    initializeBlogs,
    setNotification,
    getUsers,
    login,
  } = props

  useEffect( async () => {
    fetchWithRetry(5)
  },)

  return (
    <div className='loggedin-content'>
      <Router>
        <Nav username={login.username} />
        <Notification />
        { loading
          ? <>
          	  <div className="loader"></div>
          	  <p>Fetching data...</p>
          	</>
          : null
        }
        <Route exact path='/' render={() => <BlogsPage /> }/>
        <Route path='/blogs/:id' render={({ match }) => <Blog match={match} />} />
        <Route exact path='(/blogs)' render={() => <Redirect to='/'/>} />
        <Route exact path='(/blogs/)' render={() => <Redirect to='/'/>} />
        <Route path='/users/:id' render={({ match }) => <User match={match} />} />
        <Route exact path='/users/)' render={() => <Redirect to='/users'/>} />
        <Route exact path='/users' render={() => <UserList />
        } />
      </Router>
    </div>
  )

  async function fetchWithRetry(timeout) {
    try {
      await initializeBlogs()
      await getUsers()
      setLoading(false)
    } catch (exception) {
      setNotification({ error: `Could not fetch data: ${exception.message}. Retrying...` }, timeout-1)
      setTimeout( () => {
        fetchWithRetry(timeout)
      }, timeout*1000)
    }
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  getUsers,
}

LoggedInContent.propTypes = {
  initializeBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInContent)

