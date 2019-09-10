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
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      <List divided relaxed>
        {
          user.blogs.length?
            user.blogs.map((b,i) =>
              <List.Item
                key={i}
                style={styles.listLi}
              >{b.title}<br/>by {b.author}
              </List.Item>
            )
            :<p>No blogs yet</p>
        }
      </List>
    </>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User