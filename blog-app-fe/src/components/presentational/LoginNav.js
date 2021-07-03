import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import styles from '../../style/styles'

const LoginNav = (props) => {
  const [activeItem, setActiveItem] = useState(window.location.pathname.substr(1) || 'login')

  return (
    <nav>
      <Menu style={styles.navUl} widths='4'>
        <Menu.Item active={activeItem === 'login'}>
          <Link
            to={'/'}
            onClick={ () => setActiveItem('login')}
          >Login</Link></Menu.Item>
        <Menu.Item active={activeItem === 'signup'}>
          <Link
            to={'/signup'}
            onClick={ () => setActiveItem('signup')}
          >Users</Link>
				</Menu.Item>
      </Menu>
    </nav>

  )
}

export default LoginNav