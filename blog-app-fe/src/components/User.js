import React from 'react'
import PropTypes from 'prop-types'

import { List } from 'semantic-ui-react'
import styles from '../style/styles'

const User = (props) => {
  const { user } = props

  if(user === undefined) {
    return (
      null
    )
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Blogs</h2>
      <List divided relaxed>
        {
          user.blogs.length?
            user.blogs.map((b,i) =>
              <List.Item
                key={i}
                style={styles.listLi}
              >
                <p>{b.title}</p>
                <p>by {b.author}</p>
                <a href={b.url}>{b.url}</a>
              </List.Item>
            )
            :
              <List.Item>
                <p>No blogs yet</p>
              </List.Item>
        }
      </List>
    </>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User