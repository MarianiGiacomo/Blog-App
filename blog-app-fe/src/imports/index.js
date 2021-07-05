import { FormInput } from 'semantic-ui-react'

// React & Redux
export { default as React, useEffect, useState } from 'react'
export { connect } from 'react-redux'
export {
  BrowserRouter as Router,
  Route, Redirect, Link
} from 'react-router-dom'
export { PropTypes } from 'prop-types'
// Reducers
export { getUsers } from '../reducers/usersReducer'
export { initializeBlogs } from '../reducers/blogReducer'
export { setNotification } from '../reducers/notificationReducer'
export { setToken, setUser } from '../reducers/loginReducer'
// Internal Components
export { default as BlogForm } from '../components/BlogForm'
export { default as Blog } from '../components/Blog'
export { default as BlogList } from '../components/BlogList'
export { default as LoginForm } from '../components/presentational/LoginForm'
export { default as LoginPage } from '../components/container/LoginPage'
export { default as LoginNav } from '../components/presentational/LoginNav'
export { default as Logout } from '../components/presentational/Logout'
export { default as Nav } from '../components/presentational/Nav'
export { default as Notification } from '../components/presentational/Notification'
export { default as SignupPage } from '../components/container/SignupPage'
export { default as Togglable } from '../components/Togglable'
export { default as User } from '../components/User'
export { default as UserList } from '../components/UserList'
// External Components
export { Button, Container, Menu } from 'semantic-ui-react'
// Services
export { default as loginService } from '../services/login'
// Helper libs
export {  useField } from '../hooks'
export { filterBlogs, getCredentials } from '../lib'
// Styles
export { default as styles } from '../style/styles'