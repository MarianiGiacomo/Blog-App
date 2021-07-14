import { React, useState, PropTypes, Button, styles } from '../../imports'

function Togglable(props) {
  const { buttonLabel, children } = props
  const [visible, setVisible] = useState(false)

  const hide = () => setVisible(false)

  const childrenWithProps = React.Children.map(children,
    child => React.cloneElement(child, { hide }))

  return (
    <div>
      { visible ?
        <>
          { childrenWithProps }
          <Button onClick={() => setVisible(!visible)} style={styles.button}>Cancel</Button>
        </>
        :
        <Button onClick={() => setVisible(!visible)} style={styles.button}>{buttonLabel}</Button>
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable