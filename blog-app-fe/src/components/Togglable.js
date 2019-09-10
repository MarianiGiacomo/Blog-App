import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'semantic-ui-react'
import styles from '../style/styles'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible? 'none' : '' }
  const showWhenVisible = { display: visible? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} style={styles.button}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className={'togglableContent'}>
        {props.children}
        <Button onClick={toggleVisibility} style={styles.button}>Cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable