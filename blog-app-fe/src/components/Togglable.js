import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
        <button onClick={toggleVisibility} style={styles.button}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className={'togglableContent'}>
        {props.children}
        <button onClick={toggleVisibility} style={styles.button}>Cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable